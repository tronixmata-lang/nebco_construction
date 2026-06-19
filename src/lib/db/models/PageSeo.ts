import mongoose, { Schema, type Model } from "mongoose";
import type { SeoFieldsDocument } from "./SeoSettings";

export type PageSeoDocument = {
  _id: mongoose.Types.ObjectId;
  path: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  focusKeyword: string;
  noIndex: boolean;
  canonical: string;
  updatedAt: Date;
};

const PageSeoSchema = new Schema<PageSeoDocument>(
  {
    path: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    focusKeyword: { type: String, default: "" },
    noIndex: { type: Boolean, default: false },
    canonical: { type: String, default: "" },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

export const PageSeo: Model<PageSeoDocument> =
  mongoose.models.PageSeo ?? mongoose.model<PageSeoDocument>("PageSeo", PageSeoSchema);

export type { SeoFieldsDocument };
