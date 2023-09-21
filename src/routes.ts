import { Express, Request, Response } from 'express';
import firebase from './utils/firebase';
import { docsPost, collectionGet, collectionGetAll } from './prod';

export default function routes(app: Express, firebase: firebase) {
  // GET
  app.get('/check', (req: Request, res: Response) => res.send('OK'));
  app.get('/docs.get', async (req: Request, res: Response) => {
    const docsGetData = await collectionGet(req, firebase, 'docs');
    res.send(docsGetData);
  });
  app.get('/docs.getAll', async (req: Request, res: Response) => {
    const docsGetAllData = await collectionGetAll(firebase, 'docs');
    res.send(docsGetAllData);
  });
  app.get('/exams.get', async (req: Request, res: Response) => {
    const examsGetData = await collectionGet(req, firebase, 'exams');
    res.send(examsGetData);
  });
  app.get('/exams.getAll', async (req: Request, res: Response) => {
    const examsGetAllData = await collectionGetAll(firebase, 'exams');
    res.send(examsGetAllData);
  });
  app.get('/teachers.get', async (req: Request, res: Response) => {
    const teachersGetData = await collectionGet(req, firebase, 'teachers');
    res.send(teachersGetData);
  });
  app.get('/teachers.getAll', async (req: Request, res: Response) => {
    const teachersGetAllData = await collectionGetAll(firebase, 'teachers');
    res.send(teachersGetAllData);
  });
  app.get('/tests.get', async (req: Request, res: Response) => {
    const testsGetData = await collectionGet(req, firebase, 'tests');
    res.send(testsGetData);
  });
  app.get('/tests.getAll', async (req: Request, res: Response) => {
    const testsGetAllData = await collectionGetAll(firebase, 'tests');
    res.send(testsGetAllData);
  });
  // POST
  app.post('/docs.post', async (req: Request, res: Response) => {
    const buffer = await docsPost(req.headers, req.body, firebase);
    res.send(buffer);
  });

  // DEV
  app.get('/dev', async (req: Request, res: Response) => {});
}
