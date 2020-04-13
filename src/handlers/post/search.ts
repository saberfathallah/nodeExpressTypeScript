import { Request, Response } from 'express';

import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

const search = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);
  const { query }: any = req.params;
  const regex = new RegExp(query, 'i');

  try {
    const posts = await Post.find({ description: { $regex: regex } }).populate('userId')
      .populate({
        path: 'comments',
        populate: { path: 'userId' },
      });
    return res.status(200).json({ error: null, posts });
  } catch (error) {
    return res.status(500).json({ categories: null, error });
  }
};

export default search;
