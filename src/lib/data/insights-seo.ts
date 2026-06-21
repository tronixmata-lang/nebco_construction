import { connectDB } from "@/lib/db/connect";
import { Insight as InsightModel } from "@/lib/db/models";
import { getInsightBySlug as staticGetBySlug } from "@/content/insights";
import type { InsightArticle, SeoFields } from "@/types";

export type InsightWithSeo = InsightArticle & { seo?: SeoFields };

function mapInsight(doc: {
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
  seo?: SeoFields;
}): InsightWithSeo {
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
    seo: doc.seo ?? undefined,
  };
}

export async function getInsightWithSeo(slug: string): Promise<InsightWithSeo | undefined> {
  try {
    await connectDB();
    const doc = await InsightModel.findOne({ slug, status: "published" }).lean();
    if (doc) return mapInsight(doc);
  } catch {
    /* fallback */
  }
  const staticArticle = staticGetBySlug(slug);
  return staticArticle ? { ...staticArticle, seo: undefined } : undefined;
}

export async function getAllInsightsForSitemap() {
  try {
    await connectDB();
    const docs = await InsightModel.find({ status: "published", "seo.noIndex": { $ne: true } })
      .select("slug date updatedAt")
      .lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        slug: d.slug,
        lastModified: new Date(d.date),
      }));
    }
  } catch {
    /* fallback */
  }
  const { insights } = await import("@/content/insights");
  return insights.map((a) => ({ slug: a.slug, lastModified: new Date(a.date) }));
}
