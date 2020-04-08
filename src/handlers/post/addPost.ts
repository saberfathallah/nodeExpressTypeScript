import { Request, Response } from 'express';
import Joi from 'joi';

import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
Joi.objectId = require('joi-objectid')(Joi);

const schema = Joi.object({
  description: Joi.string().required().error(() => ({ message: 'description is required and required' })),
  categoryId: Joi.objectId().required().error(() => ({ message: 'categoryId is required !' })),
});

const addPost = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);
  const { userid } = req.headers;
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const postBody = { ...req.body, userId: userid };
    const post = await Post.create({ ...postBody, comments: [] });
    return res.status(200).json({ error: null, post });
  } catch (err) {
    return res.status(500).json({ category: null, error: err });
  }
};

export default addPost;
