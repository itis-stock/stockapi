import express, { Router } from 'express';
import serverless from 'serverless-http';
import { routesnetlify } from '../../src/routes';
import firebase from '../../src/utils/firebase';

const api = express();

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));
const fb = new firebase();
routesnetlify(router, fb);
api.use('/api/', router);

export const handler = serverless(api);
