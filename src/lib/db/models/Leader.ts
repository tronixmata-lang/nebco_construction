import mongoose, { Schema, type Model } from "mongoose";

export type LeaderArticleDocument = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  date: string;
  readTime: string;
  image?: string;
};

export type LeaderDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  facebook?: string;
  email?: string;
  messageQuote?: string;
  messageBody: string[];
  articles: LeaderArticleDocument[];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const LeaderArticleSchema = new Schema<LeaderArticleDocument>(
  {
    slug: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    body: [{ type: String }],
    category: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true, default: "5 min read" },
    image: { type: String, trim: true },
  },
  { _id: false },
);

const LeaderSchema = new Schema<LeaderDocument>(
  {
    legacyId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, required: true },
    image: { type: String },
    linkedin: { type: String, trim: true },
    facebook: { type: String, trim: true },
    email: { type: String, trim: true },
    messageQuote: { type: String, default: "" },
    messageBody: [{ type: String }],
    articles: [LeaderArticleSchema],
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Leader: Model<LeaderDocument> =
  mongoose.models.Leader ?? mongoose.model<LeaderDocument>("Leader", LeaderSchema);
