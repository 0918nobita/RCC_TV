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

app.get('/rdstest', (_, res) => {
  const connection = MySQL.createConnection({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'rcctv',
  });

  connection.connect(err => {
    if (err) {
      handleError(res, err, 'データベースへの接続に失敗しました');
      connection.end();
      return;
    }
  });
  connection.query('SELECT * from users', (err, rows: UsersRecord[]) => {
    if (err) {
      handleError(res, err, 'ユーザー情報の取得に失敗しました');
      connection.end();
      return;
    }
    res.json(rows);
    res.end();
  });
  connection.end();
});

function handleError(res: Response, err: any, message: string) {
  res.json({ err, message });
  res.end();
}

app.listen(3000);
