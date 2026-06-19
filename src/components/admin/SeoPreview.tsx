"use client";

type SeoPreviewProps = {
  title: string;
  description: string;
  url?: string;
};

export function SeoPreview({ title, description, url = "https://nebco.com.np" }: SeoPreviewProps) {
  const displayTitle = title || "Page Title";
  const displayDesc =
    description ||
    "Add a meta description to improve click-through rates from search results.";

  return (
    <div className="admin-seo-preview rounded-sm p-4">
      <p className="mb-2 text-[10px] font-bold tracking-[0.15em] text-[var(--admin-accent)] uppercase">
        Search Preview
      </p>
      <p className="truncate text-sm text-[#1a0dab]">{displayTitle}</p>
      <p className="truncate text-xs text-[#006621]">{url}</p>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#545454]">{displayDesc}</p>
    </div>
  );
}
