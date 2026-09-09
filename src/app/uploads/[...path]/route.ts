import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { ALLOWED_IMAGE_EXTENSIONS, UPLOAD_DIR, resolveSafeFilename } from "@/lib/upload/config";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export const dynamic = "force-dynamic";

function onDisk(...parts: string[]) {
  // Resolve from "." so NFT does not copy process.cwd() (public/, node_modules/) into this function.
  return path.resolve(".", ...parts);
}

async function readUpload(filePath: string, ext: string) {
  const info = await stat(filePath);
  if (!info.isFile()) return null;
  const buffer = await readFile(filePath);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

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

  try {
    const response = await readUpload(onDisk(UPLOAD_DIR, safe), ext);
    if (response) return response;
  } catch {
    // Fall through to the legacy public/uploads location.
  }

  try {
    const response = await readUpload(onDisk("public", "uploads", safe), ext);
    if (response) return response;
  } catch {
    // Not found in either location.
  }

  return new NextResponse("Not found", { status: 404 });
}
