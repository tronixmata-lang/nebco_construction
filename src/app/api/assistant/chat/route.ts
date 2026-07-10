import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { AssistantChat } from "@/lib/db/models/AssistantChat";
import { mapDbError } from "@/lib/db/api-errors";

const chatLogSchema = z.object({
  sessionId: z.string().uuid(),
  role: z.enum(["user", "assistant"]),
  text: z.string().min(1).max(4000),
  pagePath: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatLogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid chat payload." }, { status: 400 });
    }

    const { sessionId, role, text, pagePath } = parsed.data;
    const userAgent = request.headers.get("user-agent") ?? undefined;
    const preview = text.length > 140 ? `${text.slice(0, 137)}...` : text;

    await connectDB();

    await AssistantChat.findOneAndUpdate(
      { sessionId },
      {
        $push: {
          messages: {
            role,
            text,
            createdAt: new Date(),
          },
        },
        $set: {
          lastPreview: preview,
          pagePath,
          userAgent,
        },
        $inc: { messageCount: 1 },
        $setOnInsert: { sessionId },
      },
      { upsert: true, new: true },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const mapped = mapDbError(error, "Failed to save chat message.");
    return NextResponse.json({ error: mapped.message }, { status: mapped.status });
  }
}
