import mongoose, { Schema, type Model } from "mongoose";
import type { PageHeroImages } from "@/config/page-images";

export type SiteContentDocument = {
  _id: mongoose.Types.ObjectId;
  key: "global";
  hero: {
    headline: string;
    subheadline: string;
    backgroundImage?: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  pageHeroImages?: Partial<PageHeroImages>;
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
    image?: string;
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
      backgroundImage: { type: String, trim: true },
      primaryCta: {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
      secondaryCta: {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
    },
    pageHeroImages: {
      about: { type: String, trim: true },
      portfolio: { type: String, trim: true },
      divisions: { type: String, trim: true },
      sectors: { type: String, trim: true },
      insights: { type: String, trim: true },
      leadership: { type: String, trim: true },
      contact: { type: String, trim: true },
      legal: { type: String, trim: true },
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
      image: { type: String, trim: true },
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
