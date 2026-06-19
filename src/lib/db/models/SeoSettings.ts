import mongoose, { Schema, type Model } from "mongoose";

export type SeoSettingsDocument = {
  _id: mongoose.Types.ObjectId;
  key: "global";
  titleTemplate: string;
  defaultDescription: string;
  defaultOgImage: string;
  keywords: string[];
  googleSiteVerification: string;
  bingSiteVerification: string;
  ga4MeasurementId: string;
  gtmContainerId: string;
  clarityProjectId: string;
  facebookPixelId: string;
  updatedAt: Date;
};

const SeoSettingsSchema = new Schema<SeoSettingsDocument>(
  {
    key: { type: String, required: true, unique: true, default: "global" },
    titleTemplate: { type: String, default: "%s | NEBCO" },
    defaultDescription: { type: String, default: "" },
    defaultOgImage: { type: String, default: "/opengraph-image" },
    keywords: [{ type: String }],
    googleSiteVerification: { type: String, default: "" },
    bingSiteVerification: { type: String, default: "" },
    ga4MeasurementId: { type: String, default: "" },
    gtmContainerId: { type: String, default: "" },
    clarityProjectId: { type: String, default: "" },
    facebookPixelId: { type: String, default: "" },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

export const SeoSettings: Model<SeoSettingsDocument> =
  mongoose.models.SeoSettings ??
  mongoose.model<SeoSettingsDocument>("SeoSettings", SeoSettingsSchema);

export const seoFieldsSchema = {
  metaTitle: { type: String, default: "" },
  metaDescription: { type: String, default: "" },
  ogImage: { type: String, default: "" },
  focusKeyword: { type: String, default: "" },
  noIndex: { type: Boolean, default: false },
  canonical: { type: String, default: "" },
};

export type SeoFieldsDocument = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  focusKeyword?: string;
  noIndex?: boolean;
  canonical?: string;
};
