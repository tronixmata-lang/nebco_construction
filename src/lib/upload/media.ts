import { mkdir, readdir, stat, unlink, writeFile } from "fs/promises";
import path from "path";
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  UPLOAD_DIR,
} from "./config";

export type MediaFile = {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
};

function getUploadPath(): string {
  return path.join(process.cwd(), UPLOAD_DIR);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}

export function resolveSafeFilename(filename: string): string | null {
  const base = path.basename(filename);
  if (base !== filename || base.includes("..")) return null;
  const ext = path.extname(base).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) return null;
  return base;
}

export async function saveUploadedFile(file: File): Promise<MediaFile> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Invalid file type. Use JPEG, PNG, WebP, GIF, or AVIF.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("File too large. Maximum size is 5 MB.");
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    throw new Error("Invalid file extension.");
  }

  const baseName = sanitizeFilename(path.basename(file.name, ext)) || "image";
  const filename = `${Date.now()}-${baseName}${ext}`;
  const uploadPath = getUploadPath();
  await mkdir(uploadPath, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadPath, filename), buffer);

  return {
    filename,
    url: `/uploads/${filename}`,
    size: file.size,
    createdAt: new Date().toISOString(),
  };
}

export async function listMediaFiles(): Promise<MediaFile[]> {
  const uploadPath = getUploadPath();
  await mkdir(uploadPath, { recursive: true });

  const entries = await readdir(uploadPath);
  const files: MediaFile[] = [];

  for (const entry of entries) {
    if (entry.startsWith(".")) continue;
    const safe = resolveSafeFilename(entry);
    if (!safe) continue;

    const filePath = path.join(uploadPath, safe);
    const info = await stat(filePath);
    if (!info.isFile()) continue;

    files.push({
      filename: safe,
      url: `/uploads/${safe}`,
      size: info.size,
      createdAt: info.mtime.toISOString(),
    });
  }

  return files.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function deleteMediaFile(filename: string): Promise<boolean> {
  const safe = resolveSafeFilename(filename);
  if (!safe) return false;

  const filePath = path.join(getUploadPath(), safe);
  try {
    await unlink(filePath);
    return true;
  } catch {
    return false;
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
