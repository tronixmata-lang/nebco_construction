import type { Project, ProjectCategory } from "@/types";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "industrial", label: "Industrial" },
];

/** Sample portfolio entries for the white-label template. Replace in Admin → Projects. */
export const projects: Project[] = [
  {
    id: "1",
    slug: "sample-family-residence",
    title: "Sample Family Residence",
    category: "residential",
    location: "Your City",
    year: "2024",
    description:
      "A private home delivered with clear milestones, licensed supervision, and finishes agreed before construction starts. Replace this sample with a completed client project.",
    image: "",
  },
  {
    id: "2",
    slug: "sample-garden-villa",
    title: "Sample Garden Villa",
    category: "residential",
    location: "Your City",
    year: "2024",
    description:
      "A multi-storey residence with coordinated design, BOQ, and site reporting. Upload your own photos and rewrite this card for each client.",
    image: "",
  },
  {
    id: "3",
    slug: "sample-hillside-home",
    title: "Sample Hillside Home",
    category: "residential",
    location: "Your Region",
    year: "2023",
    description:
      "Residential construction tailored to site conditions, budget, and timeline. Use this slot for a featured home in your portfolio.",
    image: "",
  },
  {
    id: "4",
    slug: "sample-city-apartment",
    title: "Sample City Apartment",
    category: "residential",
    location: "Your City",
    year: "2023",
    description:
      "A compact urban residence built with the same quality process as larger works. Swap in your apartment or townhouse case study.",
    image: "",
  },
  {
    id: "5",
    slug: "sample-business-hotel",
    title: "Sample Business Hotel",
    category: "commercial",
    location: "Your City",
    year: "2024",
    description:
      "Commercial hospitality build with durable finishes and operational layouts. Replace with your hotel or lodge project.",
    image: "",
  },
  {
    id: "6",
    slug: "sample-retail-complex",
    title: "Sample Retail Complex",
    category: "commercial",
    location: "Your Region",
    year: "2023",
    description:
      "Multi-unit commercial space designed for tenancy flexibility and high footfall. Add your office or retail delivery here.",
    image: "",
  },
  {
    id: "7",
    slug: "sample-civic-facility",
    title: "Sample Civic Facility",
    category: "infrastructure",
    location: "Your Region",
    year: "2022",
    description:
      "Infrastructure and institutional work with safety-first site controls. Use this card for roads, retaining works, or public buildings.",
    image: "",
  },
  {
    id: "8",
    slug: "sample-warehouse",
    title: "Sample Warehouse",
    category: "industrial",
    location: "Your City",
    year: "2022",
    description:
      "Industrial structure scoped for clear span, loading access, and durable materials. Replace with your factory or warehouse project.",
    image: "",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}
