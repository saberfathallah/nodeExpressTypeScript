import mongoose, { Schema } from 'mongoose';

interface ICommentSchemaType extends mongoose.Document {
  categoryId: string;
  postId: string;
  description: string;
  userId: string;
}

const commentSchema = new Schema ({
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
      transform: (doc, comment) => {
        comment.id = comment._id;
        delete comment._id;
        delete comment.__v;
      }
    },
});

export default mongoose.model<ICommentSchemaType>('Comment', commentSchema);
