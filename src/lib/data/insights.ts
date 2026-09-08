import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import { Insight } from "@/lib/db/models";
import { insights as staticInsights, getInsightBySlug as staticGetBySlug } from "@/content/insights";
import type { InsightArticle } from "@/types";

function toInsightType(doc: {
  _id: { toString(): string };
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  date: string;
  readTime: string;
  image?: string;
  legacyId?: string;
}): InsightArticle {
  return {
    id: doc.legacyId ?? doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    body: doc.body,
    category: doc.category,
    date: doc.date,
    readTime: doc.readTime,
    image: doc.image,
  };
}

function withMissingStatic(articles: InsightArticle[]): InsightArticle[] {
  const have = new Set(articles.map((article) => article.slug));
  const missing = staticInsights.filter((article) => !have.has(article.slug));
  if (missing.length === 0) return articles;
  return [...articles, ...missing].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getInsights = cache(async (): Promise<InsightArticle[]> => {
  try {
    await connectDB();
    const docs = await Insight.find({ status: "published" }).sort({ date: -1 }).lean();
    if (docs.length > 0) {
      return withMissingStatic(docs.map(toInsightType));
    }
  } catch {
    /* fallback */
  }
  return staticInsights;
});

export async function getInsightBySlug(slug: string): Promise<InsightArticle | undefined> {
  try {
    await connectDB();
    const doc = await Insight.findOne({ slug, status: "published" }).lean();
    if (doc) return toInsightType(doc);
  } catch {
    /* fallback */
  }
  return staticGetBySlug(slug);
}

export async function getAllInsightSlugs(): Promise<string[]> {
  try {
    await connectDB();
    const docs = await Insight.find({ status: "published" }).select("slug").lean();
    if (docs.length > 0) {
      return [...new Set([...docs.map((d) => d.slug), ...staticInsights.map((a) => a.slug)])];
    }
  } catch {
    /* fallback */
  }
  return staticInsights.map((a) => a.slug);
}

export async function getFeaturedInsights(limit = 3): Promise<InsightArticle[]> {
  const all = await getInsights();
  return all.slice(0, limit);
}
