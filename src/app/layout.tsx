import type { Metadata, Viewport } from "next";
import { Dancing_Script, Inter, Montserrat } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnalyticsScripts } from "@/components/seo/AnalyticsScripts";
import { brandColors, siteConfig } from "@/config/site";
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

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await getSeoSettings();
  const verification: Metadata["verification"] = {};
  if (seoSettings.googleSiteVerification) {
    verification.google = seoSettings.googleSiteVerification;
  }
  if (seoSettings.bingSiteVerification) {
    verification.other = { "msvalidate.01": seoSettings.bingSiteVerification };
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.seoTitle,
      template: seoSettings.titleTemplate || `%s | ${siteConfig.shortName}`,
    },
    description: seoSettings.defaultDescription || siteConfig.description,
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
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
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
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.seoTitle,
      description: seoSettings.defaultDescription || siteConfig.description,
      images: [
        {
          url: seoSettings.defaultOgImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.seoTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.seoTitle,
      description: seoSettings.defaultDescription || siteConfig.description,
      images: [seoSettings.defaultOgImage || siteConfig.ogImage],
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
      title: siteConfig.shortName,
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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
