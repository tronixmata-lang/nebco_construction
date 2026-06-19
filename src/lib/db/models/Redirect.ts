import mongoose, { Schema, type Model } from "mongoose";

export type RedirectDocument = {
  _id: mongoose.Types.ObjectId;
  from: string;
  to: string;
  statusCode: 301 | 302;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const RedirectSchema = new Schema<RedirectDocument>(
  {
    from: { type: String, required: true, unique: true, trim: true },
    to: { type: String, required: true, trim: true },
    statusCode: { type: Number, enum: [301, 302], default: 301 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Redirect: Model<RedirectDocument> =
  mongoose.models.Redirect ?? mongoose.model<RedirectDocument>("Redirect", RedirectSchema);
