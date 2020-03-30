import mongoose, { Schema } from 'mongoose';

interface IUserSchemaType extends mongoose.Document {
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
  transform: (doc, post) => {
    post.id = post._id;
    delete post._id;
    delete post.__v;
  }}
});

export default mongoose.model<IUserSchemaType>('User', userSchema);
