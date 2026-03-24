import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  googleId?: string;
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
  email?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  googleId: String,
  firstName: String,
  lastName: String,
  pictureUrl: String,
  email: String,
}, {
  timestamps: true
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;