import mongoose, { Schema, type Model } from "mongoose";

export type StatDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId: string;
  value: string;
  label: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const StatSchema = new Schema<StatDocument>(
  {
    legacyId: { type: String, required: true },
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Stat: Model<StatDocument> =
  mongoose.models.Stat ?? mongoose.model<StatDocument>("Stat", StatSchema);
