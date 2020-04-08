import Joi from 'joi';
import { Request, Response } from 'express';

import Category from '../../models/category';
import validateUser from '../../utils/validateUser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
Joi.objectId = require('joi-objectid')(Joi);

const schema = Joi.object({
  name: Joi.string().required().error(() => ({ message: 'name is required or string !' })),
  level: Joi.number().required().valid(1, 2, 3, 4).error(() => ({ message: 'level is required or one of 1, 2, 3, 4 !' })),
  parentId: Joi.objectId().optional().error(() => ({ message: 'categoryId is obejctId !' })),
});

const addCategory = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);

  const categoryBody = req.body;
  const { error } = Joi.validate(categoryBody, schema);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const category = await Category.create({
      ...categoryBody,
    });
    await Category.findOneAndUpdate({ _id: category.parentId },
      { $push: { children: category.id } });

    return res.status(200).json({ error: null, category });
  } catch (err) {
    return res.status(500).json({ category: null, error: err });
  }
};

export default addCategory;
