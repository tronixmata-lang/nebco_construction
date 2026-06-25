"use client";

import { normalizeMediaSrc } from "@/lib/media-url";
import { useRef, useState } from "react";
import { FolderOpen, ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { AdminField } from "@/components/admin/ResourceList";
import { MediaPickerModal } from "@/components/admin/MediaLibrary";

type ImageUploadProps = {
  label?: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
};

export function ImageUpload({
  label = "Image",
  hint = "Upload an image, browse the media library, or paste a URL",
  value,
  onChange,
  required,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [libraryOpen, setLibraryOpen] = useState(false);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }

      onChange(normalizeMediaSrc(data.url));
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <AdminField label={label} hint={hint}>
        <div className="space-y-3">
          {value ? (
            <div className="relative inline-block overflow-hidden rounded-md border border-[var(--admin-border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Preview" className="h-44 w-full max-w-sm object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-2 right-2 rounded-md bg-black/60 p-1.5 text-white transition-colors hover:bg-red-900/80"
                aria-label="Remove image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              className="flex h-44 max-w-sm cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-[var(--admin-border)] bg-[var(--admin-bg)] transition-colors hover:border-[var(--admin-primary)]"
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
              role="button"
              tabIndex={0}
            >
              {uploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-muted)]" />
              ) : (
                <>
                  <ImagePlus className="h-8 w-8 text-[var(--admin-muted)]" />
                  <p className="mt-2 text-sm text-[var(--admin-muted)]">Click to upload</p>
                  <p className="text-xs text-[var(--admin-muted)]">JPEG, PNG, WebP, GIF — max 5 MB</p>
                </>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="admin-btn-secondary text-xs"
            >
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
            <button
              type="button"
              onClick={() => setLibraryOpen(true)}
              className="admin-btn-secondary text-xs"
            >
              <FolderOpen className="h-3.5 w-3.5" />
              Browse Library
            </button>
          </div>

          <input
            className="admin-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/your-image.jpg or /images/site/..."
            required={required && !value}
          />

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={handleFileSelect}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </AdminField>

      <MediaPickerModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={onChange}
        currentUrl={value}
      />
    </>
  );
}
