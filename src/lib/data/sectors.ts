import {
  getSectorProfileById as getStaticSectorProfileById,
  sectorProfiles as staticSectorProfiles,
} from "@/content/sectors";
import { connectDB } from "@/lib/db/connect";
import { Sector as SectorModel, type SectorDocument } from "@/lib/db/models/Sector";
import type { IndustrySector, SectorProfile } from "@/types";

function mapSectorBase(
  doc: Pick<
    SectorDocument,
    "legacyId" | "title" | "description" | "highlight" | "image"
  >,
): IndustrySector {
  return {
    id: doc.legacyId,
    title: doc.title,
    description: doc.description,
    highlight: doc.highlight,
    image: doc.image,
  };
}

function mergeProfile(base: IndustrySector, doc: SectorDocument): SectorProfile {
  const staticProfile = staticSectorProfiles[base.id];
  const dbCapabilities = doc.capabilities ?? [];
  const dbMessageBody = doc.messageBody ?? [];
  const hasDbMessage = Boolean(doc.messageQuote?.trim()) || dbMessageBody.length > 0;

  return {
    ...base,
    image: doc.image || base.image,
    message: {
      quote: hasDbMessage ? (doc.messageQuote ?? "") : (staticProfile?.message.quote ?? ""),
      body: hasDbMessage ? dbMessageBody : (staticProfile?.message.body ?? []),
    },
    capabilities:
      dbCapabilities.length > 0
        ? dbCapabilities.map((item) => ({
            title: item.title,
            description: item.description,
          }))
        : (staticProfile?.capabilities ?? []),
  };
}

export async function getAllSectorIds(): Promise<string[]> {
  const sectors = await getSectorsList();
  return sectors.map((sector) => sector.id);
}

export async function getSectorProfileById(id: string): Promise<SectorProfile | undefined> {
  try {
    await connectDB();
    const doc = await SectorModel.findOne({ legacyId: id, published: true }).lean();
    if (doc) return mergeProfile(mapSectorBase(doc), doc);
  } catch {
    /* fallback */
  }
  return getStaticSectorProfileById(id);
}

export async function getSectorsList(): Promise<IndustrySector[]> {
  const { industrySectors } = await import("@/content/sectors");

  try {
    await connectDB();
    const docs = await SectorModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) {
      return docs.map(mapSectorBase);
    }
  } catch {
    /* fallback */
  }

  return industrySectors;
}
