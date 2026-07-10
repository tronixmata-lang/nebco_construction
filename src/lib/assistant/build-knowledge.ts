import { contactFaq } from "@/lib/seo";
import { getVerticalBookingPurposes } from "@/config/vertical-booking";
import {
  getCertificates,
  getDivisions,
  getLeaders,
  getSiteContent,
  getStats,
  getTestimonials,
} from "@/lib/data/content";
import { getProjects } from "@/lib/data/projects";
import type { AssistantKnowledge, KnowledgeEntry } from "@/lib/assistant/types";

export async function buildAssistantKnowledge(): Promise<AssistantKnowledge> {
  const [siteContent, divisions, stats, leaders, projects, certificates, testimonials] =
    await Promise.all([
      getSiteContent(),
      getDivisions(),
      getStats(),
      getLeaders(),
      getProjects(),
      getCertificates(),
      getTestimonials(),
    ]);

  const { siteConfig, about, companyOverview, chairmanMessage } = siteContent;

  const entries: KnowledgeEntry[] = [
    {
      id: "about",
      title: "About NEBCO",
      content: [
        `${siteConfig.legalName} (${siteConfig.shortName}) was established in ${siteConfig.foundingDate} under ${siteConfig.parentOrganization}.`,
        siteConfig.description,
        companyOverview.description,
        `Mission: ${about.mission}`,
        `Vision: ${about.vision}`,
        about.history,
      ].join("\n\n"),
      keywords: ["about", "company", "history", "mission", "vision", "founded", "shah group", "a class"],
      link: { label: "Learn more on About page", href: "/about" },
    },
    {
      id: "contact",
      title: "Contact NEBCO",
      content: [
        `Phone: ${siteConfig.phone}`,
        `Email: ${siteConfig.email}`,
        `Office: ${siteConfig.address}`,
        `Business hours: ${siteConfig.businessHours}`,
      ].join("\n"),
      keywords: ["contact", "phone", "email", "address", "location", "office", "hours", "call"],
      link: { label: "Go to Contact page", href: "/contact" },
    },
    {
      id: "divisions",
      title: "Our Divisions",
      content: divisions
        .map(
          (division) =>
            `${division.name}: ${division.tagline}. ${division.description} Services: ${division.services.join(", ")}.`,
        )
        .join("\n\n"),
      keywords: ["divisions", "services", "construction", "investment", "consulting", "verticals"],
      link: { label: "Explore divisions", href: "/divisions" },
    },
    {
      id: "projects",
      title: "Featured Projects",
      content:
        projects.length > 0
          ? projects
              .slice(0, 8)
              .map((project) => `${project.title} (${project.category}, ${project.location}, ${project.year}): ${project.description}`)
              .join("\n\n")
          : "Browse our portfolio of residential, commercial, and infrastructure projects across Nepal.",
      keywords: ["projects", "portfolio", "work", "buildings", "residential", "commercial"],
      link: { label: "View full portfolio", href: "/portfolio" },
    },
    {
      id: "leadership",
      title: "Leadership Team",
      content:
        leaders.length > 0
          ? leaders.map((leader) => `${leader.name}, ${leader.role}: ${leader.bio}`).join("\n\n")
          : "Meet the leadership team guiding NEBCO's construction, investment, and consulting work.",
      keywords: ["leadership", "team", "chairman", "director", "management"],
      link: { label: "Meet our leaders", href: "/leadership" },
    },
    {
      id: "certificates",
      title: "Licenses & Certifications",
      content: [
        siteContent.certificateSection.description,
        ...certificates.map((cert) => `${cert.title}: ${cert.subtitle}`),
      ].join("\n\n"),
      keywords: ["certificate", "license", "a class", "certification", "accreditation"],
      link: { label: "View certificates", href: "/about#certificates" },
    },
    {
      id: "stats",
      title: "Company Highlights",
      content:
        stats.length > 0
          ? stats.map((stat) => `${stat.value} ${stat.label}`).join("\n")
          : "NEBCO brings decades of construction experience across Nepal.",
      keywords: ["stats", "years", "experience", "projects", "highlights"],
    },
    {
      id: "chairman",
      title: "Chairman's Message",
      content: `"${chairmanMessage.quote}" — ${chairmanMessage.author}, ${chairmanMessage.role}`,
      keywords: ["chairman", "message", "quote", "leadership"],
      link: { label: "Read on About page", href: "/about" },
    },
    {
      id: "testimonials",
      title: "Client Testimonials",
      content:
        testimonials.length > 0
          ? testimonials
              .slice(0, 4)
              .map((item) => `"${item.quote}" — ${item.author}, ${item.role}, ${item.organization}`)
              .join("\n\n")
          : "NEBCO is trusted by homeowners, commercial clients, and hospitality partners across Nepal.",
      keywords: ["testimonials", "clients", "reviews", "feedback"],
    },
    {
      id: "booking",
      title: "Book a Consultation",
      content:
        "You can schedule a consultation with NEBCO Construction, Investment, or Consulting. Choose your preferred date (Sunday unavailable), time slot, and purpose. Our team confirms within 1-2 business days.",
      keywords: ["book", "booking", "schedule", "meeting", "consultation", "appointment"],
    },
    ...contactFaq.map((item, index) => ({
      id: `faq-${index}`,
      title: item.question,
      content: item.answer,
      keywords: item.question.toLowerCase().split(/\s+/),
    })),
  ];

  for (const division of divisions) {
    entries.push({
      id: `division-${division.id}`,
      title: division.name,
      content: `${division.tagline}\n\n${division.description}\n\nServices: ${division.services.join(", ")}`,
      keywords: [
        division.name.toLowerCase(),
        division.shortName.toLowerCase(),
        ...division.services.map((service) => service.toLowerCase()),
      ],
      link: { label: `Visit ${division.shortName}`, href: division.href },
    });
  }

  return {
    site: {
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      tagline: siteConfig.tagline,
      phone: siteConfig.phone,
      email: siteConfig.email,
      address: siteConfig.address,
      businessHours: siteConfig.businessHours,
      foundingDate: siteConfig.foundingDate,
      parentOrganization: siteConfig.parentOrganization,
      description: siteConfig.description,
    },
    entries,
    divisions: divisions.map((division) => ({
      slug: division.id,
      name: division.name,
      tagline: division.tagline,
      description: division.description,
      services: division.services,
      href: division.href,
      purposes: getVerticalBookingPurposes(division.id),
    })),
    quickTopics: [
      { id: "about", label: "About us" },
      { id: "divisions", label: "Our services" },
      { id: "quote", label: "Get a quote" },
      { id: "contact", label: "Contact" },
      { id: "booking", label: "Book meeting" },
    ],
  };
}
