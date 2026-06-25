import { revalidatePath } from "next/cache";

/** Bust ISR/static cache for all public pages after admin content changes. */
export function revalidatePublicSite(): void {
  revalidatePath("/", "layout");
}
