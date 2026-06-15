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
    <div className="relative bg-secondary">
      <div className="pointer-events-none absolute inset-0 bg-primary/5" />
      <Container className="relative py-4">
        <Breadcrumbs currentLabel={context?.label} variant="dark" />
      </Container>
    </div>
  );
}
