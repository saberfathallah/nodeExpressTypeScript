/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose, { Schema } from 'mongoose';

interface UserSchemaType extends mongoose.Document {
  email: string;
  name: string;
  password: string;
}

const userSchema = new Schema({
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
},
{
  // toJSON: { virtuals: true, versionKey: false },
  toJSON: {
    transform: (doc, post): void => {
      post.id = post._id;
      delete post._id;
      delete post.__v;
    },
  },
});

export default mongoose.model<UserSchemaType>('User', userSchema);
