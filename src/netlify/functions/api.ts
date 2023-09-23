import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import routes from '../../routes';
import firebase from '../../utils/firebase';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT);
  const fb = new firebase();
  routes(app, fb);
});
