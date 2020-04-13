import categoryRouter from './routes/categoryRoutes';
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';
import commentRouter from './routes/commentRoutes';
import likeRouter from './routes/likeRoutes';

export default (app): void => {
  app.use('/categories', categoryRouter);
  app.use('/users', userRouter);
  app.use('/posts', postRouter);
  app.use('/comments', commentRouter);
  app.use('/likes', likeRouter);
};
