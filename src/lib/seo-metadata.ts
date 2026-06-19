import type { Metadata } from "next";
import { getPageSeoByPath, getSeoSettings, resolveSeoFields } from "@/lib/data/seo";
import { createPageMetadata } from "@/lib/seo";

export async function createStaticPageMetadata(
  path: string,
  defaults: { title: string; description: string; image?: string; absoluteTitle?: boolean },
): Promise<Metadata> {
  const [pageSeo, settings] = await Promise.all([
    getPageSeoByPath(path),
    getSeoSettings(),
  ]);
  const seoFields =
    pageSeo && "metaTitle" in pageSeo
      ? {
          metaTitle: pageSeo.metaTitle,
          metaDescription: pageSeo.metaDescription,
          ogImage: pageSeo.ogImage,
          focusKeyword: pageSeo.focusKeyword,
          noIndex: pageSeo.noIndex,
          canonical: pageSeo.canonical,
        }
      : undefined;
  const resolved = resolveSeoFields(
    { title: defaults.title, description: defaults.description, image: defaults.image, path },
    seoFields,
    { defaultOgImage: settings.defaultOgImage },
  );
  return createPageMetadata({
    title: resolved.title,
    description: resolved.description,
    path,
    image: resolved.ogImage,
    noIndex: resolved.noIndex,
    canonical: resolved.canonical,
    absoluteTitle: defaults.absoluteTitle,
  });
}
