import { requireAuth, apiSuccess, apiError, slugify } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { Project } from "@/lib/db/models";

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
  } catch {
    return apiError("Failed to fetch project", 500);
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

    const item = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!item) return apiError("Project not found", 404);
    return apiSuccess(item);
  } catch {
    return apiError("Failed to update project", 500);
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
  } catch {
    return apiError("Failed to delete project", 500);
  }
}
