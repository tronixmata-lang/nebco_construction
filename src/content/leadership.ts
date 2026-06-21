import type { Leader } from "@/types";
import { NEBCO_FACEBOOK_URL, siteConfig } from "@/config/site";

export const chairmanMessage = {
  quote:
    "Under the umbrella of the esteemed Shah Group, NEBCO brings a wealth of expertise and experience in the real estate and construction industry. With over three decades of successful operations, we have become a trusted name in Nepal, known for our commitment to excellence, professionalism, and customer satisfaction. Our ethos revolves around excellence, integrity, innovation, and collaboration.",
  author: "NEBCO Leadership",
  role: "National Estate Builders Co. Pvt. Ltd.",
  image: "/images/site/Mr.-Prabhu-Rana-1.png",
};

export const leaders: Leader[] = [
  {
    id: "chairman",
    name: "Shah Group Leadership",
    role: "Parent Organization",
    bio: "NEBCO operates under the esteemed Shah Group, bringing decades of expertise in real estate and construction across Nepal.",
    image: "/images/site/cg.png",
    facebook: NEBCO_FACEBOOK_URL,
  },
  {
    id: "md",
    name: "Managing Director",
    role: "Managing Director, NEBCO",
    bio: "Overseeing day-to-day operations and ensuring excellence across construction, infrastructure, and consulting services.",
    image: "/images/site/Mr.-Prabhu-Rana-1.png",
    facebook: NEBCO_FACEBOOK_URL,
    email: siteConfig.email,
  },
  {
    id: "construction-head",
    name: "Project Management Team",
    role: "Head of Construction",
    bio: "Experienced project managers overseeing all construction activities, ensuring quality, safety, and adherence to timelines.",
    image: "/images/site/binod-ojha-1.jpg",
    facebook: NEBCO_FACEBOOK_URL,
  },
  {
    id: "design-head",
    name: "Design Team",
    role: "Head of Design & Engineering",
    bio: "In-house architects and engineers ensuring structural integrity, compliance with safety standards, and innovative design.",
    image: "/images/site/IMG_6211.jpg",
    facebook: NEBCO_FACEBOOK_URL,
  },
];
