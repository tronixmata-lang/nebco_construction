import type { DivisionProfile } from "@/types";
import { divisions } from "@/content/divisions";

const construction = divisions.find((d) => d.id === "construction")!;
const investment = divisions.find((d) => d.id === "investment")!;
const consulting = divisions.find((d) => d.id === "consulting")!;

export const divisionProfiles: Record<string, DivisionProfile> = {
  construction: {
    ...construction,
    highlight:
      "A-Class licensed construction for homes, commercial buildings, apartments, renovations, industrial structures, and civil works, with engineers on every site.",
    overview:
      "Nepal's most trusted construction partner, built on decades of delivery. From 1–5 storey private homes to commercial buildings, apartment complexes, renovations, industrial structures, and civil works, NEBCO manages design, BOQ, construction, and handover with licensed supervision and a structural warranty.",
    heroImage: "/images/site/1-7_11zon-scaled.jpg",
    capabilities: [
      {
        title: "Residential homes",
        description: "1–5 storey private homes, custom designs.",
      },
      {
        title: "Commercial buildings",
        description: "Offices, showrooms, multi-use buildings.",
      },
      {
        title: "Apartment complexes",
        description: "Multi-unit investment properties.",
      },
      {
        title: "Renovation & extension",
        description: "Adding floors, interior redesign, structural upgrades.",
      },
      {
        title: "Industrial structures",
        description: "Warehouses, factories, workshops.",
      },
      {
        title: "Road & civil work",
        description: "Site development, retaining walls, drainage.",
      },
    ],
    process: [
      {
        title: "Consultation",
        description:
          "We listen to the brief, site, budget, and timeline before any drawings leave the office.",
      },
      {
        title: "Design & BOQ",
        description:
          "Architectural coordination and a quantified bill of quantities so costs are visible before you sign.",
      },
      {
        title: "Contract & Timeline",
        description: "Scope, milestones, and a delivery calendar you can hold us to.",
      },
      {
        title: "Construction",
        description:
          "Licensed engineers on site, phase inspections, and reporting until the structure is complete.",
      },
      {
        title: "Handover & Warranty",
        description:
          "Final walkthrough, documentation, and a structural warranty so occupancy is not a leap of faith.",
      },
    ],
    commitments: [
      "Licensed engineers on every site",
      "In-house architectural design team",
      "Quality materials sourced and verified",
      "Structural warranty included",
      "Client portal for tracking",
      "Independent phase inspections",
    ],
  },
  investment: {
    ...investment,
    highlight:
      "Apartments, plots, joint ventures, off-plan, land banking, and rental-ready packages — with NEBCO construction and NRN-ready paperwork behind every rupee.",
    overview:
      "Your money works harder in Nepal when rental yield, appreciation, and legal compliance sit in one structure. NEBCO Investment offers residential apartments, commercial plots, joint ventures, off-plan property, land banking, and rental-ready packages, with due diligence, construction or acquisition, and portal reporting through handover and rent.",
    heroImage: "/images/site/hotel-buddy-thamel-5.png",
    capabilities: [
      {
        title: "Residential apartments",
        description: "Pre-built or off-plan units in high-demand areas — buy, rent, earn.",
      },
      {
        title: "Commercial plots",
        description: "Vetted land in Pokhara, Butwal, and Kathmandu for development.",
      },
      {
        title: "Joint ventures",
        description: "Co-invest with NEBCO on larger projects and share returns.",
      },
      {
        title: "Off-plan properties",
        description: "Buy at foundation price, then sell or rent at completion.",
      },
      {
        title: "Land banking",
        description: "Buy verified land now, develop or sell later as value grows.",
      },
      {
        title: "Rental-ready packages",
        description: "Build, furnish, and find a tenant — fully passive income.",
      },
    ],
    process: [
      {
        title: "Choose product",
        description: "Apartments, plots, joint ventures, off-plan, land, or a rental-ready package.",
      },
      {
        title: "Legal due diligence",
        description: "Title, encumbrances, NRN rules, and approvals before any money moves.",
      },
      {
        title: "Sign agreement",
        description: "Scope, price, timeline, and repatriation path in writing.",
      },
      {
        title: "Construction / acquisition",
        description: "NEBCO builds or completes the purchase with milestone reporting.",
      },
      {
        title: "Rental management",
        description: "If you want income, we furnish, let, and report through the portal.",
      },
      {
        title: "Returns",
        description: "Rent, appreciation, or exit — documented, not promised in a slide.",
      },
    ],
    commitments: [
      "NRN Investment Act and NRB process mapped before funds move",
      "Repatriation planned into the structure, not added later",
      "Power of Attorney support if you cannot be in Nepal to sign",
      "Title and tax obligations explained in writing",
      "Client portal for status, financials, and documents",
    ],
  },
  consulting: {
    ...consulting,
    highlight:
      "The right advice before the first brick: feasibility, design, permits, project management, and investment advisory, including video calls for NRNs.",
    overview:
      "NEBCO Consulting is for people who need a clear next step before they pour, buy, or fire a contractor. We run site feasibility, drawings, municipality permits, third-party supervision, and investment due diligence, with a path into NEBCO Construction when you are ready to build.",
    heroImage: "/images/pexels-mike-van-schoonderwalt-1884800-5505119.jpg",
    capabilities: [
      {
        title: "Planning & Feasibility",
        description:
          "Site feasibility study: is the land buildable?\nSoil testing coordination\nBOQ (Bill of Quantities) preparation\nConstruction cost estimation\nProject timeline planning",
      },
      {
        title: "Architectural & Design",
        description:
          "Architectural drawings and floor plans\n3D rendering and visualization\nInterior design consultation\nStructural design review",
      },
      {
        title: "Legal & Permits",
        description:
          "Municipality building permit guidance\nLand registration support\nNRN legal advisory (Investment Act, PoA)\nIRD and tax consultation referral",
      },
      {
        title: "Project Management Consulting",
        description:
          "Third-party site supervision\nContractor vetting and shortlisting\nQuality audit of ongoing builds\nDispute resolution with contractors",
      },
      {
        title: "Investment Advisory",
        description:
          "Portfolio strategy for Nepal real estate\nMarket research reports\nDue diligence on land and property purchase\nRental yield analysis",
      },
    ],
    process: [
      {
        title: "Initial call (free)",
        description: "A 30-minute conversation to hear the site, the problem, and whether we can help.",
      },
      {
        title: "Scope definition",
        description: "We write what is in, what is out, and what you will hold in your hand at the end.",
      },
      {
        title: "Consulting engagement",
        description: "Site work, drawings, permits, or contractor review, as scoped.",
      },
      {
        title: "Report / deliverable",
        description: "A feasibility pack, drawings, audit, or written advice.",
      },
      {
        title: "Follow-up support",
        description: "Questions after the report, and a handoff to construction if you proceed.",
      },
    ],
    commitments: [
      "In-house engineers with real construction experience",
      "Municipality process known from actual files, not theory",
      "Consulting that can continue into NEBCO Construction",
      "NRN-friendly remote consulting by video call",
    ],
  },
};

export function getStaticDivisionProfile(slug: string): DivisionProfile | undefined {
  return divisionProfiles[slug];
}
