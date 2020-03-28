import mongoose, { Schema } from 'mongoose';

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
  transform: (doc, cat) => {
    cat.id = cat._id;
    delete cat._id;
    delete cat.__v;
  }}
});

export default mongoose.model('User', userSchema);
