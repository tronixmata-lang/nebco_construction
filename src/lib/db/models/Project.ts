import mongoose, { Schema, type Model } from "mongoose";
import type { ProjectCategory, ProjectShowcaseLayout } from "@/types";
import { seoFieldsSchema, type SeoFieldsDocument } from "./SeoSettings";

export type ProjectDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId?: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  description: string;
  image: string;
  images?: string[];
  featured: boolean;
  showcaseLayout: ProjectShowcaseLayout;
  published: boolean;
  sortOrder: number;
  viewCount: number;
  seo: SeoFieldsDocument;
  createdAt: Date;
  updatedAt: Date;
};

const ProjectSchema = new Schema<ProjectDocument>(
  {
    legacyId: { type: String },
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["commercial", "residential", "infrastructure", "industrial"],
      required: true,
    },
    location: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    showcaseLayout: {
      type: String,
      enum: ["auto", "hero", "wide", "standard"],
      default: "auto",
    },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    seo: seoFieldsSchema,
  },
  { timestamps: true },
);
ProjectSchema.index({ category: 1, published: 1, sortOrder: 1 });
ProjectSchema.index({ featured: 1, published: 1 });
ProjectSchema.index({ published: 1, viewCount: -1 });

export const Project: Model<ProjectDocument> =
  mongoose.models.Project ?? mongoose.model<ProjectDocument>("Project", ProjectSchema);
