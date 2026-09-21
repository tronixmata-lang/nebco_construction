import type { MetadataRoute } from "next";
import { brandColors, siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seoTitle,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: brandColors.neutral,
    theme_color: brandColors.primary,
    icons: [],
  };
}
