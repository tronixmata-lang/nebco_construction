import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { SiteContent } from "@/lib/db/models";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const item = await SiteContent.findOne({ key: "global" }).lean();
    if (!item) return apiError("Site content not found", 404);
    return apiSuccess(item);
  } catch {
    return apiError("Failed to fetch site content", 500);
  }
}

export async function PUT(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const body = await request.json();
    await connectDB();
    const item = await SiteContent.findOneAndUpdate(
      { key: "global" },
      { $set: body },
      { new: true, upsert: true, runValidators: true },
    ).lean();
    return apiSuccess(item);
  } catch {
    return apiError("Failed to update site content", 500);
  }
}
