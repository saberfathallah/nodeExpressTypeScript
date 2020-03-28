import categoryRouter from './routes/categoryRoutes';
import userRouter from './routes/userRoutes';

export default (app) => {
  app.use('/categories', categoryRouter);
  app.use('/users', userRouter);
};