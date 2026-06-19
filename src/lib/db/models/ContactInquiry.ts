import mongoose, { Schema, type Model } from "mongoose";

export type ContactInquiryDocument = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

const ContactInquirySchema = new Schema<ContactInquiryDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    organization: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
    notes: { type: String },
  },
  { timestamps: true },
);

ContactInquirySchema.index({ status: 1, createdAt: -1 });

export const ContactInquiry: Model<ContactInquiryDocument> =
  mongoose.models.ContactInquiry ??
  mongoose.model<ContactInquiryDocument>("ContactInquiry", ContactInquirySchema);
