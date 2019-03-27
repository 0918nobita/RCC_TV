import express, { Response } from 'express';
import bodyParser from 'body-parser';
import MySQL from 'mysql';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (_, res) => {
  return res.json({
    message: 'Hello, world!',
  });
});

app.get('/video/:videoId', (_, res) => {
  return res.json({
    id: 'Th1s1sV1De0iD',
    url: 'http://localhost:3000/video.m3u8',
    title: 'サンプルのビデオ',
    desc: '説明文',
  });
});

const send = (res: Response, count: number) => {
  res.write('id: ThisIsEventId\n');
  res.write(`data: ${count}\n\n`);
};

app.get('/live', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write('\n');

  let count = 0;
  const intervalId = setInterval(() => {
    count++;
    send(res, count);
  }, 1000);

  req.on('close', () => clearInterval(intervalId));
});

interface UsersRecord {
  id: number;
  name: string;
  screen_name: string;
  description: string;
  email: string;
  icon: string;
}

interface VideosRecord {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

interface VideoEntity extends VideosRecord {
  presenters: UsersRecord[];
}

interface PresentationsRecord {
  user_id: number;
  video_id: number;
}

const connect = (connection: MySQL.Connection) =>
  new Promise((resolve: () => void, reject) => {
    connection.connect(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

function query<T>(connection: MySQL.Connection, queryString: string) {
  return new Promise((resolve: (rows: T[]) => void, reject) => {
    connection.query(queryString, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

const recordToEntity = (
  record: VideosRecord,
  presenters: UsersRecord[]
): VideoEntity => Object.assign({}, record, { presenters });

app.get('/rdstest', async (_, res) => {
  const connection = MySQL.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'rcctv',
  });

  try {
    await connect(connection);

    const users = await query<UsersRecord>(connection, 'SELECT * FROM users');

    const videos = await query<VideosRecord>(
      connection,
      'SELECT * from videos'
    );

    console.log(
      JSON.stringify(
        await query(
          connection,
          'SELECT ' +
            'v.id AS id, v.title, ' +
            'v.description AS video_description, v.url, ' +
            'GROUP_CONCAT(u.name) AS presenters, ' +
            'u.description AS user_description, ' +
            'u.name FROM videos v ' +
            'JOIN presentations p ON p.video_id = v.id ' +
            'JOIN users u ON p.user_id = u.id ' +
            'GROUP BY id'
        )
      )
    );

    const videoEntities = [];

    for (const video of videos) {
      const presentations = await query<PresentationsRecord>(
        connection,
        `SELECT * FROM presentations WHERE video_id=${video.id}`
      );

      const presenters = [];
      for (const presentation of presentations) {
        const user = users.find(user => user.id === presentation.user_id);
        if (user === undefined) continue;
        presenters.push(user);
      }

      videoEntities.push(recordToEntity(video, presenters));
    }

    res.json({ users, videoEntities });
  } catch {
    res.writeHead(500);
    res.end();
  } finally {
    connection.end();
  }
});

app.listen(3000);
