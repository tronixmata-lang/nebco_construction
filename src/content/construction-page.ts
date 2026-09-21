export const constructionPage = {
  hero: {
    eyebrow: "Your Construction Company",
    title: "Nepal's most trusted construction partner — built on a decade of delivery.",
    description:
      "200+ projects · 35+ years · Kathmandu, Pokhara, Nepalgunj & beyond",
    primaryCta: { label: "Start your project", href: "#book-consultation" },
    secondaryCta: { label: "View our work", href: "#portfolio" },
  },
  stats: [
    { value: "200+", label: "Projects delivered" },
    { value: "35+", label: "Years in business" },
    { value: "4+", label: "Cities served" },
  ],
  flagship: {
    eyebrow: "Flagship Build",
    title: "From foundation to finished home",
    description:
      "A private residence in Kathmandu, shown from site works through handover. This is the standard we hold on every Your Company site: visible progress, licensed supervision, and a home the client can occupy with confidence.",
    beforeImage: "/images/site/1-81_11zon.jpg",
    afterImage: "/images/site/DSC01007-scaled.jpg",
    beforeLabel: "During construction",
    afterLabel: "After handover",
    location: "Sukedhara, Kathmandu",
  },
  services: [
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
      description: "We listen to the brief, site, budget, and timeline before any drawings leave the office.",
    },
    {
      title: "Design & BOQ",
      description: "Architectural coordination and a quantified bill of quantities so costs are visible before you sign.",
    },
    {
      title: "Contract & Timeline",
      description: "Scope, milestones, and a delivery calendar you can hold us to.",
    },
    {
      title: "Construction",
      description: "Licensed engineers on site, phase inspections, and reporting until the structure is complete.",
    },
    {
      title: "Handover & Warranty",
      description: "Final walkthrough, documentation, and a structural warranty so occupancy is not a leap of faith.",
    },
  ],
  reasons: [
    {
      title: "Licensed engineers on every site",
      description: "A-Class supervision is not a slogan. Engineers are present at the work, not only at the office.",
    },
    {
      title: "In-house architectural design team",
      description: "Design and build sit in one group, so drawings are constructible before the first pour.",
    },
    {
      title: "Quality materials sourced and verified",
      description: "Specified products, supplier records, and certificates you can ask to see.",
    },
    {
      title: "Structural warranty included",
      description: "Handover includes structural warranty coverage as part of the Your Company delivery standard.",
    },
    {
      title: "Client portal for tracking",
      description: "Follow progress from anywhere through the NRN client portal: photos, milestones, and documents.",
      href: "/nrn",
      hrefLabel: "Open the NRN portal",
    },
    {
      title: "Independent phase inspections",
      description: "Foundation, structure, MEP, and finishing are inspected before the next stage is released.",
    },
  ],
  standards: [
    {
      title: "Earthquake-resistant design",
      description: "NBC-compliant structural systems planned for Nepal's seismic context, not copied from elsewhere.",
    },
    {
      title: "AutoCAD + 3D rendering",
      description: "You see the building before construction begins, with coordinated drawings the site can actually follow.",
    },
    {
      title: "Material quality certificates",
      description: "Cement, steel, and specified finishes come with verification, not verbal assurance.",
    },
  ],
  bottomCta: {
    title: "Ready to build with Your Company?",
    description: "Speak with an engineer about scope, drawings, and a site visit.",
    primaryLabel: "Start your project",
    engineerLabel: "Talk to an engineer",
  },
} as const;
