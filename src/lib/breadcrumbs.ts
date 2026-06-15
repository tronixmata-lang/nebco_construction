import { breadcrumbLabels } from "@/config/navigation";

export type BreadcrumbItem = {
  label: string;
  href?: string;
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

  if (pathname === "/legal/privacy") {
    return [
      { label: "Home", href: "/" },
      { label: breadcrumbLabels.privacy },
    ];
  }

  if (pathname === "/legal/terms") {
    return [
      { label: "Home", href: "/" },
      { label: breadcrumbLabels.terms },
    ];
  }

  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let path = "";

  segments.forEach((segment, index) => {
    path += `/${segment}`;
    const isLast = index === segments.length - 1;

    const label =
      breadcrumbLabels[segment] ??
      (isLast ? (currentLabel ?? formatSegment(segment)) : formatSegment(segment));

    items.push({
      label,
      href: isLast ? undefined : path,
    });
  });

  return items;
}
