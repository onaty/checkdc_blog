import mongoose, { Schema, Document } from "mongoose";
import { DBPost } from "./Post";
import { DBUser } from "./User";

const commentsSchema: Schema = new Schema({
  comment: {
    type: String, required: true, max: 255, min: 6,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
  createdAtDate: { type: Date, default: new Date() },
  updatedAtDate: { type: Date, default: new Date() },
  visible: { type: Boolean, default: true },

}, {
  timestamps: { currentTime: () => Date.now() }
});
const Comments = mongoose.model("Comments", commentsSchema);
export default Comments;


export interface DBComments {
  _id: string;
  comment?: string;
  user?: string | DBUser;
  post?: string | DBPost;
  createdAt?: number;
  updatedAt?: number;
  createdAtDate?: string;
  updatedAtDate?: string;
  visible?: string;
}