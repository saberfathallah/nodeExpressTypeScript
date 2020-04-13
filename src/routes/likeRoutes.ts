import express from 'express';

import {
  addLike,
  dislike,
} from '../handlers/like';

const likeRouter = express.Router();

likeRouter.post('/:postId', addLike);
likeRouter.delete('/:postId', dislike);

export default likeRouter;
