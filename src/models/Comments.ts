import mongoose, { Schema, Document } from "mongoose";

const commentsSchema: Schema = new Schema({
  comment: {
    type: String, required: true, max: 255, min: 6,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
  createdAtDate: { type: Date, default:new Date() },
  updatedAtDate: { type: Date , default:new Date()},
  visible: { type: Boolean, default: true },

}, {
  timestamps: { currentTime: () => Date.now() }
});
const Comment = mongoose.model("Comment", commentsSchema);
export default Comment;
