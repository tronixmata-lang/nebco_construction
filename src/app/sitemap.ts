import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { STATIC_PAGES } from "@/lib/data/seo";
import { getAllProjectsForSitemap } from "@/lib/data/projects-seo";
import { getAllInsightsForSitemap } from "@/lib/data/insights-seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const [projects, insights] = await Promise.all([
    getAllProjectsForSitemap(),
    getAllInsightsForSitemap(),
  ]);

  const staticPages = STATIC_PAGES.map((page) => ({
    url: page.path === "/" ? baseUrl : `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.path === "/" ? 1 : 0.8,
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insightPages = insights.map((article) => ({
    url: `${baseUrl}/insights/${article.slug}`,
    lastModified: article.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...insightPages];
}
