import { Request, Response } from 'express';

import Category from '../../models/category';
import validateUser from '../../utils/validateUser';

const deleteSubCategories = async (parentId: string, res: Response) => {
  try {
    const subCategoris = await Category.find({ parentId });
    if (subCategoris.length > 0) {
      await Promise.all(subCategoris.map(cat => deleteSubCategories(cat.id, res)));
      await Category.deleteMany({ parentId })
    } 
  } catch (err) {
    return res.status(500).json({ user: null, error: err });
  }
}

const deleteCategory = async (req: Request, res: Response) => {
  validateUser(req, res);
  const { categoryId } = req.params;
  try {
    await deleteSubCategories(categoryId, res);
    await Category.deleteOne({ _id: categoryId});
    return res.status(200).json({ error: null, categoryId });
  } catch (error) {
    return res.status(500).json({ user: null, error });
   }
}

export default deleteCategory;
