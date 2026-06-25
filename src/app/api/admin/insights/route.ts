import { requireAuth, apiSuccess, apiError, slugify } from "@/lib/auth/guard";
import { revalidatePublicSite } from "@/lib/admin/revalidate-public";
import { connectDB } from "@/lib/db/connect";
import { Insight } from "@/lib/db/models";

export async function GET(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();
    const filter: Record<string, unknown> = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ];
    }
    const items = await Insight.find(filter).sort({ date: -1 }).lean();
    return apiSuccess(items);
  } catch {
    return apiError("Failed to fetch insights", 500);
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    await connectDB();
    const slug = body.slug || slugify(body.title);
    if (await Insight.findOne({ slug })) {
      return apiError("An article with this slug already exists", 409);
    }
    const count = await Insight.countDocuments();
    const item = await Insight.create({ ...body, slug, sortOrder: body.sortOrder ?? count });
    revalidatePublicSite();
    return apiSuccess(item, 201);
  } catch {
    return apiError("Failed to create insight", 500);
  }
}
