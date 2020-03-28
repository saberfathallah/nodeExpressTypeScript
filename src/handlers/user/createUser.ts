import Joi from 'joi';
import bcrypt from 'bcryptjs';

import User from '../../models/user';

const schema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(() => ({
      message: 'email is required !',
    })),
  name: Joi.string()
    .required()
    .error(() => ({
      message: 'name is required !',
    })),
  password: Joi.string()
    .required()
    .error(() => ({
      message: 'password is required !',
    })),
});

const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  const { error } = Joi.validate({ email, name, password }, schema);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const fetchUser = await User.findOne({ email });
    if (fetchUser) {
      return res.status(400).json({ error: 'User account already exist' });
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, name, password: passwordHash });
    return res.status(200).json({ error: null, user });
  } catch (err) {
    return res.status(500).json({ user: null, error: err });
  }
}

export default createUser;
