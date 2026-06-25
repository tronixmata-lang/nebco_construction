import {
  getAllSectorIds as getStaticSectorIds,
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

function mergeProfile(base: IndustrySector, doc?: SectorDocument | null): SectorProfile | undefined {
  const staticProfile = staticSectorProfiles[base.id];

  if (doc) {
    const dbMessageBody = doc.messageBody ?? [];
    const dbCapabilities = doc.capabilities ?? [];
    const hasDbMessage = Boolean(doc.messageQuote?.trim()) || dbMessageBody.length > 0;
    const hasDbCapabilities = dbCapabilities.length > 0;

    return {
      ...base,
      image: base.image ?? doc.image,
      message: {
        quote: hasDbMessage ? (doc.messageQuote ?? "") : (staticProfile?.message.quote ?? ""),
        body: hasDbMessage ? dbMessageBody : (staticProfile?.message.body ?? []),
      },
      capabilities: hasDbCapabilities
        ? dbCapabilities.map((item) => ({
            title: item.title,
            description: item.description,
          }))
        : (staticProfile?.capabilities ?? []),
    };
  }

  if (!staticProfile) return undefined;

  return {
    ...base,
    message: staticProfile.message,
    capabilities: staticProfile.capabilities,
  };
}

export async function getAllSectorIds(): Promise<string[]> {
  try {
    await connectDB();
    const docs = await SectorModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) return docs.map((doc) => doc.legacyId);
  } catch {
    /* fallback */
  }
  return getStaticSectorIds();
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
  try {
    await connectDB();
    const docs = await SectorModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) return docs.map(mapSectorBase);
  } catch {
    /* fallback */
  }
  const { industrySectors } = await import("@/content/sectors");
  return industrySectors;
}
