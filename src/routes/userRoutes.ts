import express from 'express';

import {
  createUser,
  getAllUsers,
  login,
  deleteUser,
} from '../handlers/user';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.post('/login', login);
userRouter.delete('/', deleteUser);

export default userRouter;