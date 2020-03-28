import Category from '../../models/category';

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ error: null, categories });
  } catch (error) {
    return res.status(500).json({ categories: null, error, });
  }
}

export default getAllCategories;
