import mongoose, { Schema } from 'mongoose';

interface CategorySchemaType extends mongoose.Document {
    name: string;
    level: number;
    parentId: string;
    id: string;
}

const categorySchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4],
  },
  parentId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
}, 
{
  toJSON: { 
    transform: (doc, cat) => {
      cat.id = cat._id;
      delete cat._id;
      delete cat.__v;
    }
  },
});

export default mongoose.model<CategorySchemaType>('Category', categorySchema);
