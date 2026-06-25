import { CmsImage } from "@/components/ui/CmsImage";
import { getHeroBlurDataURL } from "@/lib/hero-images";
import { cn } from "@/lib/utils";

type HeroBackgroundImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function HeroBackgroundImage({ src, alt, className }: HeroBackgroundImageProps) {
  return (
    <CmsImage
      src={src}
      alt={alt}
      fill
      priority
      fetchPriority="high"
      quality={80}
      placeholder="blur"
      blurDataURL={getHeroBlurDataURL(src)}
      sizes="100vw"
      className={cn("object-cover object-center", className)}
    />
  );
}
