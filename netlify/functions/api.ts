import express, { Router } from "express";
import serverless from "serverless-http";
import { routesnetlify } from "../../src/routes";
import firebase from "../../src/utils/firebase";
import cors from "cors";

const api = express();
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

const router = Router();
const fb = new firebase();
routesnetlify(router, fb);

api.use("/api/", router);

export const handler = serverless(api);
