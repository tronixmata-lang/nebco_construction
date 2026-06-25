"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const updateOffset = () => {
      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = (elementCenter - viewportCenter) / window.innerHeight;
      setOffset(distance * 18);
    };

    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
        className={cn(
          "object-cover transition-transform duration-100 ease-out will-change-transform",
          imageClassName,
        )}
        style={{ transform: `translateY(${offset}px) scale(1.08)` }}
      />
    </div>
  );
}
