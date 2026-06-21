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

export async function getInsights(): Promise<InsightArticle[]> {
  try {
    await connectDB();
    const docs = await Insight.find({ status: "published" }).sort({ date: -1 }).lean();
    if (docs.length > 0) return docs.map(toInsightType);
  } catch {
    /* fallback */
  }
  return staticInsights;
}

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
    if (docs.length > 0) return docs.map((d) => d.slug);
  } catch {
    /* fallback */
  }
  return staticInsights.map((a) => a.slug);
}

export async function getFeaturedInsights(limit = 3): Promise<InsightArticle[]> {
  const all = await getInsights();
  return all.slice(0, limit);
}
