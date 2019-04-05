import { Request, Response } from 'express';
import MySQL from 'mysql';
import moment from 'moment';

import { dbConfig } from '../config';
import { connect, query } from '../utils/sql';
import { VideosRecord } from '../models/records';

export const handler = async (req: Request, res: Response) => {
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
};
