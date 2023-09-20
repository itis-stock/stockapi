import { Express, Request, Response } from 'express';
import timetable from './utils/timetable';
import exam from './dev/exam';
import firebase from './utils/firebase';
import documents from './dev/documents';
import test from './dev/test';

export default function routes(app: Express, timetable: timetable, firebase: firebase) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.get('/timetable', async (req: Request, res: Response) => {
    res.send(await timetable.getTeachers());
  });

  app.get('/exam', async (req: Request, res: Response) => {
    // res.send(await exam());
  });

  app.get('/set', async (req: Request, res: Response) => {
    const q = ['teachers', 'exams', 'tests', 'docs'];
    const qq: any[] = [];
    for (let i = 0; i < q.length; i++) {
      const start = new Date();
      const data = await firebase.getdocs(q[i]);
      const end = new Date();
      console.log(
        (end.getTime() - start.getTime()) / 1000 +
          ' секунд - ' +
          q[i] +
          ' - ' +
          data.length +
          ' количество элементов',
      );
      qq.push(data);
    }

    res.send(qq);
  });
}
