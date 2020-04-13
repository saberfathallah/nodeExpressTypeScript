import { Request, Response } from 'express';
import Joi from 'joi';

import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

const schema = Joi.object({
  postId: Joi.objectId().required().error(() => ({ message: 'postId is required !' })),
});

async function dislike(req: Request, res: Response): Promise<object> {
  validateUser(req, res);
  const { postId } = req.params;
  const { error } = Joi.validate({ ...req.params, postId }, schema);
  const { userid } = req.headers;

  if (error) {
    return res.status(400).json({ comment: null, error: error.details[0].message });
  }

  try {
    await Post.update(
      { _id: postId },
      { $pull: { likes: userid } },
    );
    return res.status(200).json({ error: null, userId: userid, postId });
  } catch (err) {
    return res.status(500).json({ user: null, error: err });
  }
}

export default dislike;
