import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes';
import timetable from './utils/timetable';
const app = express();

app.use(cors());
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT);
  const tt = new timetable();
  routes(app, tt);
});
