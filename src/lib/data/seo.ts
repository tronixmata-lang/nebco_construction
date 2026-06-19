import { connectDB } from "@/lib/db/connect";
import {
  PageSeo as PageSeoModel,
  Redirect as RedirectModel,
  SeoSettings as SeoSettingsModel,
} from "@/lib/db/models";
import { siteConfig } from "@/config/site";
import type { SeoFields } from "@/types";

const defaultSeoSettings = {
  titleTemplate: "%s | NEBCO",
  defaultDescription: siteConfig.description,
  defaultOgImage: siteConfig.ogImage,
  keywords: [
    "NEBCO",
    "NEBCO Construction",
    "construction company Nepal",
    "A-Class construction Nepal",
    "Kathmandu construction",
  ],
  googleSiteVerification: "",
  bingSiteVerification: "",
  ga4MeasurementId: "",
  gtmContainerId: "",
  clarityProjectId: "",
  facebookPixelId: "",
};

export async function getSeoSettings() {
  try {
    await connectDB();
    const doc = await SeoSettingsModel.findOne({ key: "global" }).lean();
    if (doc) {
      return {
        titleTemplate: doc.titleTemplate,
        defaultDescription: doc.defaultDescription,
        defaultOgImage: doc.defaultOgImage,
        keywords: doc.keywords ?? [],
        googleSiteVerification: doc.googleSiteVerification ?? "",
        bingSiteVerification: doc.bingSiteVerification ?? "",
        ga4MeasurementId: doc.ga4MeasurementId ?? "",
        gtmContainerId: doc.gtmContainerId ?? "",
        clarityProjectId: doc.clarityProjectId ?? "",
        facebookPixelId: doc.facebookPixelId ?? "",
      };
    }
  } catch {
    /* fallback */
  }
  return defaultSeoSettings;
}

export async function getPageSeoList() {
  try {
    await connectDB();
    const docs = await PageSeoModel.find().sort({ path: 1 }).lean();
    if (docs.length > 0) return docs;
  } catch {
    /* fallback */
  }
  return STATIC_PAGES;
}

export async function getPageSeoByPath(path: string) {
  try {
    await connectDB();
    const doc = await PageSeoModel.findOne({ path }).lean();
    if (doc) return doc;
  } catch {
    /* fallback */
  }
  return STATIC_PAGES.find((p) => p.path === path);
}

export async function getActiveRedirects(): Promise<
  { from: string; to: string; statusCode: 301 | 302 }[]
> {
  try {
    await connectDB();
    const docs = await RedirectModel.find({ active: true }).lean();
    return docs.map((d) => ({ from: d.from, to: d.to, statusCode: d.statusCode }));
  } catch {
    return [];
  }
}

export const STATIC_PAGES = [
  { path: "/", label: "Homepage" },
  { path: "/about", label: "About Us" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/divisions", label: "Divisions" },
  { path: "/sectors", label: "Industry Sectors" },
  { path: "/leadership", label: "Leadership" },
  { path: "/insights", label: "Insights" },
  { path: "/contact", label: "Contact" },
] as const;

export type ResolvedSeo = {
  title: string;
  description: string;
  ogImage?: string;
  noIndex: boolean;
  canonical?: string;
};

export function resolveSeoFields(
  defaults: { title: string; description: string; image?: string; path: string },
  seo?: SeoFields | null,
  settings?: { defaultOgImage?: string },
): ResolvedSeo {
  return {
    title: seo?.metaTitle?.trim() || defaults.title,
    description: seo?.metaDescription?.trim() || defaults.description,
    ogImage: seo?.ogImage?.trim() || defaults.image || settings?.defaultOgImage,
    noIndex: seo?.noIndex ?? false,
    canonical: seo?.canonical?.trim() || undefined,
  };
}
