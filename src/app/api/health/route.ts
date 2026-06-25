import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";

export async function GET() {
  const hasUri = Boolean(process.env.MONGODB_URI);

  if (!hasUri) {
    return NextResponse.json(
      {
        ok: false,
        db: "not_configured",
        message: "MONGODB_URI is not set",
      },
      { status: 503 },
    );
  }

  try {
    await connectDB();
    const ready = mongoose.connection.readyState === 1;

    return NextResponse.json({
      ok: ready,
      db: ready ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database connection failed";
    return NextResponse.json(
      {
        ok: false,
        db: "error",
        message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
