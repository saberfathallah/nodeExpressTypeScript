import { Request, Response } from 'express';

import User from '../../models/user';

const getAllUsers = async (req: Request, res: Response): Promise<object> => {
  const users = await User.find();
  return res.status(200).json({ error: null, users });
};

export default getAllUsers;
