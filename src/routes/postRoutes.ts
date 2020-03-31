import express from 'express';

import { addPost, getPostsByUserId, getPostsByCategoryId, getAllPosts } from '../handlers/post';

const postRouter = express.Router();

postRouter.post('/', addPost);
postRouter.get('/', getPostsByUserId);
postRouter.get('/all', getAllPosts);
postRouter.get('/categories/:categoryId', getPostsByCategoryId);

export default postRouter;


