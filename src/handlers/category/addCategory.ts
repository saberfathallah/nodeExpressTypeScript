import Joi from 'joi';
import { Request, Response } from 'express';

import Category from '../../models/category';
import validateUser from '../../utils/validateUser';

Joi.objectId = require('joi-objectid')(Joi)

const schema = Joi.object({
  name: Joi.string().required().error(() => ({ message: 'name is required or string !' })),
  level: Joi.number().required().valid(1, 2, 3, 4).error(() => ({ message: 'level is required or one of 1, 2, 3, 4 !' })),
  parentId: Joi.objectId().required().error(() => ({ message: 'categoryId is required !' }))
});

const addCategory = async (req: Request, res: Response) => {
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
    return res.status(200).json({ error: null, category });
   } catch (error) {
     return res.status(500).json({ category: null, error });
  }
}

export default addCategory;
