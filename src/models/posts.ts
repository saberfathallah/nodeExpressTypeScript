import mongoose, { Schema, Document } from 'mongoose';

interface IPostSchema extends Document {
  description: string;
  userId: string;
  categoryId: string;
};

const postSchema = new Schema ({
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
}, 
{ 
  timestamps: true,
  toJSON: { 
    transform: (doc, post) => {
      post.id = post._id;
      delete post._id;
      delete post.__v;
    }
  },
});

export default mongoose.model<IPostSchema>('Post', postSchema);
