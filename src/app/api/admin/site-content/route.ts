import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { revalidatePublicSite } from "@/lib/admin/revalidate-public";
import { connectDB } from "@/lib/db/connect";
import { SiteContent } from "@/lib/db/models";
import {
  getDefaultSiteContent,
  mapSiteContentDocument,
  mergeSiteContentUpdate,
  type SiteContentData,
} from "@/lib/data/site-content-defaults";

async function loadSiteContentData(): Promise<SiteContentData> {
  await connectDB();
  const item = await SiteContent.findOne({ key: "global" }).lean();
  if (!item) return getDefaultSiteContent();
  return mapSiteContentDocument(item);
}

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const data = await loadSiteContentData();
    return apiSuccess(data);
  } catch {
    return apiError("Failed to fetch site content", 500);
  }
}

export async function PUT(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const body = (await request.json()) as Partial<SiteContentData>;
    await connectDB();
    const existing = await loadSiteContentData();
    const merged = mergeSiteContentUpdate(existing, body);
    const item = await SiteContent.findOneAndUpdate(
      { key: "global" },
      { $set: merged },
      { new: true, upsert: true, runValidators: true },
    ).lean();
    if (!item) return apiError("Failed to update site content", 500);
    revalidatePublicSite();
    return apiSuccess(mapSiteContentDocument(item));
  } catch (error) {
    console.error("Site content update failed:", error);
    return apiError("Failed to update site content", 500);
  }
}
