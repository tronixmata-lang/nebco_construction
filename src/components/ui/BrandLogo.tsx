import { CmsImage } from "@/components/ui/CmsImage";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  src?: string | null;
  alt?: string;
  className?: string;
  imageClassName?: string;
  placeholderClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
};

/** Shows the company logo, or a "Your logo" placeholder for white-label templates. */
export function BrandLogo({
  src,
  alt = "Your logo",
  className,
  imageClassName,
  placeholderClassName,
  width = 160,
  height = 64,
  priority,
  fill,
  sizes,
}: BrandLogoProps) {
  const hasLogo = Boolean(src?.trim());

  if (hasLogo && fill) {
    return (
      <div className={cn("relative", className)}>
        <CmsImage
          src={src!}
          alt={alt}
          fill
          className={cn("object-contain", imageClassName)}
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  if (hasLogo) {
    return (
      <CmsImage
        src={src!}
        alt={alt}
        width={width}
        height={height}
        className={cn(imageClassName, className)}
        priority={priority}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center border border-dashed border-current/30 bg-current/5 px-3 py-2",
        className,
        placeholderClassName,
      )}
      role="img"
      aria-label="Your logo"
    >
      <span className="font-label text-[10px] tracking-[0.14em] uppercase opacity-70">
        Your logo
      </span>
    </div>
  );
}
