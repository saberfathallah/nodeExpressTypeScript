import mongoose, { Schema, Document } from 'mongoose';

interface IPostSchema extends Document {
  comments: string[];
  description: string;
  userId: string;
  categoryId: string;
};

const postSchema = new Schema ({
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
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

postSchema.virtual('members', {
  ref: 'User', // The model to use
  localField: 'userId', // Find people where `localField`
  foreignField: '_id', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
});

// postSchema.virtual('userrr', {
//   ref: 'User',
//   localField: 'userId',
//   foreignField: '_id',
//   justOne: true
// });

export default mongoose.model<IPostSchema>('Post', postSchema);
