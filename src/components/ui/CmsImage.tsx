import Image, { type ImageProps } from "next/image";
import { isAdminUploadSrc, normalizeMediaSrc } from "@/lib/media-url";

type CmsImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Renders CMS images. Admin uploads use unoptimized loading so they work
 * immediately in production without a rebuild or image-optimizer cache issues.
 */
export function CmsImage({ src, alt, ...props }: CmsImageProps) {
  const normalized = normalizeMediaSrc(src);
  if (!normalized) return null;

  return (
    <Image
      {...props}
      src={normalized}
      alt={alt}
      unoptimized={isAdminUploadSrc(normalized)}
    />
  );
}
