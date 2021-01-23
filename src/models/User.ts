import mongoose, { Schema, Document } from "mongoose";

const userSchema: Schema = new Schema({
  firstname: {
    type: String, required: true, max: 255, min: 6,
  },
  lastname: {
    type: String, required: true, max: 255, min: 6,
  },
  email: {
    type: String, required: true, max: 255, min: 6,
  },
  password: {
    type: String, required: false, max: 1024, min: 6,
  },
  createdAt: { type: Number },
  updatedAt: { type: Number },
  createdAtDate: { type: Date, default:new Date() },
  updatedAtDate: { type: Date , default:new Date()},
  visible: { type: Boolean, default: true },

}, {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Date.now() }
});
const User = mongoose.model("User", userSchema);
export default User;
