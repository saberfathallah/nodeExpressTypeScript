import express from 'express';

import {
  createUser,
  getAllUsers,
  login,
  deleteUser,
} from './handlers/user';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.post('/login', login);
router.delete('/', deleteUser);

export default router;