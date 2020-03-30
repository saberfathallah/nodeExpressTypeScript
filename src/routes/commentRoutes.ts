import express from 'express';

import {
  addComment,
} from '../handlers/comment';

const commentRouter = express.Router();

commentRouter.post('/:postId', addComment);

export default commentRouter;
