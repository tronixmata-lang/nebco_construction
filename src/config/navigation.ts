import type { NavItem } from "@/types";

/** Shared labels for breadcrumbs — keep in sync with footer and nav. */
export const breadcrumbLabels: Record<string, string> = {
  about: "About Us",
  contact: "Contact Us",
  divisions: "Business Divisions",
  sectors: "Industry Sectors",
  portfolio: "Project Portfolio",
  insights: "Insights & News",
  leadership: "Leadership",
  construction: "NEBCO Construction",
  investment: "NEBCO Investment",
  consulting: "NEBCO Consulting",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  legal: "Legal",
};

/** All primary site routes for sitemap and page index. */
export const sitePageIndex = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Business Divisions", href: "/divisions" },
  { label: "NEBCO Construction", href: "/divisions/construction" },
  { label: "NEBCO Investment", href: "/divisions/investment" },
  { label: "NEBCO Consulting", href: "/divisions/consulting" },
  { label: "Project Portfolio", href: "/portfolio" },
  { label: "Industry Sectors", href: "/sectors" },
  { label: "Leadership", href: "/leadership" },
  { label: "Insights & News", href: "/insights" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
] as const;

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Divisions",
    href: "/divisions",
    children: [
      { label: "NEBCO Construction", href: "/divisions/construction" },
      { label: "NEBCO Investment", href: "/divisions/investment" },
      { label: "NEBCO Consulting", href: "/divisions/consulting" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Sectors", href: "/sectors" },
  { label: "Leadership", href: "/leadership" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Business Divisions", href: "/divisions" },
    { label: "Leadership", href: "/leadership" },
    { label: "Industry Sectors", href: "/sectors" },
    { label: "Contact Us", href: "/contact" },
  ],
  divisions: [
    { label: "NEBCO Construction", href: "/divisions/construction" },
    { label: "NEBCO Investment", href: "/divisions/investment" },
    { label: "NEBCO Consulting", href: "/divisions/consulting" },
  ],
  resources: [
    { label: "Project Portfolio", href: "/portfolio" },
    { label: "Insights & News", href: "/insights" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Use", href: "/legal/terms" },
  ],
} as const;
