import mongoose, { Schema, Document } from "mongoose";

const postSchema: Schema = new Schema({
  title: {
    type: String, required: true, max: 255, min: 6,
  },
  description: {
    type: String, required: true, max: 1055, min: 6,
  },
  createdby: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
  createdAtDate: { type: Date, default:new Date() },
  updatedAtDate: { type: Date , default:new Date()},
  visible: { type: Boolean, default: true },

}, {
  timestamps: { currentTime: () => Date.now() }
});

const Post = mongoose.model("Post", postSchema);
export default Post;
