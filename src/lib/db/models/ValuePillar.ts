import mongoose, { Schema, type Model } from "mongoose";

export type ValuePillarDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ValuePillarSchema = new Schema<ValuePillarDocument>(
  {
    legacyId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const ValuePillar: Model<ValuePillarDocument> =
  mongoose.models.ValuePillar ??
  mongoose.model<ValuePillarDocument>("ValuePillar", ValuePillarSchema);
