import { defaultPageHeroImages } from "@/config/page-images";
import { heroFeatureCards as staticHeroFeatureCards } from "@/config/hero";
import { siteConfig as staticSiteConfig } from "@/config/site";
import {
  aboutContent as staticAbout,
  certificateSection as staticCertSection,
  companyOverview as staticOverview,
  heroContent as staticHero,
} from "@/content/homepage";
import { chairmanMessage as staticChairman } from "@/content/leadership";
import type { SiteContentDocument } from "@/lib/db/models/SiteContent";
import type {
  AboutPageIntro,
  CtaBannerContent,
  HeroFeatureCard,
  HomepageSections,
} from "@/types/site-content";

export type SiteContentData = Omit<SiteContentDocument, "_id" | "updatedAt">;

export const defaultTrustPoints = [
  "A-Class construction license recognized across Nepal",
  "Part of the esteemed Shah Group",
  "Trusted by 500+ clients and NRNs worldwide",
  "On-time, on-budget delivery, every project",
] as const;

export const defaultAboutPageIntro: AboutPageIntro = {
  eyebrow: "About NEBCO",
  title: "Building Confidence. Creating Value.",
  description:
    "For over three decades, NEBCO has been a trusted partner in construction, investment, and consulting across Nepal and beyond.",
  backgroundAlt: "NEBCO construction project in progress",
};

export const defaultCtaBanner: CtaBannerContent = {
  title: "Ready to Build Something Great?",
  description:
    "Partner with NEBCO for integrated construction, investment, and consulting solutions.",
  primaryCta: { label: "Get in Touch", href: "/contact" },
  secondaryCta: { label: "View Our Work", href: "/portfolio" },
};

export const defaultHeroFeatureCards: HeroFeatureCard[] = staticHeroFeatureCards.map((card) => ({
  title: card.title,
  cta: card.cta,
  href: card.href,
  image: card.image,
  imageAlt: card.imageAlt,
}));

export const defaultHomepageSections: HomepageSections = {
  certificates: { eyebrow: "Certificate" },
  divisions: {
    eyebrow: "Our Verticals",
    title: "Integrated Solutions Across Three Core Businesses",
    description:
      "NEBCO operates through three strategically connected verticals, each delivering specialized expertise while working together to create comprehensive development solutions.",
  },
  valuePillars: {
    eyebrow: "Why NEBCO",
    title: "Our Core Values",
    description:
      "Five pillars that define how we work, how we partner, and how we deliver lasting results.",
  },
  featuredProjects: {
    eyebrow: "Our Work",
    title: "Esteemed Projects",
    description:
      "A showcase of NEBCO's residential, commercial, and infrastructure projects across Nepal and beyond.",
  },
  sectors: {
    eyebrow: "Industries We Serve",
    title: "Sector Expertise",
    description:
      "NEBCO serves a broad range of sectors with A-Class credentials, decades of experience, and a track record clients can verify.",
  },
  testimonials: {
    eyebrow: "Trusted Partners",
    title: "What Our Clients Say",
    description:
      "Real feedback from homeowners, commercial clients, and hospitality partners who chose NEBCO for quality, transparency, and on-time delivery.",
  },
  insights: {
    eyebrow: "Insights & News",
    title: "Industry Perspectives",
    description:
      "Thought leadership on construction, infrastructure, investment, and project management.",
  },
};

export function getDefaultSiteContent(): SiteContentData {
  return {
    key: "global",
    hero: { ...staticHero },
    heroFeatureCards: defaultHeroFeatureCards.map((card) => ({ ...card })),
    pageHeroImages: { ...defaultPageHeroImages },
    companyOverview: {
      title: staticOverview.title,
      description: staticOverview.description,
      trustPoints: [...defaultTrustPoints],
    },
    about: {
      mission: staticAbout.mission,
      vision: staticAbout.vision,
      values: [...staticAbout.values],
      history: staticAbout.history,
    },
    aboutPageIntro: { ...defaultAboutPageIntro },
    chairmanMessage: { ...staticChairman },
    certificateSection: {
      title: staticCertSection.title,
      description: staticCertSection.description,
    },
    ctaBanner: { ...defaultCtaBanner },
    homepageSections: {
      certificates: { ...defaultHomepageSections.certificates },
      divisions: { ...defaultHomepageSections.divisions },
      valuePillars: { ...defaultHomepageSections.valuePillars },
      featuredProjects: { ...defaultHomepageSections.featuredProjects },
      sectors: { ...defaultHomepageSections.sectors },
      testimonials: { ...defaultHomepageSections.testimonials },
      insights: { ...defaultHomepageSections.insights },
    },
    siteConfig: {
      name: staticSiteConfig.name,
      legalName: staticSiteConfig.legalName,
      shortName: staticSiteConfig.shortName,
      tagline: staticSiteConfig.tagline,
      seoTitle: staticSiteConfig.seoTitle,
      description: staticSiteConfig.description,
      url: staticSiteConfig.url,
      email: staticSiteConfig.email,
      phone: staticSiteConfig.phone,
      address: staticSiteConfig.address,
      businessHours: staticSiteConfig.businessHours,
      foundingDate: staticSiteConfig.foundingDate,
      parentOrganization: staticSiteConfig.parentOrganization,
      logo: staticSiteConfig.logo,
      siteLogo: staticSiteConfig.siteLogo,
      social: {
        website: staticSiteConfig.social.website,
        facebook: staticSiteConfig.social.facebook,
        linkedin: staticSiteConfig.social.linkedin,
      },
    },
  };
}

function mergeCtaBanner(existing: CtaBannerContent, patch?: Partial<CtaBannerContent>): CtaBannerContent {
  return {
    ...existing,
    ...patch,
    primaryCta: {
      ...existing.primaryCta,
      ...patch?.primaryCta,
    },
    secondaryCta: {
      ...existing.secondaryCta,
      ...patch?.secondaryCta,
    },
  };
}

/** Deep-merge admin patches so partial saves do not wipe nested site settings. */
export function mergeSiteContentUpdate(
  existing: SiteContentData,
  patch: Partial<SiteContentData>,
): SiteContentData {
  const heroPatch = patch.hero;

  return {
    key: "global",
    hero: {
      ...existing.hero,
      ...heroPatch,
      primaryCta: {
        ...existing.hero.primaryCta,
        ...heroPatch?.primaryCta,
      },
      secondaryCta: {
        ...existing.hero.secondaryCta,
        ...heroPatch?.secondaryCta,
      },
    },
    heroFeatureCards: patch.heroFeatureCards ?? existing.heroFeatureCards,
    pageHeroImages: {
      ...(existing.pageHeroImages ?? {}),
      ...(patch.pageHeroImages ?? {}),
    },
    companyOverview: {
      ...existing.companyOverview,
      ...patch.companyOverview,
      trustPoints: patch.companyOverview?.trustPoints ?? existing.companyOverview.trustPoints,
    },
    about: {
      ...existing.about,
      ...patch.about,
      values: patch.about?.values ?? existing.about.values,
    },
    aboutPageIntro: {
      ...existing.aboutPageIntro,
      ...patch.aboutPageIntro,
    },
    chairmanMessage: {
      ...existing.chairmanMessage,
      ...patch.chairmanMessage,
    },
    certificateSection: {
      ...existing.certificateSection,
      ...patch.certificateSection,
    },
    ctaBanner: mergeCtaBanner(existing.ctaBanner, patch.ctaBanner),
    homepageSections: {
      certificates: {
        ...existing.homepageSections.certificates,
        ...patch.homepageSections?.certificates,
      },
      divisions: {
        ...existing.homepageSections.divisions,
        ...patch.homepageSections?.divisions,
      },
      valuePillars: {
        ...existing.homepageSections.valuePillars,
        ...patch.homepageSections?.valuePillars,
      },
      featuredProjects: {
        ...existing.homepageSections.featuredProjects,
        ...patch.homepageSections?.featuredProjects,
      },
      sectors: {
        ...existing.homepageSections.sectors,
        ...patch.homepageSections?.sectors,
      },
      testimonials: {
        ...existing.homepageSections.testimonials,
        ...patch.homepageSections?.testimonials,
      },
      insights: {
        ...existing.homepageSections.insights,
        ...patch.homepageSections?.insights,
      },
    },
    siteConfig: {
      ...existing.siteConfig,
      ...patch.siteConfig,
      social: {
        ...existing.siteConfig.social,
        ...patch.siteConfig?.social,
      },
    },
  };
}

export function mapSiteContentDocument(doc: SiteContentDocument): SiteContentData {
  const defaults = getDefaultSiteContent();

  return {
    key: "global",
    hero: doc.hero,
    heroFeatureCards:
      doc.heroFeatureCards?.length > 0
        ? doc.heroFeatureCards.map((card) => ({ ...card }))
        : defaults.heroFeatureCards,
    pageHeroImages: doc.pageHeroImages,
    companyOverview: {
      title: doc.companyOverview?.title ?? defaults.companyOverview.title,
      description: doc.companyOverview?.description ?? defaults.companyOverview.description,
      trustPoints:
        doc.companyOverview?.trustPoints?.length > 0
          ? doc.companyOverview.trustPoints
          : defaults.companyOverview.trustPoints,
    },
    about: {
      mission: doc.about.mission,
      vision: doc.about.vision,
      values: doc.about.values ?? [],
      history: doc.about.history,
    },
    aboutPageIntro: {
      ...defaults.aboutPageIntro,
      ...doc.aboutPageIntro,
    },
    chairmanMessage: doc.chairmanMessage,
    certificateSection: doc.certificateSection,
    ctaBanner: mergeCtaBanner(defaults.ctaBanner, doc.ctaBanner),
    homepageSections: {
      certificates: {
        eyebrow:
          doc.homepageSections?.certificates?.eyebrow ??
          defaults.homepageSections.certificates.eyebrow,
      },
      divisions: {
        ...defaults.homepageSections.divisions,
        ...doc.homepageSections?.divisions,
      },
      valuePillars: {
        ...defaults.homepageSections.valuePillars,
        ...doc.homepageSections?.valuePillars,
      },
      featuredProjects: {
        ...defaults.homepageSections.featuredProjects,
        ...doc.homepageSections?.featuredProjects,
      },
      sectors: {
        ...defaults.homepageSections.sectors,
        ...doc.homepageSections?.sectors,
      },
      testimonials: {
        ...defaults.homepageSections.testimonials,
        ...doc.homepageSections?.testimonials,
      },
      insights: {
        ...defaults.homepageSections.insights,
        ...doc.homepageSections?.insights,
      },
    },
    siteConfig: {
      ...doc.siteConfig,
      logo: doc.siteConfig.logo || defaults.siteConfig.logo,
      siteLogo: doc.siteConfig.siteLogo || defaults.siteConfig.siteLogo,
      social: { ...doc.siteConfig.social },
    },
  };
}
