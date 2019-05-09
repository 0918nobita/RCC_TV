import { Router, Request, Response } from 'express';
import MySQL from 'mysql';
import moment from 'moment';

import { VideosRecord } from '../models/records';
import { connect, query } from '../utils/sql';
import { dbConfig } from '../config';

export const router = Router();

// endpoint prefix: /video

router.get('/latest', async (req: Request, res: Response) => {
  const records: string = req.query.records;

  const connection = MySQL.createConnection(dbConfig);

  try {
    await connect(connection);
    const videos = await query<VideosRecord>(
      connection,
      'SELECT * FROM videos ORDER BY modified DESC LIMIT ?',
      [Number.parseInt(records, 10)]
    );
    res.json(
      videos.map(video =>
        Object.assign(video, {
          created: moment(video.created).format('YYYY年M月D日 H:m'),
          modified: moment(video.modified).format('YYYY年M月D日 H:m'),
        })
      )
    );
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end();
  } finally {
    connection.end();
  }
});

router.get('/:videoId', async (req: Request, res: Response) => {
  const videoId: string = req.params.videoId;

  const connection = MySQL.createConnection(dbConfig);

  try {
    await connect(connection);
    const videos = await query<VideosRecord>(
      connection,
      'SELECT * FROM videos WHERE id=?',
      [videoId]
    );
    if (videos.length === 0) {
      console.log(
        `Video ID '${videoId}' に対する動画リソースが見つかりませんでした`
      );
      res.writeHead(404);
      res.end();
      return;
    }
    const video = videos[0];
    res.json(
      Object.assign(video, {
        created: moment(video.created).format('YYYY年M月D日 H:m'),
        modified: moment(video.modified).format('YYYY年M月D日 H:m'),
      })
    );
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end();
  } finally {
    connection.end();
  }
});

router.get('/', async (req: Request, res: Response) => {
  const {
    query: searchQuery,
    offset,
    records,
  }: { [K in 'query' | 'offset' | 'records']: string } = req.query;

  const connection = MySQL.createConnection(dbConfig);

  try {
    await connect(connection);
    const videos = await query<VideosRecord>(
      connection,
      `
      SELECT DISTINCT videos.id,
        videos.title,
        videos.description,
        videos.url,
        videos.thumbnail,
        videos.created,
        videos.modified
      FROM videos
        INNER JOIN presentations
          ON videos.id = presentations.video_id
        INNER JOIN users
          ON presentations.user_id = users.id
      WHERE videos.title LIKE ?
        OR videos.description LIKE ?
        OR users.NAME LIKE ?
        OR users.screen_name LIKE ?
      LIMIT ?
      OFFSET ?
      `,
      [
        ...Array(4).fill(`%${searchQuery}%`),
        Number.parseInt(records, 10),
        Number.parseInt(offset, 10),
      ]
    );
    res.json(
      videos.map(video =>
        Object.assign(video, {
          created: moment(video.created).format('YYYY年M月D日 H:m'),
          modified: moment(video.modified).format('YYYY年M月D日 H:m'),
        })
      )
    );
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end();
  } finally {
    connection.end();
  }
});
