import { Request, Response } from 'express';

import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

const getAllPosts = async (req: Request, res: Response) => {
  validateUser(req, res);
  const { from, limit }:any = req.params;
  const intForm = Number(from);
  const intLimit = Number(limit);

  try {
    const totalPosts = await Post.count({ });
    const posts = await Post.find().skip(intForm)
    .limit(intLimit).populate('userId').
    populate({
      path: 'comments',
      populate: { path: 'userId' }
    });
    return res.status(200).json({ error: null, posts, totalPosts });
  } catch (error) {
    return res.status(500).json({ categories: null, error, });
  }
}

export default getAllPosts;
