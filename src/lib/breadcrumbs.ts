import { breadcrumbLabels } from "@/config/navigation";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/** Parent path for nested routes (e.g. division slugs → /divisions). */
const segmentParents: Record<string, string> = {
  construction: "/divisions",
  investment: "/divisions",
  consulting: "/divisions",
};

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildBreadcrumbs(
  pathname: string,
  currentLabel?: string,
): BreadcrumbItem[] {
  if (pathname === "/") return [];

  if (pathname.startsWith("/legal/")) {
    const page = pathname.split("/").pop();
    const label =
      page === "privacy"
        ? breadcrumbLabels.privacy
        : page === "terms"
          ? breadcrumbLabels.terms
          : formatSegment(page ?? "");

    return [
      { label: "Home", href: "/" },
      { label: breadcrumbLabels.legal },
      { label },
    ];
  }

  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let path = "";

  segments.forEach((segment, index) => {
    path += `/${segment}`;
    const isLast = index === segments.length - 1;
    const parentPath = segmentParents[segment];
    const labeledSegment = breadcrumbLabels[segment];

    const label = labeledSegment
      ?? (isLast ? (currentLabel ?? formatSegment(segment)) : formatSegment(segment));

    if (isLast) {
      items.push({ label });
      return;
    }

    items.push({
      label,
      href: labeledSegment ? path : parentPath ?? path,
    });
  });

  return items;
}
