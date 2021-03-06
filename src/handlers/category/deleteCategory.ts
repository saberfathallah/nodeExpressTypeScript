/* eslint-disable consistent-return */
import { Request, Response } from 'express';

import Category from '../../models/category';
import Post from '../../models/posts';
import Comment from '../../models/comment';
import validateUser from '../../utils/validateUser';

const deleteSubCategories = async (parentId: string, res: Response): Promise<any> => {
  try {
    const subCategoris = await Category.find({ parentId });
    if (subCategoris.length > 0) {
      await Promise.all(subCategoris.map(async (cat) => {
        await Post.deleteMany({ categoryId: cat.id });
        await Comment.deleteMany({ categoryId: cat.id });
        await deleteSubCategories(cat.id, res);
      }));
      await Category.deleteMany({ parentId });
    }
  } catch (err) {
    return res.status(500).json({ user: null, error: err });
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);
  const { categoryId } = req.params;
  try {
    await deleteSubCategories(categoryId, res);
    await Post.deleteMany({ categoryId });
    await Category.deleteOne({ _id: categoryId });
    return res.status(200).json({ error: null, categoryId });
  } catch (error) {
    return res.status(500).json({ user: null, error });
  }
};

export default deleteCategory;
