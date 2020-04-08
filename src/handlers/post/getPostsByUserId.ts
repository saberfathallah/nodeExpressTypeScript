import { Request, Response } from 'express';

import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

const getPostsByUserId = async (req: Request, res: Response): Promise<object> => {
  try {
    validateUser(req, res);
    const { userid } = req.headers;
    const query: any = { userId: userid };
    const posts = await Post.find(query).populate('userId').populate({
      path: 'comments',
      populate: { path: 'userId' },
    });
    return res.status(200).json({ error: null, posts });
  } catch (error) {
    return res.status(500).json({ posts: null, error });
  }
};

export default getPostsByUserId;
