import { getStaticDivisionProfile } from "@/content/division-profiles";
import { connectDB } from "@/lib/db/connect";
import {
  Division as DivisionModel,
  type DivisionDocument,
} from "@/lib/db/models/Division";
import type { DivisionProfile } from "@/types";

const defaultProcess = [
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
];

const defaultCommitments = [
  "Quality-first execution on every engagement",
  "Transparent communication with clients and partners",
  "Safety and compliance across all project stages",
];

function capabilitiesFromServices(services: string[]) {
  return services.map((service) => ({
    title: service,
    description: `Professional ${service.toLowerCase()} delivered with NEBCO quality standards and accountable project leadership.`,
  }));
}

function mapDivisionDocToProfile(doc: DivisionDocument): DivisionProfile {
  const capabilities =
    doc.capabilities?.length > 0
      ? doc.capabilities.map((item) => ({
          title: item.title,
          description: item.description,
        }))
      : capabilitiesFromServices(doc.services);

  return {
    id: doc.legacyId,
    slug: doc.slug,
    name: doc.name,
    shortName: doc.shortName,
    tagline: doc.tagline,
    description: doc.description,
    services: doc.services,
    href: doc.href,
    highlight: doc.highlight?.trim() || doc.tagline,
    overview: doc.overview?.trim() || doc.description,
    heroImage: doc.heroImage,
    capabilities,
    process: doc.process?.length > 0 ? doc.process : defaultProcess,
    commitments: doc.commitments?.length > 0 ? doc.commitments : defaultCommitments,
  };
}

export async function getDivisionProfileBySlug(slug: string): Promise<DivisionProfile | undefined> {
  try {
    await connectDB();
    const doc = await DivisionModel.findOne({ slug, published: true }).lean();
    if (doc) {
      return mapDivisionDocToProfile(doc);
    }
  } catch {
    /* fallback */
  }

  return getStaticDivisionProfile(slug) ?? undefined;
}
