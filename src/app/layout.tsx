import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { BreadcrumbProvider } from "@/components/layout/BreadcrumbContext";
import { SiteBreadcrumbBar } from "@/components/layout/SiteBreadcrumbBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { brandColors, siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "NEBCO",
    "construction",
    "investment",
    "consulting",
    "infrastructure",
    "Nepal",
  ],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.shortName,
  },
};

export const viewport: Viewport = {
  themeColor: brandColors.primary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <BreadcrumbProvider>
          <Header />
          <SiteBreadcrumbBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </BreadcrumbProvider>
      </body>
    </html>
  );
}
