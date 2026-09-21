export const siteConfig = {
  name: "Your Construction Company",
  legalName: "Your Company Pvt. Ltd.",
  shortName: "Your Company",
  tagline: "Quality. Integrity. Timely.",
  seoTitle: "Your Company | Construction Company",
  description:
    "A trusted construction company specializing in residential, commercial, and infrastructure projects. Replace this text with your company story in Admin → Settings.",
  url: "https://yourcompany.com",
  locale: "en_US",
  foundingDate: "1995",
  parentOrganization: "Your Group",
  email: "hello@yourcompany.com",
  phone: "+000-0000000",
  address: "Your City, Your Country",
  businessHours: "Sunday to Friday: 9:00 AM to 5:00 PM / Saturday: Closed",
  /** Leave empty to show a "Your logo" placeholder until the client uploads one. */
  logo: "",
  siteLogo: "",
  ogImage: "/opengraph-image",
  geo: {
    latitude: 0,
    longitude: 0,
  },
  googleMapsEmbedUrl: "",
  areaServed: ["Your City", "Your Country"],
  knowsAbout: [
    "Construction",
    "Residential Construction",
    "Commercial Construction",
    "Infrastructure Development",
    "Real Estate Investment",
    "Architectural Design",
    "Project Management",
    "Earthquake-Resistant Building",
  ],
  social: {
    website: "https://yourcompany.com",
    facebook: "",
    linkedin: "",
  },
} as const;

/** Optional Facebook page URL used when CMS social.facebook is empty. */
export const COMPANY_FACEBOOK_URL = siteConfig.social.facebook;

export function getSocialLinks(): string[] {
  const facebook = siteConfig.social.facebook || COMPANY_FACEBOOK_URL;
  const candidates: string[] = [
    siteConfig.url,
    siteConfig.social.website,
    facebook,
    siteConfig.social.linkedin,
  ];

  return [...new Set(candidates.filter((url) => url.length > 0))];
}

export const brandColors = {
  primary: "#A51E22",
  secondary: "#222222",
  accent: "#C9A227",
  neutral: "#FFFFFF",
  neutralMuted: "#F5F5F5",
} as const;
