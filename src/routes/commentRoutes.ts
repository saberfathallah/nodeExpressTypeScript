import express from 'express';

import {
  addComment,
  deleteComment,
  updateComment,
} from '../handlers/comment';

const commentRouter = express.Router();

commentRouter.post('/:postId', addComment);
commentRouter.delete('/:commentId', deleteComment);
commentRouter.put('/:commentId', updateComment);

export default commentRouter;
