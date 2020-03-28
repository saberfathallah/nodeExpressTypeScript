import Category from '../../models/category';
import validateUser from '../../utils/validateUser';

const deleteSubCategories = async (parentId: string) => {
  const subCategoris = await Category.find({ parentId });
  if (subCategoris.length > 0) {
    await Category.deleteMany({ parentId })
    Promise.all(subCategoris.map(cat => deleteSubCategories(cat.id)));
  } 
}

const deleteCategory = async (req, res) => {
  validateUser(req, res);
  const { categoryId } = req.params;
  try {
    await Category.deleteOne({ _id: categoryId});
    deleteSubCategories(categoryId);
    return res.status(200).json({ error: null, categoryId });
  } catch (error) {
    return res.status(500).json({ user: null, error });
   }
}

export default deleteCategory;
