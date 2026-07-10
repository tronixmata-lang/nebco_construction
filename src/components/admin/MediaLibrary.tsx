"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Grid3X3,
  ImagePlus,
  LayoutList,
  Loader2,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";

type MediaFile = {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type MediaLibraryGridProps = {
  selectable?: boolean;
  selectedUrl?: string;
  onSelect?: (url: string) => void;
  compact?: boolean;
};

export function MediaLibraryGrid({
  selectable = false,
  selectedUrl,
  onSelect,
  compact = false,
}: MediaLibraryGridProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [copied, setCopied] = useState<string | null>(null);
  const [stats, setStats] = useState({ count: 0, totalSize: 0 });
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      setFiles(data.files ?? []);
      setStats({ count: data.count ?? 0, totalSize: data.totalSize ?? 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = files.filter(
    (f) =>
      !query.trim() ||
      f.filename.toLowerCase().includes(query.toLowerCase()) ||
      f.url.toLowerCase().includes(query.toLowerCase()),
  );

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files;
    if (!selected?.length) return;

    setUploading(true);
    setError("");

    try {
      for (const file of Array.from(selected)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/media", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Upload failed");
          break;
        }
      }
      await load();
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(filename: string) {
    if (!confirm(`Delete "${filename}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/media/${encodeURIComponent(filename)}`, { method: "DELETE" });
    await load();
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {!compact && (
        <AdminHeader
          title="Media Library"
          description="Browse, upload, and manage all images uploaded through the admin panel"
        />
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files..."
            className="admin-input pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!compact && (
            <div className="flex rounded-md border border-[var(--admin-border)]">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "bg-[var(--admin-primary)] text-white" : "text-[var(--admin-muted)]"}`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "bg-[var(--admin-primary)] text-white" : "text-[var(--admin-muted)]"}`}
                aria-label="List view"
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="admin-btn-primary"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>

      {!compact && (
        <div className="admin-card flex flex-wrap gap-6 px-5 py-4 text-sm">
          <div>
            <span className="text-[var(--admin-muted)]">Total files: </span>
            <span className="font-semibold text-white">{stats.count}</span>
          </div>
          <div>
            <span className="text-[var(--admin-muted)]">Storage used: </span>
            <span className="font-semibold text-white">{formatSize(stats.totalSize)}</span>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--admin-muted)]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card flex flex-col items-center justify-center py-16 text-center">
          <ImagePlus className="h-12 w-12 text-[var(--admin-muted)]" />
          <p className="mt-4 text-[var(--admin-muted)]">
            {query ? "No files match your search" : "No uploads yet. Click Upload to add images"}
          </p>
        </div>
      ) : view === "grid" || compact ? (
        <div className={`grid gap-4 ${compact ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
          {filtered.map((file) => (
            <div
              key={file.filename}
              className={`admin-card group overflow-hidden transition-all ${
                selectable ? "cursor-pointer hover:border-[var(--admin-primary)]" : ""
              } ${selectedUrl === file.url ? "ring-2 ring-[var(--admin-primary)]" : ""}`}
              onClick={() => selectable && onSelect?.(file.url)}
              onKeyDown={(e) => e.key === "Enter" && selectable && onSelect?.(file.url)}
              role={selectable ? "button" : undefined}
              tabIndex={selectable ? 0 : undefined}
            >
              <div className="relative aspect-square bg-[var(--admin-bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={file.url}
                  alt={file.filename}
                  className="h-full w-full object-cover"
                />
                {selectedUrl === file.url && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--admin-primary)]/40">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                )}
                {!selectable && (
                  <div className="absolute inset-0 flex items-end justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUrl(file.url);
                      }}
                      className="rounded-md bg-black/50 p-1.5 text-white hover:bg-black/70"
                      aria-label="Copy URL"
                    >
                      {copied === file.url ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.filename);
                      }}
                      className="rounded-md bg-black/50 p-1.5 text-white hover:bg-red-900/80"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-medium text-white" title={file.filename}>
                  {file.filename}
                </p>
                <p className="mt-0.5 text-[10px] text-[var(--admin-muted)]">
                  {formatSize(file.size)} · {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-card overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Filename</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((file) => (
                <tr key={file.filename}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={file.url} alt="" className="h-10 w-10 rounded object-cover" />
                  </td>
                  <td className="max-w-[200px] truncate font-mono text-xs">{file.filename}</td>
                  <td className="text-[var(--admin-muted)]">{formatSize(file.size)}</td>
                  <td className="text-[var(--admin-muted)]">
                    {new Date(file.createdAt).toLocaleString()}
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => copyUrl(file.url)}
                        className="rounded-md p-1.5 text-[var(--admin-muted)] hover:text-white"
                      >
                        {copied === file.url ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(file.filename)}
                        className="rounded-md p-1.5 text-[var(--admin-muted)] hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

type MediaPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentUrl?: string;
};

export function MediaPickerModal({ open, onClose, onSelect, currentUrl }: MediaPickerModalProps) {
  const [picked, setPicked] = useState(currentUrl ?? "");

  useEffect(() => {
    if (open) setPicked(currentUrl ?? "");
  }, [open, currentUrl]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Choose from Media Library</h2>
          <button type="button" onClick={onClose} className="text-[var(--admin-muted)] hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <MediaLibraryGrid
            selectable
            compact
            selectedUrl={picked}
            onSelect={setPicked}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--admin-border)] px-5 py-4">
          <button type="button" onClick={onClose} className="admin-btn-secondary">
            Cancel
          </button>
          <button
            type="button"
            disabled={!picked}
            onClick={() => {
              onSelect(picked);
              onClose();
            }}
            className="admin-btn-primary"
          >
            Use Selected Image
          </button>
        </div>
      </div>
    </div>
  );
}
