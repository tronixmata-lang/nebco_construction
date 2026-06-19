import mongoose, { Schema, type Model } from "mongoose";

export type CertificateDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const CertificateSchema = new Schema<CertificateDocument>(
  {
    legacyId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Certificate: Model<CertificateDocument> =
  mongoose.models.Certificate ??
  mongoose.model<CertificateDocument>("Certificate", CertificateSchema);
