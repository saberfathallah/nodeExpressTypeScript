import express from 'express';

import {
  createUser,
  getAllUsers,
  login,
  deleteUser,
  getUserDetails,
} from '../handlers/user';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/details', getUserDetails);
userRouter.post('/login', login);
userRouter.delete('/', deleteUser);

export default userRouter;
