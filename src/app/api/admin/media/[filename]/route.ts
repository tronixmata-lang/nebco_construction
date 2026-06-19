import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { deleteMediaFile } from "@/lib/upload/media";

type RouteContext = { params: Promise<{ filename: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const { filename } = await context.params;
    const deleted = await deleteMediaFile(decodeURIComponent(filename));
    if (!deleted) return apiError("File not found or invalid filename", 404);
    return apiSuccess({ deleted: true });
  } catch {
    return apiError("Failed to delete file", 500);
  }
}
