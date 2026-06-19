import mongoose, { Schema, type Model } from "mongoose";

export type UserDocument = {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  role: "superadmin" | "editor";
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["superadmin", "editor"], default: "editor" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

export const User: Model<UserDocument> =
  mongoose.models.User ?? mongoose.model<UserDocument>("User", UserSchema);
