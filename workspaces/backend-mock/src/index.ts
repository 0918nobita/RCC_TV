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

const connect = (connection: MySQL.Connection) =>
  new Promise((resolve: () => void, reject) => {
    connection.connect(err => {
      if (err) {
        reject(err);
        connection.end();
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
        connection.end();
        return;
      }
      resolve(rows);
    });
  });
}

app.get('/rdstest', async (_, res) => {
  const connection = MySQL.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'rcctv',
  });

  await connect(connection);

  const users = await query<UsersRecord>(connection, 'SELECT * from users');

  const videos = await query<VideosRecord>(connection, 'SELECT * from videos');

  res.json({ users, videos });

  connection.end();
  res.end();
});

app.listen(3000);
