import { Express, Request, Response } from 'express';
import timetable from './utils/timetable';

export default function routes(app: Express, timetable: timetable) {
  /**
   * @openapi
   *
   */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.get('/timetable', async (req: Request, res: Response) => {
    res.send(await timetable.getTeachers());
  });
}
