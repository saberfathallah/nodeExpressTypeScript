import { Request, Response } from 'express';

import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

const getAllPosts = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);
  const { from, limit }: any = req.params;
  const intForm = Number(from);
  const intLimit = Number(limit);

  try {
    // const a: any = await Post.aggregate([
    //   {
    //     $lookup: {
    //       from: 'comments',
    //       localField: '_id',
    //       foreignField: 'postId',
    //       as: 'commentsObject',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'userObject',
    //     },
    //   },
    // ]);


    // nested
    // const b: any = await Post.aggregate([
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'userObject',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'comments',
    //       localField: '_id',
    //       foreignField: 'postId',
    //       as: 'comments',
    //     },
    //   },
    //   { $unwind: '$comments' },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'comments.userId',
    //       foreignField: '_id',
    //       as: 'comments.user',
    //     },
    //   },
    //   { $unwind: '$comments.user' },
    // ]);
    // console.log('b', b);
    const totalPosts = await Post.count({ });
    const posts = await Post.find().skip(intForm)
      .limit(intLimit)
      .populate('userId')
      .populate({
        path: 'comments',
        populate: { path: 'userId' },
      });
    return res.status(200).json({ error: null, posts, totalPosts });
  } catch (error) {
    return res.status(500).json({ categories: null, error });
  }
};

export default getAllPosts;
