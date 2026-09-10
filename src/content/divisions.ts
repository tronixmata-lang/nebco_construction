import type { Division } from "@/types";

export const divisions: Division[] = [
  {
    id: "construction",
    slug: "construction",
    name: "NEBCO Construction",
    shortName: "Construction",
    tagline: "Nepal's most trusted construction partner — built on a decade of delivery.",
    description:
      "Residential homes, commercial buildings, apartment complexes, renovation, industrial structures, and civil works, delivered with licensed engineers and A-Class site discipline.",
    services: [
      "Residential homes",
      "Commercial buildings",
      "Apartment complexes",
      "Renovation & extension",
      "Industrial structures",
      "Road & civil work",
    ],
    href: "/divisions/construction",
  },
  {
    id: "investment",
    slug: "investment",
    name: "NEBCO Investment",
    shortName: "Investment",
    tagline: "Your money works harder in Nepal — with NEBCO backing every rupee.",
    description:
      "Residential apartments, commercial plots, joint ventures, off-plan property, land banking, and rental-ready packages — structured for yield, appreciation, and legal compliance.",
    services: [
      "Residential apartments",
      "Commercial plots",
      "Joint ventures",
      "Off-plan properties",
      "Land banking",
      "Rental-ready packages",
    ],
    href: "/divisions/investment",
  },
  {
    id: "consulting",
    slug: "consulting",
    name: "NEBCO Consulting",
    shortName: "Consulting",
    tagline: "The right advice before the first brick — save time, money, and stress.",
    description:
      "Planning and feasibility, architectural design, legal and permits, project management consulting, and investment advisory — including remote consulting for NRNs.",
    services: [
      "Planning & Feasibility",
      "Architectural & Design",
      "Legal & Permits",
      "Project Management Consulting",
      "Investment Advisory",
    ],
    href: "/divisions/consulting",
  },
];

export function getDivisionBySlug(slug: string): Division | undefined {
  return divisions.find((division) => division.slug === slug);
}
