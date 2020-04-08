
import { Request, Response } from 'express';

const validateUser = (req: Request, res: Response): void => {
  const { userid } = req.headers;

  if (!userid) {
    res.status(422).json({ error: 'error authentification' });
    throw new Error('error authentification');
  }
};

export default validateUser;
