import type { IndustrySector, SectorProfile } from "@/types";

export const industrySectors: IndustrySector[] = [
  {
    id: "residential",
    title: "Residential Construction",
    description:
      "Custom homes, apartments, and housing infrastructure built with earthquake-resistant design and modern architectural standards. From private residences in Kathmandu to projects beyond the valley, NEBCO delivers homes clients trust for generations.",
    highlight: "100+ residential projects delivered",
    image: "/images/home.jpg",
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    description:
      "Hotels, office complexes, retail spaces, and commercial buildings delivered across Kathmandu, Birgunj, Nepalgunj, and beyond. Our portfolio includes Hotel Yatri, Hotel Buddy Thamel, and Khanal Complex, trusted by businesses nationwide.",
    highlight: "Hotels and complexes across Nepal",
    image: "/images/josepmonter-cranes-7347888.jpg",
  },
  {
    id: "infrastructure",
    title: "Infrastructure Development",
    description:
      "Roads, bridges, tunnels, hospitals, and large-scale public works including international projects. NEBCO's hospital construction team in Bhutan demonstrates our capability to deliver critical infrastructure beyond borders.",
    highlight: "International infrastructure experience",
    image: "/images/pexels-enrique-11376668.jpg",
  },
  {
    id: "design",
    title: "Architectural and Design Services",
    description:
      "In-house architectural, structural, interior, HVAC, and electrical design for complete project solutions. Integrated design and build under one roof means fewer delays, clearer accountability, and consistent quality.",
    highlight: "End-to-end in-house design team",
    image: "/images/site/IMG_6211.jpg",
  },
  {
    id: "real-estate",
    title: "Real Estate Development",
    description:
      "Property development, sales, and investment solutions for residential and commercial assets in Nepal. Backed by the Shah Group's decades of real estate expertise, NEBCO creates lasting value for investors and homeowners alike.",
    highlight: "Backed by Shah Group expertise",
    image: "/images/site/1-3-scaled.jpg",
  },
  {
    id: "consulting",
    title: "Project Consulting and Management",
    description:
      "FDI planning, feasibility studies, cost estimation, business consultation, and end-to-end project supervision. Clients rely on NEBCO for transparent guidance from concept through completion.",
    highlight: "Transparent, on-budget delivery",
    image: "/images/site/binod-ojha-1.jpg",
  },
];

export const sectorProfiles: Record<string, Omit<SectorProfile, keyof IndustrySector>> = {
  residential: {
    message: {
      quote:
        "A home is where families build their future. We treat every residential project with the structural discipline, transparent communication, and finish quality that families deserve.",
      body: [
        "NEBCO's residential portfolio spans custom private homes, multi-unit housing, and bespoke residences across Kathmandu and beyond. Every build is engineered for Nepal's seismic environment and finished to standards clients can verify at handover.",
        "From foundation to final inspection, our teams coordinate design, materials, and site execution under one accountable builder. Clients receive milestone updates, clear budgets, and a finished home worthy of generational trust.",
      ],
    },
    capabilities: [
      {
        title: "Custom Home Construction",
        description: "Tailored residences designed around client lifestyle, site conditions, and long-term durability.",
      },
      {
        title: "Earthquake-Resistant Engineering",
        description: "Structural systems and detailing aligned with Nepal's seismic requirements from design through build.",
      },
      {
        title: "Premium Finishing",
        description: "Interior and exterior finishes managed with quality checkpoints at every project phase.",
      },
      {
        title: "NRN Project Management",
        description: "Structured reporting and site supervision for clients building in Nepal from overseas.",
      },
    ],
  },
  commercial: {
    message: {
      quote:
        "Commercial buildings must perform for businesses every day. We deliver hotels, offices, and retail spaces that combine architectural presence with operational reliability.",
      body: [
        "NEBCO has delivered commercial landmarks including Hotel Yatri, Hotel Buddy Thamel, and Khanal Complex. Our commercial teams understand that schedule certainty, MEP coordination, and brand-ready finishes directly affect our clients' revenue.",
        "Whether the scope is hospitality, retail, or corporate office space, we manage complex trades under unified leadership so businesses can open on time and operate with confidence.",
      ],
    },
    capabilities: [
      {
        title: "Hospitality and Hotels",
        description: "Guest-ready hotels and lodges built with operational layouts and premium public-facing finishes.",
      },
      {
        title: "Office and Retail Complexes",
        description: "Multi-use commercial structures designed for efficiency, compliance, and tenant satisfaction.",
      },
      {
        title: "MEP Coordination",
        description: "Integrated mechanical, electrical, and plumbing planning to avoid costly site conflicts.",
      },
      {
        title: "Nationwide Delivery",
        description: "Commercial projects executed across Kathmandu, Birgunj, Nepalgunj, and other key markets.",
      },
    ],
  },
  infrastructure: {
    message: {
      quote:
        "Infrastructure shapes communities for decades. NEBCO brings the engineering rigor and project scale experience required for public works that must not fail.",
      body: [
        "Our infrastructure experience includes roads, bridges, tunnels, hospitals, and specialized facilities, including international delivery in Bhutan. These projects demand disciplined planning, regulatory compliance, and safety leadership at every stage.",
        "NEBCO's A-Class credentials and Shah Group backing provide the institutional stability that public and institutional clients require when stakes are high and timelines are fixed.",
      ],
    },
    capabilities: [
      {
        title: "Healthcare Facilities",
        description: "Hospital and clinic construction with critical systems coordination and compliance focus.",
      },
      {
        title: "Transportation Works",
        description: "Roads, bridges, and connectivity projects built for long-term public use.",
      },
      {
        title: "International Projects",
        description: "Cross-border delivery experience with structured reporting and quality assurance.",
      },
      {
        title: "Heavy Civil Supervision",
        description: "Site leadership, safety protocols, and milestone governance for large-scale builds.",
      },
    ],
  },
  design: {
    message: {
      quote:
        "Design and construction should speak the same language. Our in-house architects and engineers collaborate from day one so what is drawn can be built beautifully and safely.",
      body: [
        "NEBCO provides architectural, structural, interior, HVAC, and electrical design as an integrated service. That eliminates the handoff friction that causes delays, change orders, and compromised outcomes on conventional projects.",
        "Clients benefit from a single team accountable for both design intent and site execution, with constructability reviewed before documents reach the field.",
      ],
    },
    capabilities: [
      {
        title: "Architectural Design",
        description: "Spatial planning and aesthetic development aligned with client vision and site context.",
      },
      {
        title: "Structural Engineering",
        description: "Code-compliant structural systems optimized for Nepal's terrain and seismic profile.",
      },
      {
        title: "Interior and MEP Design",
        description: "Coordinated interior, HVAC, and electrical planning for complete building performance.",
      },
      {
        title: "Design-Build Integration",
        description: "Unified workflow from concept through construction under NEBCO leadership.",
      },
    ],
  },
  "real-estate": {
    message: {
      quote:
        "Real estate is a long-term investment. Under the Shah Group, NEBCO develops and advises on assets designed to hold value and serve communities responsibly.",
      body: [
        "Our real estate services span development, sales support, and investment guidance for residential and commercial assets across Nepal. We combine construction capability with market knowledge earned over decades.",
        "Investors and homeowners work with a partner that understands both the development lifecycle and the construction discipline required to protect capital.",
      ],
    },
    capabilities: [
      {
        title: "Property Development",
        description: "Residential and commercial developments managed from feasibility through delivery.",
      },
      {
        title: "Investment Advisory",
        description: "Guidance on asset strategy, project viability, and development timelines.",
      },
      {
        title: "Sales and Marketing Support",
        description: "Construction quality and documentation that supports confident sales processes.",
      },
      {
        title: "Shah Group Network",
        description: "Institutional backing and real estate expertise across the group's portfolio.",
      },
    ],
  },
  consulting: {
    message: {
      quote:
        "The right guidance early prevents expensive corrections later. Our consulting team helps clients plan, budget, and supervise projects with clarity from the start.",
      body: [
        "NEBCO Consulting supports FDI planning, feasibility studies, cost estimation, business consultation, and end-to-end project supervision. Clients engage us when they need independent expertise backed by active construction experience.",
        "We deliver transparent recommendations, documented milestones, and accountable oversight so projects stay aligned with budget, schedule, and quality objectives.",
      ],
    },
    capabilities: [
      {
        title: "Feasibility and Planning",
        description: "Early-stage studies that validate scope, budget, and delivery strategy.",
      },
      {
        title: "Cost Estimation",
        description: "Detailed estimates grounded in current market and site realities in Nepal.",
      },
      {
        title: "FDI and Business Consultation",
        description: "Guidance for investors navigating Nepal's construction and development landscape.",
      },
      {
        title: "Project Supervision",
        description: "Independent oversight of schedule, quality, and contractor performance.",
      },
    ],
  },
};

export function getSectorProfileById(id: string): SectorProfile | undefined {
  const sector = industrySectors.find((item) => item.id === id);
  const profile = sectorProfiles[id];
  if (!sector || !profile) return undefined;
  return { ...sector, ...profile };
}

export function getAllSectorIds(): string[] {
  return industrySectors.map((sector) => sector.id);
}
