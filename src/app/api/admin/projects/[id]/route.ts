import { requireAuth, apiSuccess, apiError, slugify } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { Project } from "@/lib/db/models";
import { dbErrorResponse } from "@/lib/db/api-errors";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    await connectDB();
    const item = await Project.findById(id).lean();
    if (!item) return apiError("Project not found", 404);
    return apiSuccess(item);
  } catch (error) {
    return dbErrorResponse(error, "Failed to fetch project");
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const body = await request.json();
    await connectDB();

    if (body.title && !body.slug) {
      body.slug = slugify(body.title);
    }

    if (body.slug) {
      const duplicate = await Project.findOne({ slug: body.slug, _id: { $ne: id } }).lean();
      if (duplicate) {
        return apiError("A project with this slug already exists.", 409);
      }
    }

    const item = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!item) return apiError("Project not found", 404);
    return apiSuccess(item);
  } catch (error) {
    return dbErrorResponse(error, "Failed to update project");
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    await connectDB();
    const item = await Project.findByIdAndDelete(id);
    if (!item) return apiError("Project not found", 404);
    return apiSuccess({ deleted: true });
  } catch (error) {
    return dbErrorResponse(error, "Failed to delete project");
  }
}
