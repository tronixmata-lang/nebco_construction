import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { saveUploadedFile } from "@/lib/upload/media";

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
