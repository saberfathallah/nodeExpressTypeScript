import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express, { Request, Response, } from 'express';
import router from './routes';

dotenv.config();
mongoose.Promise = global.Promise;

const app = express();
const PORT: any = process.env.APPLICATION_PORT;

app.use(bodyParser.json());

app.use('/healthz', (req: Request, res: Response) => {
  res.send('OK');
});

app.use('/users', router);

( async () => {
  try {
    // chango localhost with mongo to run projet in local
    await mongoose.connect("mongodb://localhost:27017/refreshjs", { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (e) {
    throw new Error(e);
  }
  app.listen(PORT, () => console.log(`🚀 application ready at ${PORT}`));
})();
