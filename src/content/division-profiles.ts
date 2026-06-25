import type { DivisionProfile } from "@/types";
import { divisions } from "@/content/divisions";

const construction = divisions.find((d) => d.id === "construction")!;
const investment = divisions.find((d) => d.id === "investment")!;
const consulting = divisions.find((d) => d.id === "consulting")!;

export const divisionProfiles: Record<string, DivisionProfile> = {
  construction: {
    ...construction,
    highlight:
      "A-Class licensed construction for homes, commercial buildings, and civil works, delivered with disciplined site management and transparent client communication.",
    overview:
      "NEBCO Construction is where vision becomes built reality. From private residences and apartment developments to commercial complexes and civil engineering works, our teams manage every stage with rigorous quality control, safety protocols, and schedule accountability. As part of the Shah Group, we combine decades of institutional trust with hands-on craftsmanship on every site.",
    heroImage: "/images/site/1-7_11zon-scaled.jpg",
    capabilities: [
      {
        title: "Residential Construction",
        description:
          "Custom homes, housing colonies, and multi-family residences built to A-Class standards with durable materials and refined finishing.",
      },
      {
        title: "Commercial Construction",
        description:
          "Hotels, offices, retail, and mixed-use developments engineered for performance, compliance, and long-term operational value.",
      },
      {
        title: "Apartment & Housing Infrastructure",
        description:
          "Structured delivery for apartment blocks and housing infrastructure, from foundations and MEP coordination through final handover.",
      },
      {
        title: "Interior Design Build",
        description:
          "Integrated interior execution aligned with architectural intent, ensuring cohesive spaces that match the quality of the structure.",
      },
      {
        title: "Civil Engineering Works",
        description:
          "Earthworks, structural systems, and site infrastructure executed with technical precision and safety-first supervision.",
      },
      {
        title: "Turnkey Project Delivery",
        description:
          "Single-point accountability from planning and procurement to construction management, reporting, and client handover.",
      },
    ],
    process: [
      {
        title: "Consult & Define Scope",
        description:
          "We align on objectives, budget parameters, timelines, and regulatory requirements before mobilizing design and site teams.",
      },
      {
        title: "Design & Engineer",
        description:
          "Architectural and structural coordination ensures buildability, code compliance, and value-engineered material selections.",
      },
      {
        title: "Build with Discipline",
        description:
          "Dedicated site leadership, quality checkpoints, and safety supervision keep progress visible and standards consistent.",
      },
      {
        title: "Handover & Support",
        description:
          "Final inspections, documentation, and post-handover responsiveness so clients move in with confidence.",
      },
    ],
    commitments: [
      "Transparent milestone reporting at every project stage",
      "A-Class construction standards on every site",
      "Safety-first culture for workers and surrounding communities",
      "On-time delivery backed by accountable project leadership",
      "Quality materials sourced through trusted supply partners",
    ],
  },
  investment: {
    ...investment,
    highlight:
      "Large-scale infrastructure and real estate development that strengthens communities and creates lasting asset value across Nepal.",
    overview:
      "NEBCO Investment focuses on developments that shape how cities grow: roads, bridges, commercial complexes, and strategic real estate. We structure projects for long-term viability, pairing capital discipline with construction execution so investors and communities see durable outcomes.",
    heroImage: "/images/josepmonter-cranes-7347888.jpg",
    capabilities: [
      {
        title: "Infrastructure Development",
        description:
          "Planning and delivery of public and private infrastructure that supports economic growth and regional connectivity.",
      },
      {
        title: "Road & Bridge Construction",
        description:
          "Civil works executed with engineering rigor, environmental awareness, and phased delivery for minimal disruption.",
      },
      {
        title: "Commercial Complexes",
        description:
          "Mixed-use and commercial assets designed for occupancy, leaseability, and sustained operational performance.",
      },
      {
        title: "Real Estate Development",
        description:
          "End-to-end development from land assessment and feasibility through construction and market-ready delivery.",
      },
      {
        title: "Property Development & Sales",
        description:
          "Structured offerings for buyers and investors with clear documentation and NEBCO-backed build quality.",
      },
      {
        title: "Public-Private Partnerships",
        description:
          "Collaborative delivery models that align public objectives with private-sector efficiency and accountability.",
      },
    ],
    process: [
      {
        title: "Feasibility & Vision",
        description: "Market analysis, site studies, and financial modeling establish a clear development thesis.",
      },
      {
        title: "Structure & Partnerships",
        description: "Stakeholder alignment, financing pathways, and regulatory planning before ground breaks.",
      },
      {
        title: "Execute at Scale",
        description: "Coordinated construction and infrastructure delivery with milestone governance.",
      },
      {
        title: "Activate & Transfer",
        description: "Asset readiness, occupancy support, and long-term value realization for partners.",
      },
    ],
    commitments: [
      "Development decisions grounded in feasibility and risk management",
      "Scale delivery without compromising structural integrity",
      "Partnership transparency from proposal through completion",
      "Community-conscious planning on infrastructure corridors",
      "Integration with NEBCO Construction for unified execution",
    ],
  },
  consulting: {
    ...consulting,
    highlight:
      "Architectural, structural, and project advisory services that reduce risk and strengthen decisions before and during construction.",
    overview:
      "NEBCO Consulting gives clients clarity before capital is committed. Our design, engineering, and advisory teams support owners, developers, and institutions with documentation, coordination, and project management that keeps builds efficient, compliant, and aligned with intent.",
    heroImage: "/images/pexels-mike-van-schoonderwalt-1884800-5505119.jpg",
    capabilities: [
      {
        title: "Architectural Design",
        description:
          "Concept through detailed design that balances aesthetics, function, and constructability for Nepal's context.",
      },
      {
        title: "Structural Engineering",
        description:
          "Safe, code-compliant structural systems optimized for seismic resilience and material efficiency.",
      },
      {
        title: "MEP & Interior Design",
        description:
          "Coordinated mechanical, electrical, plumbing, and interior planning for cohesive built environments.",
      },
      {
        title: "Urban Planning & Design",
        description:
          "Master planning and spatial design for developments that serve users and comply with local frameworks.",
      },
      {
        title: "Feasibility & FDI Advisory",
        description:
          "Studies and investment planning that help stakeholders evaluate viability before major commitments.",
      },
      {
        title: "Construction Project Management",
        description:
          "Owner's representation, scheduling, cost control, and site coordination through project closeout.",
      },
    ],
    process: [
      {
        title: "Discover Requirements",
        description: "Stakeholder workshops and site context reviews define scope, constraints, and success metrics.",
      },
      {
        title: "Design & Document",
        description: "Drawings, specifications, and coordination packages prepared for confident tendering.",
      },
      {
        title: "Review & Optimize",
        description: "Value engineering, compliance checks, and constructability feedback before execution.",
      },
      {
        title: "Manage Delivery",
        description: "On-site oversight, reporting, and decision support through construction and handover.",
      },
    ],
    commitments: [
      "Independent, client-focused advisory at every stage",
      "Design documentation aligned with Nepali codes and best practice",
      "Cross-discipline coordination to reduce rework on site",
      "Clear communication for owners, contractors, and authorities",
      "Seamless handoff to NEBCO Construction when builds begin",
    ],
  },
};

export function getStaticDivisionProfile(slug: string): DivisionProfile | undefined {
  return divisionProfiles[slug];
}
