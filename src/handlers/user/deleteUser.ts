import { Request, Response } from 'express';

import User from '../../models/user';

async function deleteUser(req: Request, res: Response): Promise<object> {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ error: 'cannot found user' });
    }

    await User.deleteOne({
      email,
    });

    return res.status(200).json({ error: null, user });
  } catch (error) {
    return res.status(500).json({ user: null, error });
  }
}

export default deleteUser;
