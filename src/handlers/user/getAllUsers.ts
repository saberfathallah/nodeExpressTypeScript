import User from '../../models/user';

const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ error: null, users });
}

export default getAllUsers;