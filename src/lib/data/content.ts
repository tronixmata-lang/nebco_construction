import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import {
  Certificate as CertificateModel,
  Division as DivisionModel,
  Leader as LeaderModel,
  SiteContent as SiteContentModel,
  Stat as StatModel,
  Testimonial as TestimonialModel,
  ValuePillar as ValuePillarModel,
} from "@/lib/db/models";
import { divisions as staticDivisions, getDivisionBySlug as staticGetDivision } from "@/content/divisions";
import { valuePillars as staticPillars } from "@/content/pillars";
import { leaders as staticLeaders } from "@/content/leadership";
import {
  certificateSection as staticCertSection,
  companyStats as staticStats,
  testimonials as staticTestimonials,
} from "@/content/homepage";
import {
  defaultPageHeroImages,
  resolveHomepageHeroImage,
  resolvePageHeroImages,
} from "@/config/page-images";
import type {
  Certificate as CertificateType,
  Division,
  IndustrySector,
  Leader,
  Stat,
  Testimonial,
  ValuePillar,
} from "@/types";
import {
  getDefaultSiteContent,
  mapSiteContentDocument,
} from "@/lib/data/site-content-defaults";
import type { SiteContentDocument } from "@/lib/db/models/SiteContent";

/** Deduped per request via React cache — many components call this in a single render. */
export const getSiteContent = cache(async () => {
  try {
    await connectDB();
    const doc = await SiteContentModel.findOne({ key: "global" }).lean();
    if (doc) {
      const content = mapSiteContentDocument(doc as SiteContentDocument);
      return {
        ...content,
        hero: {
          ...content.hero,
          backgroundImage: resolveHomepageHeroImage(content.hero.backgroundImage),
        },
        pageHeroImages: resolvePageHeroImages(content.pageHeroImages),
      };
    }
  } catch {
    /* fallback */
  }

  const defaults = getDefaultSiteContent();
  return {
    ...defaults,
    hero: {
      ...defaults.hero,
      backgroundImage: resolveHomepageHeroImage(defaults.hero.backgroundImage),
    },
    pageHeroImages: defaultPageHeroImages,
  };
});

export const getDivisions = cache(async (): Promise<Division[]> => {
  try {
    await connectDB();
    const docs = await DivisionModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        id: d.legacyId,
        slug: d.slug,
        name: d.name,
        shortName: d.shortName,
        tagline: d.tagline,
        description: d.description,
        services: d.services as string[],
        href: d.href,
      }));
    }
  } catch {
    /* fallback */
  }
  return staticDivisions;
});

export const getDivisionBySlug = cache(async (slug: string): Promise<Division | undefined> => {
  try {
    await connectDB();
    const doc = await DivisionModel.findOne({ slug, published: true }).lean();
    if (doc) {
      return {
        id: doc.legacyId,
        slug: doc.slug,
        name: doc.name,
        shortName: doc.shortName,
        tagline: doc.tagline,
        description: doc.description,
        services: doc.services,
        href: doc.href,
      };
    }
  } catch {
    /* fallback */
  }
  return staticGetDivision(slug);
});

export async function getSectors(): Promise<IndustrySector[]> {
  const { getSectorsList } = await import("@/lib/data/sectors");
  return getSectorsList();
}

export const getValuePillars = cache(async (): Promise<ValuePillar[]> => {
  try {
    await connectDB();
    const docs = await ValuePillarModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        id: d.legacyId,
        title: d.title,
        description: d.description,
        icon: d.icon,
      }));
    }
  } catch {
    /* fallback */
  }
  return staticPillars;
});

export const getLeaders = cache(async (): Promise<Leader[]> => {
  try {
    await connectDB();
    const docs = await LeaderModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        id: d.legacyId,
        name: d.name,
        role: d.role,
        bio: d.bio,
        image: d.image,
        linkedin: d.linkedin,
        facebook: d.facebook,
        email: d.email,
      }));
    }
  } catch {
    /* fallback */
  }
  return staticLeaders;
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  try {
    await connectDB();
    const docs = await TestimonialModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        id: d.legacyId ?? d._id.toString(),
        quote: d.quote,
        author: d.author,
        organization: d.organization,
        role: d.role,
      }));
    }
  } catch {
    /* fallback */
  }
  return staticTestimonials;
});

export const getStats = cache(async (): Promise<Stat[]> => {
  try {
    await connectDB();
    const docs = await StatModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        id: d.legacyId,
        value: d.value,
        label: d.label,
      }));
    }
  } catch {
    /* fallback */
  }
  return staticStats;
});

export const getCertificates = cache(async (): Promise<CertificateType[]> => {
  try {
    await connectDB();
    const docs = await CertificateModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        id: d.legacyId,
        title: d.title,
        subtitle: d.subtitle,
        image: d.image,
        alt: d.alt,
      }));
    }
  } catch {
    /* fallback */
  }
  return staticCertSection.certificates;
});
