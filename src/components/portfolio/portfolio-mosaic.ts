import type { Project, ProjectShowcaseLayout } from "@/types";

export type MosaicLayout = "hero" | "wide" | "standard";

export function sortProjectsForShowcase(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  });
}

export function getMosaicLayout(index: number, total: number): MosaicLayout {
  if (total <= 1) return "hero";
  if (total === 2) return index === 0 ? "hero" : "standard";
  if (total === 3) return index === 0 ? "hero" : "standard";

  const pattern = index % 6;
  if (pattern === 0) return "hero";
  if (pattern === 3) return "wide";
  return "standard";
}

export function resolveMosaicLayout(
  project: Project,
  index: number,
  total: number,
): MosaicLayout {
  const layout = project.showcaseLayout ?? "auto";
  if (layout !== "auto") return layout;
  return getMosaicLayout(index, total);
}

export function getMosaicGridClass(layout: MosaicLayout) {
  switch (layout) {
    case "hero":
      return "sm:col-span-2 lg:col-span-2 lg:row-span-2";
    case "wide":
      return "sm:col-span-2 lg:col-span-2";
    default:
      return "lg:col-span-1";
  }
}

export const showcaseLayoutOptions: {
  value: ProjectShowcaseLayout;
  label: string;
  hint: string;
}[] = [
  {
    value: "auto",
    label: "Automatic",
    hint: "Follow the mosaic pattern based on featured status and order",
  },
  {
    value: "hero",
    label: "Hero tile",
    hint: "Large 2×2 showcase tile on the portfolio page",
  },
  {
    value: "wide",
    label: "Wide tile",
    hint: "Spans two columns in the mosaic grid",
  },
  {
    value: "standard",
    label: "Standard tile",
    hint: "Regular single-column mosaic tile",
  },
];
