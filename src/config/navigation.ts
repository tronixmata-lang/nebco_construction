import type { NavItem } from "@/types";

/** Shared labels for breadcrumbs — keep in sync with footer and nav. */
export const breadcrumbLabels: Record<string, string> = {
  about: "About Us",
  contact: "Contact Us",
  divisions: "Our Verticals",
  sectors: "Industry Sectors",
  portfolio: "Project Portfolio",
  insights: "Insights & News",
  nrn: "NRN Services",
  book: "Book Appointment",
  leadership: "Leadership",
  construction: "Your Construction Company",
  investment: "Your Company Investment",
  consulting: "Your Company Consulting",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  legal: "Legal",
};

/** All primary site routes for sitemap and page index. */
export const sitePageIndex = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Verticals", href: "/divisions" },
  { label: "Your Construction Company", href: "/divisions/construction" },
  { label: "Your Company Investment", href: "/divisions/investment" },
  { label: "Your Company Consulting", href: "/divisions/consulting" },
  { label: "Project Portfolio", href: "/portfolio" },
  { label: "Industry Sectors", href: "/sectors" },
  { label: "Leadership", href: "/leadership" },
  { label: "Insights & News", href: "/insights" },
  { label: "NRN Services", href: "/nrn" },
  { label: "Book Appointment", href: "/nrn/book" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
] as const;

/** Compact links shown in the red ribbon above the main navbar. */
export const topRibbonLinks = [
  { label: "Your Construction Company", href: "/divisions/construction" },
  { label: "Your Company Investment", href: "/divisions/investment" },
  { label: "Your Company Consulting", href: "/divisions/consulting" },
] as const;

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Our Verticals",
    href: "/divisions",
    children: [
      { label: "Your Construction Company", href: "/divisions/construction" },
      { label: "Your Company Investment", href: "/divisions/investment" },
      { label: "Your Company Consulting", href: "/divisions/consulting" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Sectors", href: "/sectors" },
  { label: "Leadership", href: "/leadership" },
  { label: "Insights", href: "/insights" },
  { label: "NRN", href: "/nrn" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Verticals", href: "/divisions" },
    { label: "Leadership", href: "/leadership" },
    { label: "Industry Sectors", href: "/sectors" },
    { label: "Contact Us", href: "/contact" },
  ],
  divisions: [
    { label: "Your Construction Company", href: "/divisions/construction" },
    { label: "Your Company Investment", href: "/divisions/investment" },
    { label: "Your Company Consulting", href: "/divisions/consulting" },
  ],
  resources: [
    { label: "Project Portfolio", href: "/portfolio" },
    { label: "Insights & News", href: "/insights" },
    { label: "NRN Services", href: "/nrn" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Use", href: "/legal/terms" },
  ],
} as const;
