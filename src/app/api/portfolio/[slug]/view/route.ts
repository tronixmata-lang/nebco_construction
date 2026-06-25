import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { Project } from "@/lib/db/models";

type ViewRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function POST(_request: Request, { params }: ViewRouteProps) {
  const { slug } = await params;

  try {
    await connectDB();
    const updated = await Project.findOneAndUpdate(
      { slug, published: true },
      { $inc: { viewCount: 1 } },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }

    return NextResponse.json({ ok: true, viewCount: updated.viewCount });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
