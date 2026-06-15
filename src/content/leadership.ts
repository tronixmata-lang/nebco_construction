import type { Leader } from "@/types";

export const chairmanMessage = {
  quote:
    "Under the umbrella of the esteemed Shah Group, NEBCO brings a wealth of expertise and experience in the real estate and construction industry. With over three decades of successful operations, we have become a trusted name in Nepal, known for our commitment to excellence, professionalism, and customer satisfaction. Our ethos revolves around excellence, integrity, innovation, and collaboration.",
  author: "NEBCO Leadership",
  role: "National Estate Builders Co. Pvt. Ltd.",
};

export const leaders: Leader[] = [
  {
    id: "chairman",
    name: "Shah Group Leadership",
    role: "Parent Organization",
    bio: "NEBCO operates under the esteemed Shah Group, bringing decades of expertise in real estate and construction across Nepal.",
  },
  {
    id: "md",
    name: "Managing Director",
    role: "Managing Director, NEBCO",
    bio: "Overseeing day-to-day operations and ensuring excellence across construction, infrastructure, and consulting services.",
  },
  {
    id: "construction-head",
    name: "Project Management Team",
    role: "Head of Construction",
    bio: "Experienced project managers overseeing all construction activities, ensuring quality, safety, and adherence to timelines.",
  },
  {
    id: "design-head",
    name: "Design Team",
    role: "Head of Design & Engineering",
    bio: "In-house architects and engineers ensuring structural integrity, compliance with safety standards, and innovative design.",
  },
];
