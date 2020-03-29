import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    validateUser(req, res);
    const { userid } = req.headers;
    const query:any =  { userId: userid };
    const posts = await Post.find(query);
    return res.status(200).json({ error: null, posts });
  } catch (error) {
    return res.status(500).json({ category: null, error });
  };
}

export default getPostsByUserId;
