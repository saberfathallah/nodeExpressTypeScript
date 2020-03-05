import mongoose, { Schema } from 'mongoose';

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
});

export default mongoose.model('User', userSchema);
