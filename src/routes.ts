import categoryRouter from './routes/categoryRoutes';
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';

export default (app) => {
  app.use('/categories', categoryRouter);
  app.use('/users', userRouter);
  app.use('/posts', postRouter);
};