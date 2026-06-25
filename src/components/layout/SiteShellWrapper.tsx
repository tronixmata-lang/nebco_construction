import { getSiteContent } from "@/lib/data/content";
import { SiteShell } from "@/components/layout/SiteShell";

export async function SiteShellWrapper({ children }: { children: React.ReactNode }) {
  const { siteConfig } = await getSiteContent();

  return (
    <SiteShell
      footerSiteConfig={siteConfig}
      headerBranding={{ logo: siteConfig.logo ?? "", name: siteConfig.name }}
    >
      {children}
    </SiteShell>
  );
}
