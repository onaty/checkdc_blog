import mongoose, { Schema, Document } from "mongoose";
import { DBPost } from "./Post";
import { DBUser } from "./User";

const postsLikesSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
  createdAtDate: { type: Date, default: new Date() },
  updatedAtDate: { type: Date, default: new Date() },
  visible: { type: Boolean, default: true }
}, {
  timestamps: { currentTime: () => Date.now() }
});

const PostLike = mongoose.model("PostLike", postsLikesSchema);
export default PostLike;


export interface DBPostLikes {
  _id: string;
  user?: string | DBUser;
  post?: string | DBPost;
  createdAt?: number;
  updatedAt?: number;
  createdAtDate?: string;
  updatedAtDate?: string;
  visible?: string;
}