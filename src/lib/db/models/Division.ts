import mongoose, { Schema, type Model } from "mongoose";

export type DivisionDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  services: string[];
  href: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const DivisionSchema = new Schema<DivisionDocument>(
  {
    legacyId: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    services: [{ type: String }],
    href: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Division: Model<DivisionDocument> =
  mongoose.models.Division ?? mongoose.model<DivisionDocument>("Division", DivisionSchema);
