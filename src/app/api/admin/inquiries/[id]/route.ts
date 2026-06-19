import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { ContactInquiry } from "@/lib/db/models";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const { id } = await context.params;
    await connectDB();
    const item = await ContactInquiry.findById(id).lean();
    if (!item) return apiError("Inquiry not found", 404);
    return apiSuccess(item);
  } catch {
    return apiError("Failed to fetch inquiry", 500);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const { id } = await context.params;
    const body = await request.json();
    await connectDB();
    const item = await ContactInquiry.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!item) return apiError("Inquiry not found", 404);
    return apiSuccess(item);
  } catch {
    return apiError("Failed to update inquiry", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    const { id } = await context.params;
    await connectDB();
    const item = await ContactInquiry.findByIdAndDelete(id);
    if (!item) return apiError("Inquiry not found", 404);
    return apiSuccess({ deleted: true });
  } catch {
    return apiError("Failed to delete inquiry", 500);
  }
}
