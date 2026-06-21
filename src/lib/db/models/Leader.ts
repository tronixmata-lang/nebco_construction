import mongoose, { Schema, type Model } from "mongoose";

export type LeaderDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  facebook?: string;
  email?: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const LeaderSchema = new Schema<LeaderDocument>(
  {
    legacyId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, required: true },
    image: { type: String },
    linkedin: { type: String, trim: true },
    facebook: { type: String, trim: true },
    email: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Leader: Model<LeaderDocument> =
  mongoose.models.Leader ?? mongoose.model<LeaderDocument>("Leader", LeaderSchema);
