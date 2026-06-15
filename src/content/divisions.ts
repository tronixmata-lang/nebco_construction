import type { Division } from "@/types";

export const divisions: Division[] = [
  {
    id: "construction",
    slug: "construction",
    name: "NEBCO Construction",
    shortName: "Construction",
    tagline: "Your Home, Now A Reality",
    description:
      "NEBCO Homes delivers residential and commercial construction including apartments, housing infrastructure, and civil engineering projects. We are your dream architects, building where craftsmanship meets vision.",
    services: [
      "Residential Construction",
      "Commercial Construction",
      "Apartment Construction",
      "Housing Infrastructure",
      "Interior Design Build",
      "Civil Engineering",
    ],
    href: "/divisions/construction",
  },
  {
    id: "investment",
    slug: "investment",
    name: "NEBCO Infra",
    shortName: "Infra",
    tagline: "Building the Foundations of Progress",
    description:
      "NEBCO Infra specializes in large-scale infrastructure development including roads, bridges, tunnels, commercial complexes, and real estate development across Nepal.",
    services: [
      "Infrastructure Development",
      "Road & Bridge Construction",
      "Commercial Complexes",
      "Real Estate Development",
      "Property Development & Sales",
      "Public-Private Partnerships",
    ],
    href: "/divisions/investment",
  },
  {
    id: "consulting",
    slug: "consulting",
    name: "NEBCO Consulting",
    shortName: "Consulting",
    tagline: "Expert Guidance, Informed Decisions",
    description:
      "Professional design and advisory services including architectural design, structural engineering, FDI planning, feasibility studies, and construction project management.",
    services: [
      "Architectural Design",
      "Structural Design",
      "Interior Design",
      "HVAC & Electrical Design",
      "Urban Planning and Design",
      "FDI Plans & Feasibility Studies",
      "Business & Financial Consultation",
      "Construction Project Management",
    ],
    href: "/divisions/consulting",
  },
];

export function getDivisionBySlug(slug: string): Division | undefined {
  return divisions.find((division) => division.slug === slug);
}
