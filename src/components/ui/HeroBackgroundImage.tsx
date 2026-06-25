import Image from "next/image";
import { getHeroBlurDataURL } from "@/lib/hero-images";
import { cn } from "@/lib/utils";

type HeroBackgroundImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function HeroBackgroundImage({ src, alt, className }: HeroBackgroundImageProps) {
  return (
    <Image
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
