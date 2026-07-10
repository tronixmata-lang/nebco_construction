import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { AssistantChat } from "@/lib/db/models/AssistantChat";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    await connectDB();
    const chat = await AssistantChat.findById(id).lean();
    if (!chat) {
      return apiError("Chat session not found", 404);
    }
    return apiSuccess(chat);
  } catch {
    return apiError("Failed to fetch chat session", 500);
  }
}
