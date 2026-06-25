import { requireAuth, apiSuccess, apiError, slugify } from "@/lib/auth/guard";
import { revalidatePublicSite } from "@/lib/admin/revalidate-public";
import { connectDB } from "@/lib/db/connect";
import { Insight } from "@/lib/db/models";
import { dbErrorResponse } from "@/lib/db/api-errors";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const { id } = await context.params;
    await connectDB();
    const item = await Insight.findById(id).lean();
    if (!item) return apiError("Insight not found", 404);
    return apiSuccess(item);
  } catch (error) {
    return dbErrorResponse(error, "Failed to fetch insight");
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const { id } = await context.params;
    const body = await request.json();
    await connectDB();
    if (body.title && !body.slug) body.slug = slugify(body.title);

    if (body.slug) {
      const duplicate = await Insight.findOne({ slug: body.slug, _id: { $ne: id } }).lean();
      if (duplicate) {
        return apiError("An insight with this slug already exists.", 409);
      }
    }

    const item = await Insight.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!item) return apiError("Insight not found", 404);
    revalidatePublicSite();
    return apiSuccess(item);
  } catch (error) {
    return dbErrorResponse(error, "Failed to update insight");
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const { id } = await context.params;
    await connectDB();
    const item = await Insight.findByIdAndDelete(id);
    if (!item) return apiError("Insight not found", 404);
    revalidatePublicSite();
    return apiSuccess({ deleted: true });
  } catch (error) {
    return dbErrorResponse(error, "Failed to delete insight");
  }
}
