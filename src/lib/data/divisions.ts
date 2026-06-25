import { getStaticDivisionProfile } from "@/content/division-profiles";
import { getDivisionBySlug } from "@/lib/data/content";
import type { DivisionProfile } from "@/types";

export async function getDivisionProfileBySlug(slug: string): Promise<DivisionProfile | undefined> {
  const division = await getDivisionBySlug(slug);
  const profile = getStaticDivisionProfile(slug);

  if (!division) {
    return profile ?? undefined;
  }

  if (!profile) {
    return {
      ...division,
      highlight: division.tagline,
      overview: division.description,
      capabilities: division.services.map((service) => ({
        title: service,
        description: `Professional ${service.toLowerCase()} delivered with NEBCO quality standards and accountable project leadership.`,
      })),
      process: [
        {
          title: "Plan",
          description: "Scope, timeline, and requirements aligned with your objectives.",
        },
        {
          title: "Design",
          description: "Technical coordination and documentation before execution.",
        },
        {
          title: "Deliver",
          description: "Disciplined site management with transparent progress reporting.",
        },
        {
          title: "Handover",
          description: "Final quality review and support at project completion.",
        },
      ],
      commitments: [
        "Quality-first execution on every engagement",
        "Transparent communication with clients and partners",
        "Safety and compliance across all project stages",
      ],
    };
  }

  return {
    ...profile,
    ...division,
    services: division.services,
    capabilities:
      profile.capabilities.length > 0
        ? profile.capabilities
        : division.services.map((service) => ({
            title: service,
            description: `Professional ${service.toLowerCase()} with NEBCO standards.`,
          })),
  };
}
