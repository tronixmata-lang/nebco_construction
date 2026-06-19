import mongoose, { Schema, type Model } from "mongoose";

export type SectorDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId: string;
  title: string;
  description: string;
  highlight: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const SectorSchema = new Schema<SectorDocument>(
  {
    legacyId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    highlight: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Sector: Model<SectorDocument> =
  mongoose.models.Sector ?? mongoose.model<SectorDocument>("Sector", SectorSchema);
