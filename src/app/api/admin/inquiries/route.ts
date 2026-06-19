import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { ContactInquiry } from "@/lib/db/models";

export async function GET(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const filter =
      status && ["new", "read", "replied", "archived"].includes(status)
        ? { status: status as "new" | "read" | "replied" | "archived" }
        : {};
    const items = await ContactInquiry.find(filter).sort({ createdAt: -1 }).lean();
    return apiSuccess(items);
  } catch {
    return apiError("Failed to fetch inquiries", 500);
  }
}
