import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { revalidatePublicSite } from "@/lib/admin/revalidate-public";
import { connectDB } from "@/lib/db/connect";
import { PageSeo } from "@/lib/db/models";
import { STATIC_PAGES } from "@/lib/data/seo";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const docs = await PageSeo.find().lean();
    const byPath = new Map(docs.map((d) => [d.path, d]));

    const pages = STATIC_PAGES.map((page) => {
      const existing = byPath.get(page.path);
      return (
        existing ?? {
          path: page.path,
          label: page.label,
          metaTitle: "",
          metaDescription: "",
          ogImage: "",
          focusKeyword: "",
          noIndex: false,
        }
      );
    });

    return apiSuccess(pages);
  } catch {
    return apiError("Failed to fetch page SEO", 500);
  }
}

export async function PUT(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    await connectDB();

    const doc = await PageSeo.findOneAndUpdate(
      { path: body.path },
      {
        path: body.path,
        label: body.label,
        metaTitle: body.metaTitle ?? "",
        metaDescription: body.metaDescription ?? "",
        ogImage: body.ogImage ?? "",
        focusKeyword: body.focusKeyword ?? "",
        noIndex: body.noIndex ?? false,
        canonical: body.canonical ?? "",
      },
      { new: true, upsert: true, runValidators: true },
    ).lean();

    revalidatePublicSite();
    return apiSuccess(doc);
  } catch {
    return apiError("Failed to update page SEO", 500);
  }
}
