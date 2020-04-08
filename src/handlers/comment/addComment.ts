import { Request, Response } from 'express';
import Joi from 'joi';

import validateUser from '../../utils/validateUser';
import Comment from '../../models/comment';
import Post from '../../models/posts';

const schema = Joi.object({
  description: Joi.string().required().error(() => ({ message: 'description required and string!' })),
  categoryId: Joi.objectId().required().error(() => ({ message: 'categoryId is required !' })),
  postId: Joi.objectId().required().error(() => ({ message: 'postId is required !' })),
});

const addComment = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);

  const { userid } = req.headers;
  const { postId } = req.params;
  const { error } = Joi.validate({ ...req.body, postId }, schema);

  if (error) {
    return res.status(400).json({ comment: null, error: error.details[0].message });
  }

  try {
    const commentBody = { ...req.body, userId: userid, postId };
    let comment = await Comment.create({ ...commentBody });

    await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: comment.id } });
    comment = await comment.populate('userId').execPopulate();
    return res.status(200).json({ comment, error: null });
  } catch (err) {
    return res.status(500).json({ comment: null, error: err });
  }
};

export default addComment;
