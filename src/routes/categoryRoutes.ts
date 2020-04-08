import express from 'express';

import {
  addCategory,
  getAllCategories,
  deleteCategory,
} from '../handlers/category';

const categoryRouter = express.Router();

categoryRouter.post('/', addCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.delete('/:categoryId', deleteCategory);

export default categoryRouter;
