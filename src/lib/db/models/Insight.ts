import mongoose, { Schema, type Model } from "mongoose";
import { seoFieldsSchema, type SeoFieldsDocument } from "./SeoSettings";

export type InsightDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  date: string;
  readTime: string;
  status: "draft" | "published";
  featured: boolean;
  sortOrder: number;
  seo: SeoFieldsDocument;
  createdAt: Date;
  updatedAt: Date;
};

const InsightSchema = new Schema<InsightDocument>(
  {
    legacyId: { type: String },
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    body: [{ type: String }],
    category: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true, default: "5 min read" },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    seo: seoFieldsSchema,
  },
  { timestamps: true },
);

InsightSchema.index({ status: 1, date: -1 });

export const Insight: Model<InsightDocument> =
  mongoose.models.Insight ?? mongoose.model<InsightDocument>("Insight", InsightSchema);
