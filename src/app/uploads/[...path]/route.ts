import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { ALLOWED_IMAGE_EXTENSIONS, UPLOAD_DIR } from "@/lib/upload/config";
import { resolveSafeFilename } from "@/lib/upload/media";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  const joined = segments?.join("/") ?? "";
  const safe = resolveSafeFilename(path.basename(joined));

  if (!safe) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(safe).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), UPLOAD_DIR, safe);

  try {
    const info = await stat(filePath);
    if (!info.isFile()) {
      return new NextResponse("Not found", { status: 404 });
    }

    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    // Legacy: files uploaded before the storage move may still live in public/uploads.
    const legacyPath = path.join(process.cwd(), "public", "uploads", safe);
    try {
      const info = await stat(legacyPath);
      if (!info.isFile()) {
        return new NextResponse("Not found", { status: 404 });
      }
      const buffer = await readFile(legacyPath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      });
    } catch {
      return new NextResponse("Not found", { status: 404 });
    }
  }
}
