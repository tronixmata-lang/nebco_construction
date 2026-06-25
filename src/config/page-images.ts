export const PAGE_HERO_IMAGE_KEYS = [
  "about",
  "portfolio",
  "divisions",
  "sectors",
  "insights",
  "leadership",
  "contact",
  "legal",
] as const;

export type PageHeroImageKey = (typeof PAGE_HERO_IMAGE_KEYS)[number];

export type PageHeroImages = Record<PageHeroImageKey, string>;

export const HOMEPAGE_HERO_IMAGE_DEFAULT = "/images/home.jpg";

export const defaultPageHeroImages: PageHeroImages = {
  about: "/images/site/1-7_11zon-scaled.jpg",
  portfolio: "/images/josepmonter-cranes-7347888.jpg",
  divisions: "/images/home2.jpg",
  sectors: "/images/pexels-enrique-11376668.jpg",
  insights: "/images/dokyung-kim-bLx7ypUxxIc-unsplash.jpg",
  leadership: "/images/site/binod-ojha-1.jpg",
  contact: "/images/home3.jpg",
  legal: "/images/home.jpg",
};

/** @deprecated Use defaultPageHeroImages or getSiteContent().pageHeroImages */
export const pageHeroImages = defaultPageHeroImages;

export const PAGE_HERO_LABELS: Record<PageHeroImageKey, string> = {
  about: "About",
  portfolio: "Portfolio",
  divisions: "Our Verticals",
  sectors: "Sectors",
  insights: "Insights",
  leadership: "Leadership",
  contact: "Contact",
  legal: "Legal (Privacy & Terms)",
};

export function resolvePageHeroImages(
  stored?: Partial<PageHeroImages> | null,
): PageHeroImages {
  const result = { ...defaultPageHeroImages };
  if (!stored) return result;

  for (const key of PAGE_HERO_IMAGE_KEYS) {
    const value = stored[key]?.trim();
    if (value) result[key] = value;
  }

  return result;
}

export function resolveHomepageHeroImage(stored?: string | null) {
  const value = stored?.trim();
  return value || HOMEPAGE_HERO_IMAGE_DEFAULT;
}
