import type { InsightArticle } from "@/types";

export const insights: InsightArticle[] = [
  {
    id: "1",
    slug: "why-choose-nebco-construction-nepal",
    title: "Why Choose NEBCO as Your Construction Company in Nepal?",
    excerpt:
      "NEBCO is widely recognized for proven expertise, transparency, and commitment to quality, focusing on sustainable design, advanced engineering, and timely project delivery.",
    body: [
      "Selecting a construction partner in Nepal means balancing technical capability, regulatory compliance, and long-term accountability. NEBCO brings over three decades of field experience, A-Class licensing, and a track record across residential, commercial, and infrastructure projects that clients can verify.",
      "Our approach combines transparent project communication, disciplined site management, and engineering standards suited to Nepal's terrain and seismic conditions. From initial planning through handover, clients work with a team that prioritizes quality materials, clear timelines, and measurable outcomes.",
      "Whether you are building a family home, a commercial property, or a specialized facility, NEBCO delivers construction services designed to protect your investment and build confidence at every stage of the project.",
    ],
    category: "Construction",
    date: "2024-06-01",
    readTime: "5 min read",
    image: "/images/josepmonter-cranes-7347888.jpg",
  },
  {
    id: "2",
    slug: "earthquake-resistant-building-nepal",
    title: "Earthquake-Resistant Building Construction in Nepal",
    excerpt:
      "NEBCO specializes in seismic analysis and structurally sound construction methods, engineering every project to withstand Nepal's seismic conditions.",
    body: [
      "Nepal's geography demands construction practices that account for seismic risk from the earliest design phase. NEBCO integrates structural engineering principles, appropriate reinforcement detailing, and code-aligned construction methods to improve building resilience.",
      "Our teams evaluate soil conditions, load paths, and material specifications before work begins on site. This proactive approach reduces structural vulnerabilities and supports safer outcomes for occupants and investors alike.",
      "Earthquake-resistant construction is not a single technique. It is a disciplined process spanning design review, quality-controlled execution, and ongoing site supervision. NEBCO applies that process consistently across projects of varying scale and complexity.",
    ],
    category: "Engineering",
    date: "2024-05-15",
    readTime: "4 min read",
    image: "/images/pexels-enrique-11376668.jpg",
  },
  {
    id: "3",
    slug: "sustainable-construction-practices",
    title: "Sustainable Construction Practices at NEBCO",
    excerpt:
      "How NEBCO integrates eco-friendly building methods, energy-efficient systems, and green materials to create environmentally responsible structures.",
    body: [
      "Sustainable construction balances environmental responsibility with practical performance and lifecycle value. NEBCO evaluates material choices, energy efficiency opportunities, and waste reduction strategies as part of every project plan.",
      "Where appropriate, we incorporate durable materials, efficient building systems, and construction methods that minimize environmental impact without compromising structural integrity or client requirements.",
      "Our goal is to deliver buildings that serve communities well today while reducing long-term operating costs and environmental footprint, a standard that reflects both professional responsibility and client expectations.",
    ],
    category: "Sustainability",
    date: "2024-04-22",
    readTime: "6 min read",
    image: "/images/angela-compagnone-BHlaVh6-An0-unsplash.jpg",
  },
  {
    id: "4",
    slug: "construction-services-for-nrn",
    title: "Construction Services for NRNs Living Overseas",
    excerpt:
      "NEBCO bridges geographical distances by providing complete construction solutions and efficient communication for Non-Resident Nepalis worldwide.",
    body: [
      "For Non-Resident Nepalis planning projects in Nepal, distance and coordination are often the biggest challenges. NEBCO provides end-to-end construction management with structured updates, milestone reporting, and accountable on-site execution.",
      "Clients overseas receive clear visibility into progress, budget alignment, and quality checkpoints, supported by a team that understands both local construction realities and the expectations of international clients.",
      "From residential builds to investment properties, NEBCO helps NRNs move forward with confidence, knowing their project is managed by a licensed, experienced builder with a reputation earned over decades.",
    ],
    category: "Services",
    date: "2024-03-10",
    readTime: "4 min read",
    image: "/images/yuheng-ouyang-Js03-hENuCI-unsplash.jpg",
  },
];

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insights.find((article) => article.slug === slug);
}

