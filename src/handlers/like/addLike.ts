import { Request, Response } from 'express';
import Joi from 'joi';

import validateUser from '../../utils/validateUser';
import Post from '../../models/posts';

const schema = Joi.object({
  postId: Joi.objectId().required().error(() => ({ message: 'postId is required !' })),
});

const addLike = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);

  const { userid } = req.headers;
  const { postId } = req.params;
  const { error } = Joi.validate({ ...req.params, postId }, schema);

  if (error) {
    return res.status(400).json({ comment: null, error: error.details[0].message });
  }

  try {
    await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: userid } });
    return res.status(200).json({ userId: userid, postId, error: null });
  } catch (err) {
    return res.status(500).json({ comment: null, error: err });
  }
};

export default addLike;
