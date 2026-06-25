"use client";

import Image from "next/image";

type SectorAtlasPreviewProps = {
  title: string;
  description: string;
  highlight: string;
  image: string;
  sortOrder: number;
};

export function SectorAtlasPreview({
  title,
  description,
  highlight,
  image,
  sortOrder,
}: SectorAtlasPreviewProps) {
  const imageSrc = image || "/images/pexels-enrique-11376668.jpg";
  const orderLabel = String(sortOrder + 1).padStart(2, "0");

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]">
      <div className="border-b border-[var(--admin-border)] px-4 py-3">
        <p className="text-xs font-semibold tracking-wide text-[var(--admin-muted)] uppercase">
          Sector Atlas Preview
        </p>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          How this sector appears on the animated atlas timeline at{" "}
          <span className="font-mono text-[var(--admin-text)]">/sectors</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[180px] bg-[var(--admin-bg-warm)]">
          <Image
            src={imageSrc}
            alt={title || "Sector preview"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          <span className="absolute left-3 top-3 font-mono text-3xl font-bold text-white/30">
            {orderLabel}
          </span>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-[var(--admin-border)] px-3 py-1 text-[10px] font-semibold tracking-wide text-[var(--admin-muted)] uppercase">
              Proven
            </span>
            <span className="font-mono text-xs text-[var(--admin-muted)]">Order {sortOrder}</span>
          </div>
          <h3 className="font-display text-lg text-[var(--admin-text)]">
            {title || "Sector title"}
          </h3>
          <span className="block h-0.5 w-10 rounded-full bg-[var(--brand-gold)]" />
          <p className="line-clamp-3 text-sm leading-relaxed text-[var(--admin-muted)]">
            {description || "Sector summary will appear here on the atlas card."}
          </p>
          <p className="border-t border-[var(--admin-border)] pt-3 text-[10px] font-semibold tracking-wide text-[var(--brand-red)] uppercase">
            {highlight || "Highlight proof point"}
          </p>
        </div>
      </div>
    </div>
  );
}
