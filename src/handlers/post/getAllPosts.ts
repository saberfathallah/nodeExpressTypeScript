import { Request, Response } from 'express';

import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

const getAllPosts = async (req: Request, res: Response) => {
  validateUser(req, res);
  try {
    const posts = await Post.find().populate('comments');
    return res.status(200).json({ error: null, posts });
  } catch (error) {
    return res.status(500).json({ categories: null, error, });
  }
}

export default getAllPosts;
