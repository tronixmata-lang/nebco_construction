import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { revalidatePublicSite } from "@/lib/admin/revalidate-public";
import { connectDB } from "@/lib/db/connect";
import { Redirect } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const body = await request.json();
    await connectDB();
    const item = await Redirect.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!item) return apiError("Redirect not found", 404);
    revalidatePublicSite();
    return apiSuccess(item);
  } catch {
    return apiError("Failed to update redirect", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    await connectDB();
    const item = await Redirect.findByIdAndDelete(id);
    if (!item) return apiError("Redirect not found", 404);
    revalidatePublicSite();
    return apiSuccess({ deleted: true });
  } catch {
    return apiError("Failed to delete redirect", 500);
  }
}
