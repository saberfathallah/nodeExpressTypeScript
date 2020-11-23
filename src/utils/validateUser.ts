
import { Request, Response } from 'express';

const validateUser = (req: Request, res: Response): void => {
  const { userid } = req.headers;

  if (!userid) {
    res.status(401).json({ error: 'error authentification' });
  }
};

export default validateUser;
