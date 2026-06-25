import { connectDB } from "@/lib/db/connect";
import { Project } from "@/lib/db/models";
import { projects as staticProjects, getProjectBySlug as staticGetBySlug } from "@/content/projects";
import type { Project as ProjectType } from "@/types";

function toProjectType(doc: {
  _id: { toString(): string };
  slug: string;
  title: string;
  category: ProjectType["category"];
  location: string;
  year: string;
  description: string;
  image: string;
  images?: string[];
  featured?: boolean;
  sortOrder?: number;
  showcaseLayout?: ProjectType["showcaseLayout"];
  viewCount?: number;
  legacyId?: string;
}): ProjectType {
  return {
    id: doc.legacyId ?? doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    location: doc.location,
    year: doc.year,
    description: doc.description,
    image: doc.image,
    images: doc.images,
    featured: doc.featured,
    sortOrder: doc.sortOrder,
    showcaseLayout: doc.showcaseLayout ?? "auto",
    viewCount: doc.viewCount ?? 0,
  };
}

export async function getProjects(): Promise<ProjectType[]> {
  try {
    await connectDB();
    const docs = await Project.find({ published: true })
      .sort({ featured: -1, sortOrder: 1 })
      .lean();
    if (docs.length > 0) return docs.map(toProjectType);
  } catch {
    /* fallback */
  }
  return staticProjects;
}

export async function getFeaturedProjects(limit = 4): Promise<ProjectType[]> {
  try {
    await connectDB();
    const featured = await Project.find({ published: true, featured: true })
      .sort({ sortOrder: 1 })
      .limit(limit)
      .lean();
    if (featured.length > 0) return featured.map(toProjectType);

    const docs = await Project.find({ published: true }).sort({ sortOrder: 1 }).limit(limit).lean();
    if (docs.length > 0) return docs.map(toProjectType);
  } catch {
    /* fallback */
  }
  return staticProjects.slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | undefined> {
  try {
    await connectDB();
    const doc = await Project.findOne({ slug, published: true }).lean();
    if (doc) return toProjectType(doc);
  } catch {
    /* fallback */
  }
  return staticGetBySlug(slug);
}

export async function getMostViewedProjects(
  limit = 5,
  excludeSlug?: string,
): Promise<ProjectType[]> {
  try {
    await connectDB();
    const query: Record<string, unknown> = { published: true };
    if (excludeSlug) query.slug = { $ne: excludeSlug };

    const docs = await Project.find(query)
      .sort({ viewCount: -1, featured: -1, sortOrder: 1 })
      .limit(limit)
      .lean();

    if (docs.length > 0) return docs.map(toProjectType);
  } catch {
    /* fallback */
  }

  const pool = staticProjects.filter((project) => project.slug !== excludeSlug);
  return pool.slice(0, limit);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    await connectDB();
    const docs = await Project.find({ published: true }).select("slug").lean();
    if (docs.length > 0) return docs.map((d) => d.slug);
  } catch {
    /* fallback */
  }
  return staticProjects.map((p) => p.slug);
}
