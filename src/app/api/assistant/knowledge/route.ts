import { NextResponse } from "next/server";
import { buildAssistantKnowledge } from "@/lib/assistant/build-knowledge";

export async function GET() {
  try {
    const knowledge = await buildAssistantKnowledge();
    return NextResponse.json(knowledge, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to load assistant knowledge." }, { status: 500 });
  }
}
