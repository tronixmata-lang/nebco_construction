import { requireAuth, apiSuccess, apiError, slugify } from "@/lib/auth/guard";
import { revalidatePublicSite } from "@/lib/admin/revalidate-public";
import { connectDB } from "@/lib/db/connect";
import { Project } from "@/lib/db/models";

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
        { location: { $regex: q, $options: "i" } },
        { slug: { $regex: q, $options: "i" } },
      ];
    }

    const items = await Project.find(filter)
      .sort({ featured: -1, sortOrder: 1, updatedAt: -1 })
      .lean();
    return apiSuccess(items);
  } catch {
    return apiError("Failed to fetch projects", 500);
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    await connectDB();

    const slug = body.slug || slugify(body.title);
    const existing = await Project.findOne({ slug });
    if (existing) {
      return apiError("A project with this slug already exists", 409);
    }

    const count = await Project.countDocuments();
    const item = await Project.create({
      ...body,
      slug,
      sortOrder: body.sortOrder ?? count,
    });

    revalidatePublicSite();
    return apiSuccess(item, 201);
  } catch {
    return apiError("Failed to create project", 500);
  }
}
