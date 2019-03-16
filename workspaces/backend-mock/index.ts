import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (_, res) => {
  return res.json({
    message: 'Hello, world!'
  });
});

app.get('/video/:videoId', (_, res) => {
  return res.json({
    url: 'video.m3u8',
    title: 'サンプルのビデオ',
    desc: '説明文'
  });
});

app.listen(3000);
