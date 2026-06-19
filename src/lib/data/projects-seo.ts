import { connectDB } from "@/lib/db/connect";
import { Project as ProjectModel } from "@/lib/db/models";
import { getProjectBySlug as staticGetBySlug } from "@/content/projects";
import type { Project as ProjectType, SeoFields } from "@/types";

export type ProjectWithSeo = ProjectType & { seo?: SeoFields };

function mapProject(doc: {
  _id: { toString(): string };
  slug: string;
  title: string;
  category: ProjectType["category"];
  location: string;
  year: string;
  description: string;
  image: string;
  legacyId?: string;
  seo?: SeoFields;
}): ProjectWithSeo {
  return {
    id: doc.legacyId ?? doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    location: doc.location,
    year: doc.year,
    description: doc.description,
    image: doc.image,
    seo: doc.seo ?? undefined,
  };
}

export async function getProjectWithSeo(slug: string): Promise<ProjectWithSeo | undefined> {
  try {
    await connectDB();
    const doc = await ProjectModel.findOne({ slug, published: true }).lean();
    if (doc) return mapProject(doc);
  } catch {
    /* fallback */
  }
  const staticProject = staticGetBySlug(slug);
  return staticProject ? { ...staticProject, seo: undefined } : undefined;
}

export async function getAllProjectsForSitemap() {
  try {
    await connectDB();
    const docs = await ProjectModel.find({ published: true, "seo.noIndex": { $ne: true } })
      .select("slug updatedAt seo")
      .lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        slug: d.slug,
        lastModified: d.updatedAt,
      }));
    }
  } catch {
    /* fallback */
  }
  const { projects } = await import("@/content/projects");
  return projects.map((p) => ({ slug: p.slug, lastModified: new Date() }));
}
