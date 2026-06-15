export const siteConfig = {
  name: "NEBCO Construction",
  legalName: "National Estate Builders Co. Pvt. Ltd.",
  shortName: "NEBCO",
  tagline: "Quality. Integrity. Timely.",
  seoTitle: "NEBCO || Best and No 1 Construction Company in Nepal",
  description:
    "Established in 1995, NEBCO is an A-Class construction company in Nepal specializing in residential, commercial, and infrastructure projects across Kathmandu and beyond.",
  url: "https://nebco.com.np",
  locale: "en_US",
  foundingDate: "1995",
  parentOrganization: "Shah Group",
  email: "nebconepal@gmail.com",
  phone: "+977-9803850955",
  address: "Kuleshwor, Kathmandu, Nepal",
  businessHours: "Sunday to Friday: 9:00 AM to 7:00 PM / Saturday: Closed",
  logo: "/images/nebco_logo.png",
  siteLogo: "/images/site/NEBCO-Logo.png",
  ogImage: "/opengraph-image",
  geo: {
    latitude: 27.703,
    longitude: 85.3,
  },
  areaServed: ["Kathmandu", "Nepal", "South Asia"],
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
    website: "https://nebco.com.np",
    facebook: "https://www.facebook.com/p/National-Estate-Builders-Company-Pvt-Ltd-100064839677112/",
    linkedin: "",
  },
} as const;

export function getSocialLinks(): string[] {
  const candidates: string[] = [
    siteConfig.url,
    siteConfig.social.website,
    siteConfig.social.facebook,
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
