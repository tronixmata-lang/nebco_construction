import mongoose, { Schema, type Model } from "mongoose";

export type TestimonialDocument = {
  _id: mongoose.Types.ObjectId;
  legacyId?: string;
  quote: string;
  author: string;
  organization: string;
  role: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    legacyId: { type: String },
    quote: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Testimonial: Model<TestimonialDocument> =
  mongoose.models.Testimonial ??
  mongoose.model<TestimonialDocument>("Testimonial", TestimonialSchema);
