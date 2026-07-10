import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { AssistantChat } from "@/lib/db/models/AssistantChat";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const items = await AssistantChat.find({})
      .sort({ updatedAt: -1 })
      .select("sessionId lastPreview messageCount pagePath createdAt updatedAt")
      .lean();

    return apiSuccess(items);
  } catch {
    return apiError("Failed to fetch assistant chats", 500);
  }
}
