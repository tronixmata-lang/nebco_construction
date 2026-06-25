/** Normalize admin/media image paths for public rendering. */
export function normalizeMediaSrc(src: string | undefined | null): string {
  const value = src?.trim() ?? "";
  if (!value) return "";

  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const url = new URL(value);
      if (url.pathname.startsWith("/uploads/") || url.pathname.startsWith("/images/")) {
        return url.pathname;
      }
    } catch {
      return value;
    }
    return value;
  }

  if (value.startsWith("/")) return value;
  if (value.startsWith("uploads/")) return `/${value}`;

  return value;
}

export function isAdminUploadSrc(src: string): boolean {
  return normalizeMediaSrc(src).startsWith("/uploads/");
}
