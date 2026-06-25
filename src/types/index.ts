export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type Division = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  services: string[];
  href: string;
};

export type DivisionCapability = {
  title: string;
  description: string;
};

export type DivisionProcessStep = {
  title: string;
  description: string;
};

export type DivisionProfile = Division & {
  highlight: string;
  overview: string;
  heroImage?: string;
  capabilities: DivisionCapability[];
  process: DivisionProcessStep[];
  commitments: string[];
};

export type ValuePillar = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type IndustrySector = {
  id: string;
  title: string;
  description: string;
  highlight: string;
  image?: string;
};

export type SectorCapability = {
  title: string;
  description: string;
};

export type SectorProfile = IndustrySector & {
  message: {
    quote: string;
    body?: string[];
  };
  capabilities: SectorCapability[];
};

export type ProjectCategory =
  | "commercial"
  | "residential"
  | "infrastructure"
  | "industrial";

export type ProjectShowcaseLayout = "auto" | "hero" | "wide" | "standard";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  description: string;
  image: string;
  images?: string[];
  featured?: boolean;
  sortOrder?: number;
  showcaseLayout?: ProjectShowcaseLayout;
  viewCount?: number;
};

export type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  facebook?: string;
  email?: string;
};

export type LeaderArticle = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  date: string;
  readTime: string;
  image?: string;
};

export type LeaderProfile = Leader & {
  message: {
    quote: string;
    body?: string[];
  };
  articles: LeaderArticle[];
};

export type InsightArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  date: string;
  readTime: string;
  image?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  organization: string;
  role: string;
};

export type Stat = {
  id: string;
  value: string;
  label: string;
};

export type Certificate = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

export type SeoFields = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  focusKeyword?: string;
  noIndex?: boolean;
  canonical?: string;
};
