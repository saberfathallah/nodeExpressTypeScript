/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose, { Schema } from 'mongoose';

interface CommentSchemaType extends mongoose.Document {
  categoryId: string;
  postId: string;
  description: string;
  userId: string;
}

const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, comment): void => {
      comment.id = comment._id;
      delete comment._id;
      delete comment.__v;
    },
  },
});

export default mongoose.model<CommentSchemaType>('Comment', commentSchema);
