import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/auth';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'] 
    },
    password: { type: String, required: true },
    // Aquí ponemos tus roles de veterinaria
    role: { 
      type: String, 
      enum: Object.values(UserRole), 
      default: UserRole.DUENIO 
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);


export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }).lean();
};

export const createUser = async (userData: Partial<IUser>) => {
  const newUser = new User(userData);
  return await newUser.save();
};