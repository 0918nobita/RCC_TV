import express from 'express';
import bodyParser from 'body-parser';
import MySQL from 'mysql';

import {
  UsersRecord,
  VideosRecord,
  PresentationsRecord,
} from './models/records';
import { VideoEntity } from './models/entities';
import { connect, query } from './utils/sql';
import { router as videoRouter } from './video/router';
import { router as liveRouter } from './live/router';
import { router as accountRouter } from './account/router';
import { dbConfig } from './config';

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

app.use('/account', accountRouter);
app.use('/video', videoRouter);
app.use('/live', liveRouter);

app.get('/', (_, res) => {
  return res.json({
    message: 'Hello, world!',
  });
});

app.get('/rdstest', async (_, res) => {
  const recordToEntity = (
    record: VideosRecord,
    presenters: UsersRecord[]
  ): VideoEntity => Object.assign({}, record, { presenters });

  const connection = MySQL.createConnection(dbConfig);

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
