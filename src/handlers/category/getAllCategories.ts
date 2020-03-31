import { Request, Response } from 'express';

import Category from '../../models/category';
import validateUser from '../../utils/validateUser';

const getAllCategories = async (req: Request, res: Response) => {
  validateUser(req, res);
  try {
    const categories = await Category.find();
    return res.status(200).json({ error: null, categories });
  } catch (error) {
    return res.status(500).json({ categories: null, error, });
  }
}

export default getAllCategories;
