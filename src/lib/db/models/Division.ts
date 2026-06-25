import mongoose, { Schema, type Model } from "mongoose";

export type DivisionCapabilityDocument = {
  title: string;
  description: string;
};

export type DivisionProcessStepDocument = {
  title: string;
  description: string;
};

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
  highlight?: string;
  overview?: string;
  heroImage?: string;
  capabilities: DivisionCapabilityDocument[];
  process: DivisionProcessStepDocument[];
  commitments: string[];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const DivisionCapabilitySchema = new Schema<DivisionCapabilityDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const DivisionProcessStepSchema = new Schema<DivisionProcessStepDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

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
    highlight: { type: String, default: "", trim: true },
    overview: { type: String, default: "" },
    heroImage: { type: String, trim: true },
    capabilities: [DivisionCapabilitySchema],
    process: [DivisionProcessStepSchema],
    commitments: [{ type: String }],
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Division: Model<DivisionDocument> =
  mongoose.models.Division ?? mongoose.model<DivisionDocument>("Division", DivisionSchema);
