/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import Joi from 'joi';

import Post from '../../models/posts';
import Category from '../../models/category';
import validateUser from '../../utils/validateUser';

const schema = Joi.object({
  categoryId: Joi.objectId().required().error(() => ({ message: 'categoryId is required !' })),
});

interface Posts {
  description: string;
  userId: string;
  categoryId: string;
}

interface Category{
  name: string;
  level: number;
  parentId: string;
  _id: string;
}

const getPostsByCategoryId = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);

  const { error } = Joi.validate(req.params, schema);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { categoryId } = req.params;
    const subCategoriesIds: string[] = [];
    const findSubCategoriesIds = async (parentId: string): Promise<any> => {
      const subCategoris: Category[] = await Category.find({ parentId });
      if (subCategoris.length > 0) {
        await Promise.all(subCategoris.map(async (cat) => {
          subCategoriesIds.push(cat._id);
          await findSubCategoriesIds(cat._id);
        }));
      }
    };

    await findSubCategoriesIds(categoryId);

    const postsSubCategories: Posts[] = await Post
      .find({ categoryId: { $in: subCategoriesIds } })
      .populate({
        path: 'comments',
        populate: { path: 'userId' },
      })
      .populate('userId');

    const posts: Posts[] = await Post
      .find({ categoryId })
      .populate({
        path: 'comments',
        populate: { path: 'userId' },
      })
      .populate('userId');

    return res.status(200).json({ posts: [...posts, ...postsSubCategories], error: null });
  } catch (err) {
    return res.status(500).json({ posts: null, error: err });
  }
};

export default getPostsByCategoryId;
