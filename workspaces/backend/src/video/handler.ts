import { Request, Response } from 'express';

export const handler = (_: Request, res: Response) => {
  return res.json({
    id: 'Th1s1sV1De0iD',
    url: 'http://localhost:3000/video.m3u8',
    title: 'サンプルのビデオ',
    desc: '説明文',
  });
};
