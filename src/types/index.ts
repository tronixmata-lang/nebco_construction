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
};

export type ProjectCategory =
  | "commercial"
  | "residential"
  | "infrastructure"
  | "industrial";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  description: string;
  image: string;
};

export type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
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
