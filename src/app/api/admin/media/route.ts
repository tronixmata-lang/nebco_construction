import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { listMediaFiles, saveUploadedFile } from "@/lib/upload/media";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const files = await listMediaFiles();
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    return apiSuccess({ files, count: files.length, totalSize });
  } catch {
    return apiError("Failed to list media files", 500);
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return apiError("No file provided", 400);
    }

    const saved = await saveUploadedFile(file);
    return apiSuccess(saved, 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return apiError(message, 400);
  }
}
