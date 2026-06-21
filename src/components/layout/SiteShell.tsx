"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbProvider } from "@/components/layout/BreadcrumbContext";
import { SiteBreadcrumbBar } from "@/components/layout/SiteBreadcrumbBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <BreadcrumbProvider>
      <div className="relative flex min-h-screen flex-col">
        <Header variant="hero" />
        <SiteBreadcrumbBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </BreadcrumbProvider>
  );
}
