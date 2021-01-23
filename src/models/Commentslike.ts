import mongoose, { Schema, Document } from "mongoose";
import { DBComments } from "./Comments";
import { DBPost } from "./Post";
import { DBUser } from "./User";

const commentsLikeSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  comment: { type: Schema.Types.ObjectId, ref: 'Comments', required: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
  createdAtDate: { type: Date, default: new Date() },
  updatedAtDate: { type: Date, default: new Date() },
  visible: { type: Boolean, default: true },

}, {
  timestamps: { currentTime: () => Date.now() }
});
const CommentsLikes = mongoose.model("CommentsLikes", commentsLikeSchema);
export default CommentsLikes;


export interface DBCommentsLikes {
  _id: string;
  comment?: string|DBComments;
  user?: string | DBUser;
  post?: string | DBPost;
  createdAt?: number;
  updatedAt?: number;
  createdAtDate?: string;
  updatedAtDate?: string;
  visible?: string;
}