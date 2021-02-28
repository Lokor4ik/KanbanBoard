import mongoose, { Schema, Document } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const User = mongoose.model<UserInterface>('user', UserSchema);

export default User;
