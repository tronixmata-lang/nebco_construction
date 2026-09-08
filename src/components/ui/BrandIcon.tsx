import { cn } from "@/lib/utils";
import {
  brandIconSrc,
  getBrandIconSrc,
  resolveBrandIconName,
  type BrandIconName,
} from "@/lib/brand-icons";

type BrandIconProps = {
  name?: BrandIconName | string;
  title?: string;
  alt?: string;
  className?: string;
  fallbackIndex?: number;
  /** Dark = charcoal/photo overlays. Light = white/cream cards (default). */
  surface?: "light" | "dark";
};

export function BrandIcon({
  name,
  title,
  alt = "",
  className,
  fallbackIndex,
  surface = "light",
}: BrandIconProps) {
  const resolved =
    resolveBrandIconName(name ?? "") ??
    resolveBrandIconName(title ?? "") ??
    (fallbackIndex != null
      ? (Object.keys(brandIconSrc)[fallbackIndex % Object.keys(brandIconSrc).length] as BrandIconName)
      : "construction");

  return (
    <span
      data-surface={surface}
      className={cn(
        "brand-icon relative inline-flex h-[170px] w-[170px] shrink-0 items-center justify-center overflow-hidden border-0 bg-transparent shadow-none outline-none",
        className,
      )}
    >
      {/* Native img: avoids next/image blend-mode bugs and always shows public icons */}
      <img
        src={getBrandIconSrc(resolved)}
        alt={alt}
        className="brand-icon__img h-full w-full border-0 object-contain"
      />
    </span>
  );
}
