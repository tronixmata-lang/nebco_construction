"use client";

import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { BreadcrumbProvider } from "@/components/layout/BreadcrumbContext";
import { SiteBreadcrumbBar } from "@/components/layout/SiteBreadcrumbBar";
import { Footer, type FooterSiteConfig } from "@/components/layout/Footer";
import { Header, type HeaderBranding } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { NebcoAssistance } from "@/components/assistant/NebcoAssistance";

type SiteShellProps = {
  children: React.ReactNode;
  footerSiteConfig: FooterSiteConfig;
  headerBranding: HeaderBranding;
};

export function SiteShell({ children, footerSiteConfig, headerBranding }: SiteShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <BreadcrumbProvider>
        <div className="relative flex min-h-screen flex-col">
          <Header variant="hero" branding={headerBranding} />
          <SiteBreadcrumbBar />
          <main className="flex-1">{children}</main>
          <Footer siteConfig={footerSiteConfig} />
          <ScrollToTop />
          <NebcoAssistance />
        </div>
      </BreadcrumbProvider>
    </SmoothScroll>
  );
}
