import mongoose, { Schema, type Model } from "mongoose";

export type SectorCapabilityDocument = {
  title: string;
  description: string;
};

export type SectorDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId: string;
  title: string;
  description: string;
  highlight: string;
  image?: string;
  messageQuote?: string;
  messageBody: string[];
  capabilities: SectorCapabilityDocument[];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const SectorCapabilitySchema = new Schema<SectorCapabilityDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const SectorSchema = new Schema<SectorDocument>(
  {
    legacyId: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    highlight: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    messageQuote: { type: String, default: "" },
    messageBody: [{ type: String }],
    capabilities: [SectorCapabilitySchema],
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Sector: Model<SectorDocument> =
  mongoose.models.Sector ?? mongoose.model<SectorDocument>("Sector", SectorSchema);
