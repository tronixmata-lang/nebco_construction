import { revalidatePath } from "next/cache";

/** Bust ISR/static cache for all public pages after admin content changes. */
export function revalidatePublicSite(): void {
  revalidatePath("/", "layout");
  revalidatePath("/leadership", "page");
  revalidatePath("/leadership/[slug]", "page");
  revalidatePath("/leadership/[slug]/[articleSlug]", "page");
  revalidatePath("/about", "page");
  revalidatePath("/sectors", "page");
  revalidatePath("/sectors/[slug]", "page");
  revalidatePath("/portfolio", "page");
  revalidatePath("/portfolio/[slug]", "page");
  revalidatePath("/insights", "page");
  revalidatePath("/insights/[slug]", "page");
  revalidatePath("/divisions", "page");
  revalidatePath("/divisions/[slug]", "page");
  revalidatePath("/", "page");
  revalidatePath("/about", "page");
  revalidatePath("/contact", "page");
  revalidatePath("/legal/privacy", "page");
  revalidatePath("/legal/terms", "page");
}
