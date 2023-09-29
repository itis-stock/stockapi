import { Express, Request, Response, Router } from 'express';
import firebase from './utils/firebase';
import {
  docsPost,
  collectionGet,
  collectionPost,
  usersPost,
  metaGetActual,
  usersCheck,
  apiGet,
} from './prod';

export default function routes(app: Express, firebase: firebase) {
  // GET
  app.get('/check', (req: Request, res: Response) => res.send('OK'));
  app.get('/docs.get', async (req: Request, res: Response) => {
    const docsGetData = await collectionGet(req, firebase, 'docs');
    res.send(docsGetData);
  });

  app.get('/exams.get', async (req: Request, res: Response) => {
    const examsGetData = await collectionGet(req, firebase, 'exams');
    res.send(examsGetData);
  });

  app.get('/teachers.get', async (req: Request, res: Response) => {
    const teachersGetData = await collectionGet(req, firebase, 'teachers');
    res.send(teachersGetData);
  });
  app.get('/tests.get', async (req: Request, res: Response) => {
    const testsGetData = await collectionGet(req, firebase, 'tests');
    res.send(testsGetData);
  });
  app.get('/meta.getActual', async (req: Request, res: Response) => {
    const metaGetData = await metaGetActual(firebase);
    res.send(metaGetData);
  });
  app.get('/users.check', async (req: Request, res: Response) => {
    const GetData = await usersCheck(req, firebase);
    res.send(GetData);
  });
  app.get('/api.get', async (req: Request, res: Response) => {
    const GetData = await apiGet();
    res.send(GetData);
  });
  // POST
  app.post('/docs.post', async (req: Request, res: Response) => {
    const buffer = await docsPost(req.headers, req.body, firebase);
    res.send(buffer);
  });
  app.post('/exams.post', async (req: Request, res: Response) => {
    const buffer = await collectionPost(req.headers, req.body, firebase, 'exams');
    res.send(buffer);
  });
  app.post('/tests.post', async (req: Request, res: Response) => {
    const buffer = await collectionPost(req.headers, req.body, firebase, 'tests');
    res.send(buffer);
  });
  app.post('/users.post', async (req: Request, res: Response) => {
    const buffer = await usersPost(req.headers, req.body, firebase);
    res.send(buffer);
  });

  // DEV
  app.get('/dev', async (req: Request, res: Response) => {});
}

export function routesnetlify(app: Router, firebase: firebase) {
  // GET
  app.get('/check', (req: Request, res: Response) => res.send('OK'));
  app.get('/docs.get', async (req: Request, res: Response) => {
    const docsGetData = await collectionGet(req, firebase, 'docs');
    res.send(docsGetData);
  });

  app.get('/exams.get', async (req: Request, res: Response) => {
    const examsGetData = await collectionGet(req, firebase, 'exams');
    res.send(examsGetData);
  });
  app.get('/teachers.get', async (req: Request, res: Response) => {
    const teachersGetData = await collectionGet(req, firebase, 'teachers');
    res.send(teachersGetData);
  });
  app.get('/tests.get', async (req: Request, res: Response) => {
    const testsGetData = await collectionGet(req, firebase, 'tests');
    res.send(testsGetData);
  });
  app.get('/meta.getActual', async (req: Request, res: Response) => {
    const testsGetData = await metaGetActual(firebase);
    res.send(testsGetData);
  });
  app.get('/users.check', async (req: Request, res: Response) => {
    const GetData = await usersCheck(req, firebase);
    res.send(GetData);
  });
  app.get('/api.get', async (req: Request, res: Response) => {
    const GetData = await apiGet();
    res.send(GetData);
  });
  // POST
  app.post('/users.post', async (req: Request, res: Response) => {
    const buffer = await usersPost(req.headers, req.body, firebase);
    res.send(buffer);
  });
}
