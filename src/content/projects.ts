import type { Project, ProjectCategory } from "@/types";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "industrial", label: "Industrial" },
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "sukedhara-private-house",
    title: "Sukedhara Private House",
    category: "residential",
    location: "Sukedhara, Kathmandu",
    year: "2024",
    description:
      "Private residential construction delivered with NEBCO's signature quality standards and meticulous attention to detail. From foundation to finishing, every stage was managed with transparent communication and on-time execution.",
    image: "/images/site/DSC01007-scaled.jpg",
  },
  {
    id: "2",
    slug: "sitapaila-project",
    title: "Sitapaila Project",
    category: "residential",
    location: "Sitapaila, Kathmandu",
    year: "2024",
    description:
      "Residential development in Sitapaila showcasing modern design and structural excellence. The project reflects NEBCO's commitment to building homes that combine contemporary aesthetics with earthquake-resistant engineering.",
    image: "/images/site/1-1-3-scaled.jpg",
  },
  {
    id: "3",
    slug: "kapan-project",
    title: "Kapan Project",
    category: "residential",
    location: "Kapan, Kathmandu",
    year: "2024",
    description:
      "A residential project in Kapan built with sustainable materials and earthquake-resistant design. The home features thoughtful spatial planning and premium finishes tailored to the client's lifestyle and long-term needs.",
    image: "/images/site/kapan-2_11zon.jpg",
  },
  {
    id: "4",
    slug: "residence-building-mahesh-swar",
    title: "Residence Building Mahesh Swar",
    category: "residential",
    location: "Kathmandu",
    year: "2024",
    description:
      "Custom residence designed and constructed to meet the client's vision with premium finishes throughout. NEBCO managed the full build cycle, from structural work to interior detailing, ensuring quality at every step.",
    image: "/images/site/IMG_4349-scaled.jpg",
  },
  {
    id: "5",
    slug: "mr-prabhu-rana",
    title: "Mr Prabhu Rana",
    category: "residential",
    location: "Kathmandu",
    year: "2024",
    description:
      "Bespoke residential construction project reflecting personalized architectural preferences and functional requirements. Delivered with NEBCO's hallmark transparency, the build met every milestone on schedule.",
    image: "/images/site/Mr.-Prabhu-Rana-1.png",
  },
  {
    id: "6",
    slug: "mr-binod-ojha",
    title: "Mr Binod Ojha",
    category: "residential",
    location: "Kathmandu",
    year: "2024",
    description:
      "Residential building project completed with transparent communication and on-time delivery. The client received regular progress updates and a finished home that exceeded expectations in both quality and craftsmanship.",
    image: "/images/site/binod-ojha-1.jpg",
  },
  {
    id: "7",
    slug: "hattigaunda",
    title: "Hattigaunda",
    category: "residential",
    location: "Hattigaunda",
    year: "2024",
    description:
      "Residential construction project demonstrating NEBCO's capability beyond the Kathmandu Valley. Built to the same A-Class standards as our capital projects, this home brings trusted NEBCO quality to a growing community.",
    image: "/images/site/hata-guda-5.png",
  },
  {
    id: "8",
    slug: "hotel-yatri-thamel",
    title: "Hotel Yatri Thamel",
    category: "commercial",
    location: "Thamel, Kathmandu",
    year: "2024",
    description:
      "Commercial hotel construction in Thamel combining hospitality design with structural reliability. The project was delivered to meet the operational demands of a high-traffic tourist district while maintaining premium build quality.",
    image: "/images/site/1-81_11zon.jpg",
  },
  {
    id: "9",
    slug: "hotel-buddy-thamel",
    title: "Hotel Buddy Thamel",
    category: "commercial",
    location: "Thamel, Kathmandu",
    year: "2024",
    description:
      "Hotel development in the heart of Thamel, built to international hospitality standards. NEBCO coordinated structural, MEP, and finishing works to create a guest-ready property in one of Nepal's busiest commercial zones.",
    image: "/images/site/hotel-buddy-thamel-5.png",
  },
  {
    id: "10",
    slug: "hotel-mirage-regency",
    title: "Hotel Mirage Regency",
    category: "commercial",
    location: "Nepal",
    year: "2024",
    description:
      "Premium hotel construction project showcasing NEBCO's expertise in commercial hospitality. The build incorporated durable materials and efficient layouts designed for long-term operational performance and guest comfort.",
    image: "/images/site/1_11zon.jpg",
  },
  {
    id: "11",
    slug: "hotel-birgunj",
    title: "Hotel Birgunj",
    category: "commercial",
    location: "Birgunj",
    year: "2024",
    description:
      "Commercial hotel project in Birgunj demonstrating NEBCO's reach across Nepal. Delivered with the same quality controls and project management rigor applied to our Kathmandu portfolio, this build strengthens NEBCO's national presence.",
    image: "/images/site/1-3-scaled.jpg",
  },
  {
    id: "12",
    slug: "khanal-commercial-building-nepalgunj",
    title: "Khanal Commercial Building Nepalgunj",
    category: "commercial",
    location: "Nepalgunj",
    year: "2024",
    description:
      "Commercial building in Nepalgunj designed for retail and business operations. The structure was engineered for high footfall and flexible tenancy, with durable finishes suited to a demanding commercial environment.",
    image: "/images/site/IMG_7544_11zon.jpg",
  },
  {
    id: "13",
    slug: "khanal-complex-nepalgunj",
    title: "Khanal Complex Nepalgunj",
    category: "commercial",
    location: "Nepalgunj",
    year: "2024",
    description:
      "Multi-use commercial complex serving the business community of Nepalgunj. NEBCO delivered integrated construction across multiple units, ensuring consistent quality and timely handover for the entire development.",
    image: "/images/site/1-40_11zon.jpg",
  },
  {
    id: "14",
    slug: "omsaan",
    title: "OM SAAN International",
    category: "commercial",
    location: "Kathmandu",
    year: "2024",
    description:
      "Commercial project for OM SAAN International Pvt. Ltd., delivered with precision and professionalism. The build was tailored to the client's operational workflow, combining functional design with NEBCO's trusted construction standards.",
    image: "/images/site/1-4-1-scaled.jpg",
  },
  {
    id: "15",
    slug: "ajay-sarawagi",
    title: "Ajay Sarawagi",
    category: "commercial",
    location: "Nepal",
    year: "2024",
    description:
      "Commercial construction project tailored to the client's business requirements and brand identity. NEBCO managed the project from planning through completion, ensuring structural integrity and a polished final delivery.",
    image: "/images/site/Sarawagi.png",
  },
  {
    id: "16",
    slug: "hospital-construction-team-in-bhutan",
    title: "Hospital Construction Team in Bhutan",
    category: "infrastructure",
    location: "Bhutan",
    year: "2024",
    description:
      "International infrastructure project: hospital construction demonstrating NEBCO's cross-border capability. Our experienced team deployed specialized skills and rigorous safety standards to support critical healthcare infrastructure abroad.",
    image: "/images/site/1-7_11zon-scaled.jpg",
  },
  {
    id: "17",
    slug: "residence",
    title: "Residence",
    category: "residential",
    location: "Kathmandu",
    year: "2024",
    description:
      "Residential construction with modern architectural design and quality craftsmanship throughout. The project balanced aesthetic appeal with practical living spaces, delivered on time and within the agreed scope.",
    image: "/images/site/IMG_6211.jpg",
  },
  {
    id: "18",
    slug: "mahesh-suwal",
    title: "Mahesh Suwal",
    category: "residential",
    location: "Kathmandu",
    year: "2024",
    description:
      "Private residence built with NEBCO's commitment to quality and client satisfaction. Every detail, from structural framing to final finishes, was executed with the care and accountability our clients expect.",
    image: "/images/site/IMG_4352_11zon-scaled.jpg",
  },
  {
    id: "19",
    slug: "basanta-thamel",
    title: "Basanta Thamel",
    category: "commercial",
    location: "Thamel, Kathmandu",
    year: "2024",
    description:
      "Commercial project in Thamel combining traditional context with modern construction techniques. NEBCO navigated the constraints of a heritage-rich neighborhood to deliver a durable, functional commercial property.",
    image: "/images/site/IMG_4355.png",
  },
  {
    id: "20",
    slug: "binayak-bam-malla",
    title: "Binayak Bam Malla",
    category: "residential",
    location: "Kathmandu",
    year: "2024",
    description:
      "Residential project for Binayak Bam Malla, built with transparency and exceptional workmanship. The client praised NEBCO's attentive project management and the outstanding quality visible in every aspect of the finished home.",
    image: "/images/site/1-22.png",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}
