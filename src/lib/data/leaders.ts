import {
  getLeaderArticle as getStaticLeaderArticle,
  getLeaderProfileById as getStaticLeaderProfileById,
  leaderProfiles as staticLeaderProfiles,
  leaders as staticLeaders,
} from "@/content/leadership";
import { mergeKeys } from "@/lib/data/merge-with-static";
import { connectDB } from "@/lib/db/connect";
import { Leader as LeaderModel, type LeaderDocument } from "@/lib/db/models/Leader";
import type { Leader, LeaderArticle, LeaderProfile } from "@/types";

function mapLeaderBase(doc: Pick<
  LeaderDocument,
  "legacyId" | "name" | "role" | "bio" | "image" | "linkedin" | "facebook" | "email"
>): Leader {
  return {
    id: doc.legacyId,
    name: doc.name,
    role: doc.role,
    bio: doc.bio,
    image: doc.image,
    linkedin: doc.linkedin,
    facebook: doc.facebook,
    email: doc.email,
  };
}

function mapLeaderArticles(articles: LeaderDocument["articles"]): LeaderArticle[] {
  return (articles ?? []).map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: article.body ?? [],
    category: article.category,
    date: article.date,
    readTime: article.readTime,
    image: article.image,
  }));
}

function mergeProfile(base: Leader, doc?: LeaderDocument | null): LeaderProfile | undefined {
  const staticProfile = staticLeaderProfiles[base.id];

  if (doc) {
    const dbMessageBody = doc.messageBody ?? [];
    const dbArticles = mapLeaderArticles(doc.articles);
    const hasDbMessage = Boolean(doc.messageQuote?.trim()) || dbMessageBody.length > 0;
    const hasDbArticles = dbArticles.length > 0;

    return {
      ...base,
      message: {
        quote: hasDbMessage ? (doc.messageQuote ?? "") : (staticProfile?.message.quote ?? ""),
        body: hasDbMessage ? dbMessageBody : (staticProfile?.message.body ?? []),
      },
      articles: hasDbArticles ? dbArticles : (staticProfile?.articles ?? []),
    };
  }

  if (!staticProfile) return undefined;

  return {
    ...base,
    message: staticProfile.message,
    articles: staticProfile.articles,
  };
}

export async function getAllLeaderIds(): Promise<string[]> {
  try {
    await connectDB();
    const docs = await LeaderModel.find({ published: true }).sort({ sortOrder: 1 }).lean();
    if (docs.length > 0) {
      return mergeKeys(
        docs.map((doc) => doc.legacyId),
        staticLeaders.map((leader) => leader.id),
      );
    }
  } catch {
    /* fallback */
  }
  return staticLeaders.map((leader) => leader.id);
}

export async function getLeaderProfileById(id: string): Promise<LeaderProfile | undefined> {
  try {
    await connectDB();
    const doc = await LeaderModel.findOne({ legacyId: id, published: true }).lean();
    if (doc) {
      return mergeProfile(mapLeaderBase(doc), doc);
    }
  } catch {
    /* fallback */
  }
  return getStaticLeaderProfileById(id);
}

export async function getLeaderArticle(leaderId: string, articleSlug: string) {
  try {
    await connectDB();
    const doc = await LeaderModel.findOne({ legacyId: leaderId, published: true }).lean();
    if (doc) {
      const profile = mergeProfile(mapLeaderBase(doc), doc);
      if (!profile) return undefined;
      const article = profile.articles.find((item) => item.slug === articleSlug);
      if (!article) return undefined;
      return { leader: profile, article };
    }
  } catch {
    /* fallback */
  }
  return getStaticLeaderArticle(leaderId, articleSlug);
}

export async function getLeaderStaticParams(): Promise<{ slug: string; articleSlug: string }[]> {
  const ids = await getAllLeaderIds();
  const params: { slug: string; articleSlug: string }[] = [];

  for (const id of ids) {
    const profile = await getLeaderProfileById(id);
    if (!profile) continue;
    for (const article of profile.articles) {
      params.push({ slug: id, articleSlug: article.slug });
    }
  }

  return params;
}
