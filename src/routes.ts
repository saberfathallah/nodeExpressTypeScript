import categoryRouter from './routes/categoryRoutes';
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';
import commentRouter from './routes/commentRoutes';

export default (app) => {
  app.use('/categories', categoryRouter);
  app.use('/users', userRouter);
  app.use('/posts', postRouter);
  app.use('/comments', commentRouter);
};