import express, { Response } from 'express';
import bodyParser from 'body-parser';
import MySQL from 'mysql';

const connection = MySQL.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'user',
  password: 'password',
  database: 'rcctv',
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(_, res, next) {
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

app.get('/rdstest', (_, res) => {
  connection.connect(err => {
    if (err) {
      handleError(res, err, 'データベースへの接続に失敗しました');
      return;
    }
  });
  connection.query('SELECT * from users', (err, rows) => {
    if (err) {
      handleError(res, err, 'ユーザー情報の取得に失敗しました');
      return;
    }
    res.json({ rows });
  });
});

function handleError(res: Response, err: any, message: string) {
  console.log(err);
  res.send(err);
}

app.listen(3000);
