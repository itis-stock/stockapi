import { Express, Request, Response } from "express";
import firebase from "./utils/firebase";
import {
  docsGet,
  docsGetAll,
  examsGet,
  examsGetAll,
  teachersGet,
  teachersGetAll,
  testsGet,
  testsGetAll,
} from "./prod";

export default function routes(app: Express, firebase: firebase) {
  app.get("/check", (req: Request, res: Response) => res.send("OK"));
  app.get("/docs.get", async (req: Request, res: Response) => {
    const docsGetData = await docsGet(req, firebase);
    res.send(docsGetData);
  });
  app.get("/docs.getAll", async (req: Request, res: Response) => {
    const docsGetAllData = await docsGetAll(firebase);
    res.send(docsGetAllData);
  });
  app.get("/exams.get", async (req: Request, res: Response) => {
    const examsGetData = await examsGet(req, firebase);
    res.send(examsGetData);
  });
  app.get("/exams.getAll", async (req: Request, res: Response) => {
    const examsGetAllData = await examsGetAll(firebase);
    res.send(examsGetAllData);
  });
  app.get("/teachers.get", async (req: Request, res: Response) => {
    const teachersGetData = await teachersGet(req, firebase);
    res.send(teachersGetData);
  });
  app.get("/teachers.getAll", async (req: Request, res: Response) => {
    const teachersGetAllData = await teachersGetAll(firebase);
    res.send(teachersGetAllData);
  });
  app.get("/tests.get", async (req: Request, res: Response) => {
    const testsGetData = await testsGet(req, firebase);
    res.send(testsGetData);
  });
  app.get("/tests.getAll", async (req: Request, res: Response) => {
    const testsGetAllData = await testsGetAll(firebase);
    res.send(testsGetAllData);
  });
}
