import mongoose, { Schema, type Model } from "mongoose";

export type SiteContentDocument = {
  _id: mongoose.Types.ObjectId;
  key: "global";
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  companyOverview: {
    title: string;
    description: string;
  };
  about: {
    mission: string;
    vision: string;
    values: string[];
    history: string;
  };
  chairmanMessage: {
    quote: string;
    author: string;
    role: string;
  };
  certificateSection: {
    title: string;
    description: string;
  };
  siteConfig: {
    name: string;
    legalName: string;
    shortName: string;
    tagline: string;
    seoTitle: string;
    description: string;
    url: string;
    email: string;
    phone: string;
    address: string;
    businessHours: string;
    foundingDate: string;
    parentOrganization: string;
    social: {
      website: string;
      facebook: string;
      linkedin: string;
    };
  };
  updatedAt: Date;
};

const SiteContentSchema = new Schema<SiteContentDocument>(
  {
    key: { type: String, required: true, unique: true, default: "global" },
    hero: {
      headline: { type: String, required: true },
      subheadline: { type: String, required: true },
      primaryCta: {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
      secondaryCta: {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
    },
    companyOverview: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    about: {
      mission: { type: String, required: true },
      vision: { type: String, required: true },
      values: [{ type: String }],
      history: { type: String, required: true },
    },
    chairmanMessage: {
      quote: { type: String, required: true },
      author: { type: String, required: true },
      role: { type: String, required: true },
    },
    certificateSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    siteConfig: {
      name: { type: String, required: true },
      legalName: { type: String, required: true },
      shortName: { type: String, required: true },
      tagline: { type: String, required: true },
      seoTitle: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      businessHours: { type: String, required: true },
      foundingDate: { type: String, required: true },
      parentOrganization: { type: String, required: true },
      social: {
        website: { type: String, default: "" },
        facebook: { type: String, default: "" },
        linkedin: { type: String, default: "" },
      },
    },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

export const SiteContent: Model<SiteContentDocument> =
  mongoose.models.SiteContent ??
  mongoose.model<SiteContentDocument>("SiteContent", SiteContentSchema);
