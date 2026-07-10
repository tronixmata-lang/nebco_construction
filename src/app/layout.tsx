import type { Metadata, Viewport } from "next";
import { Dancing_Script, Inter, Montserrat } from "next/font/google";
import { SiteShellWrapper } from "@/components/layout/SiteShellWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnalyticsScripts } from "@/components/seo/AnalyticsScripts";
import { brandColors, siteConfig as staticSiteConfig } from "@/config/site";
import { getSiteContent } from "@/lib/data/content";
import { getSeoSettings } from "@/lib/data/seo";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

// Decorative font used only in the chairman quote (below the fold) — one weight, no preload
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dancing-script",
  display: "swap",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const [seoSettings, { siteConfig: cms }] = await Promise.all([
    getSeoSettings(),
    getSiteContent(),
  ]);
  const description = seoSettings.defaultDescription || cms.description;
  const verification: Metadata["verification"] = {};
  if (seoSettings.googleSiteVerification) {
    verification.google = seoSettings.googleSiteVerification;
  }
  if (seoSettings.bingSiteVerification) {
    verification.other = { "msvalidate.01": seoSettings.bingSiteVerification };
  }

  return {
    metadataBase: new URL(cms.url),
    title: {
      default: cms.seoTitle,
      template: seoSettings.titleTemplate || `%s | ${cms.shortName}`,
    },
    description,
    keywords: seoSettings.keywords.length > 0 ? seoSettings.keywords : [
      "NEBCO",
      "NEBCO Construction",
      "construction company Nepal",
      "A-Class construction Nepal",
      "Kathmandu construction",
      "residential construction Nepal",
      "commercial construction Nepal",
      "infrastructure Nepal",
      "construction investment Nepal",
      "Shah Group",
      "NRN construction Nepal",
      "best construction company Nepal",
      "no 1 construction company Nepal",
    ],
    authors: [{ name: cms.legalName, url: cms.url }],
    creator: cms.legalName,
    publisher: cms.legalName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: staticSiteConfig.locale,
      url: cms.url,
      siteName: cms.name,
      title: cms.seoTitle,
      description,
      images: [
        {
          url: seoSettings.defaultOgImage || staticSiteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: cms.seoTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cms.seoTitle,
      description,
      images: [seoSettings.defaultOgImage || staticSiteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: cms.shortName,
    },
    verification,
  };
}

/** Public pages re-fetch CMS data from MongoDB at most every 60s (admin saves revalidate immediately). */
export const revalidate = 60;

export const viewport: Viewport = {
  themeColor: brandColors.primary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${dancingScript.variable}`}>
      <body className="flex min-h-screen flex-col">
        <AnalyticsScripts />
        <JsonLd
          data={[
            organizationSchema(),
            localBusinessSchema(),
            websiteSchema(),
          ]}
        />
        <SiteShellWrapper>{children}</SiteShellWrapper>
      </body>
    </html>
  );
}
