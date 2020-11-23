import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import routes from './routes';

dotenv.config();
mongoose.Promise = global.Promise;

const app = express();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PORT: any = process.env.APPLICATION_PORT;

app.use(bodyParser.json());

app.use('/healthz', (req: Request, res: Response) => {
  res.send('OK');
});
routes(app);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {
  try {
    // chango localhost with mongo to run projet in local
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DATA_BASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (e) {
    throw new Error(e);
  }
  // eslint-disable-next-line no-console
  // app.listen(PORT, () => console.log(`🚀 application ready at ${PORT}`));
})();

export default app;
