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
  };
}

export async function getProjects(): Promise<ProjectType[]> {
  try {
    await connectDB();
    const docs = await Project.find({ published: true }).sort({ sortOrder: 1 }).lean();
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
