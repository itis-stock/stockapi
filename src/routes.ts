import { Express, Request, Response } from 'express';
import timetable from './utils/timetable';
import exam from './dev/exam';
import firebase from './utils/firebase';

export default function routes(app: Express, timetable: timetable, firebase: firebase) {
  /**
   * @openapi
   *
   */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.get('/timetable', async (req: Request, res: Response) => {
    res.send(await timetable.getTeachers());
  });

  app.get('/exam', async (req: Request, res: Response) => {
    res.send(await exam());
  });

  app.get('/set', async (req: Request, res: Response) => {
    res.send(await exam());
  });
}
