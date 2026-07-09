"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useBreadcrumbLabel } from "@/components/layout/BreadcrumbContext";
import { Container } from "@/components/ui/Container";

export function SiteBreadcrumbBar() {
  const pathname = usePathname();
  const context = useBreadcrumbLabel();

  if (pathname === "/") return null;

  return (
    <div className="pointer-events-none absolute top-36 right-0 left-0 z-40 sm:top-40">
      <Container className="pointer-events-auto flex justify-center py-2 md:justify-start">
        <Breadcrumbs currentLabel={context?.label} variant="hero" />
      </Container>
    </div>
  );
}
