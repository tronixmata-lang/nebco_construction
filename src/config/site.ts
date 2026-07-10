export const siteConfig = {
  name: "NEBCO Construction",
  legalName: "National Estate Builders Co. Pvt. Ltd.",
  shortName: "NEBCO",
  tagline: "Quality. Integrity. Timely.",
  seoTitle: "NEBCO | Best and No 1 Construction Company in Nepal",
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
    latitude: 27.686732,
    longitude: 85.299335,
  },
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2091.6367497500523!2d85.29933496371326!3d27.686732295252533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1996b5fc27a7%3A0xf16f8d7e7c578dab!2sNEBCO-%20Best%20Construction%20Company%20In%20Nepal!5e0!3m2!1sen!2snp!4v1783666307998!5m2!1sen!2snp",
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

export const NEBCO_FACEBOOK_URL = siteConfig.social.facebook;

export function getSocialLinks(): string[] {
  const facebook = siteConfig.social.facebook || NEBCO_FACEBOOK_URL;
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
