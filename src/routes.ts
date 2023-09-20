import { Express, Request, Response } from 'express';
import timetable from './utils/timetable';
import firebase from './utils/firebase';

export default function routes(app: Express, timetable: timetable, firebase: firebase) {
  app.get('/check', (req: Request, res: Response) => res.sendStatus(200).send('OK'));
}
