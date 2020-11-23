import { Request, Response } from 'express';

import User from '../../models/user';
import validateUser from '../../utils/validateUser';

const getUserDetails = async (req: Request, res: Response): Promise<object> => {
  validateUser(req, res);
  const { userid }: any = req.headers;
  try {
    const user = await User.findOne({ _id: userid });
    return res.status(200).json({ error: null, user });
  } catch (error) {
    return res.status(500).json({ error, user: null });
  }
};

export default getUserDetails;
