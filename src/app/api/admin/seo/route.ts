import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { SeoSettings } from "@/lib/db/models";
import { siteConfig } from "@/config/site";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    let doc = await SeoSettings.findOne({ key: "global" }).lean();
    if (!doc) {
      doc = await SeoSettings.create({
        key: "global",
        titleTemplate: "%s | NEBCO",
        defaultDescription: siteConfig.description,
        defaultOgImage: siteConfig.ogImage,
        keywords: [],
      });
    }
    return apiSuccess(doc);
  } catch {
    return apiError("Failed to fetch SEO settings", 500);
  }
}

export async function PUT(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    await connectDB();
    const doc = await SeoSettings.findOneAndUpdate(
      { key: "global" },
      { $set: body },
      { new: true, upsert: true, runValidators: true },
    ).lean();
    return apiSuccess(doc);
  } catch {
    return apiError("Failed to update SEO settings", 500);
  }
}
