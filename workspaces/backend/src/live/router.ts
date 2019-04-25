import { Router, Request, Response } from 'express';

export const router = Router();

// endpoint prefix: /live

const send = (res: Response, count: number) => {
  res.write('id: ThisIsEventId\n');
  res.write(`data: ${count}\n\n`);
};

router.get('', (req: Request, res: Response) => {
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
