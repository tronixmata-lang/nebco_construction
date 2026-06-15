import type { MetadataRoute } from "next";
import { sitePageIndex } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { insights } from "@/content/insights";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = sitePageIndex.map((page) => ({
    url: page.href === "/" ? baseUrl : `${baseUrl}${page.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.href === "/" ? 1 : 0.8,
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insightPages = insights.map((article) => ({
    url: `${baseUrl}/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...insightPages];
}
