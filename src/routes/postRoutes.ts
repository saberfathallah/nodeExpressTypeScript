import express from 'express';

import { addPost, getPostsByUserId, getPostsByCategoryId } from '../handlers/post';

const postRouter = express.Router();

postRouter.post('/', addPost);
postRouter.get('/', getPostsByUserId);
postRouter.get('/categories/:categoryId', getPostsByCategoryId);

export default postRouter;


