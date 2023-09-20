import { Express, Request, Response } from 'express';
import timetable from './utils/timetable';
import firebase from './utils/firebase';
import docsget from './prod/docsget';

export default function routes(app: Express, firebase: firebase) {
  app.get('/check', (req: Request, res: Response) => res.send('OK'));
  app.get('/docs.get?', async (req: Request, res: Response) => {
    const docsgetdata = await docsget(req, firebase);
    res.send(docsgetdata);
  });
}
