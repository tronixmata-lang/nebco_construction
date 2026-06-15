import type { Metadata } from "next";
import { getSocialLinks, siteConfig } from "@/config/site";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import type { Division, InsightArticle, Project } from "@/types";

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? siteConfig.ogImage);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(publishedTime && type === "article"
        ? { publishedTime }
        : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.shortName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.siteLogo),
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    foundingDate: siteConfig.foundingDate,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    sameAs: getSocialLinks(),
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentOrganization,
    },
    areaServed: siteConfig.areaServed,
    knowsAbout: siteConfig.knowsAbout,
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    logo: absoluteUrl(siteConfig.siteLogo),
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: siteConfig.foundingDate,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    sameAs: getSocialLinks(),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: siteConfig.locale,
  };
}

export function breadcrumbSchema(pathname: string, currentLabel?: string) {
  const crumbs = buildBreadcrumbs(pathname, currentLabel);
  if (crumbs.length <= 1) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  };
}

export function articleSchema(article: InsightArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.siteLogo),
      },
    },
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
    articleSection: article.category,
    inLanguage: siteConfig.locale,
  };
}

export function projectImageAlt(project: Project): string {
  return `${project.title} — NEBCO ${project.category} construction project in ${project.location}, Nepal`;
}

export function serviceSchema(division: Division) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: division.name,
    description: division.description,
    serviceType: division.services,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    url: absoluteUrl(division.href),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: absoluteUrl(project.image),
    dateCreated: project.year,
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: absoluteUrl(`/portfolio/${project.slug}`),
  };
}

export function faqSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const contactFaq = [
  {
    question: "What services does NEBCO provide in Nepal?",
    answer:
      "NEBCO provides A-Class construction, infrastructure and real estate investment, and professional consulting including architectural design, structural engineering, and project management across Kathmandu and Nepal.",
  },
  {
    question: "Is NEBCO an A-Class construction company?",
    answer:
      "Yes. NEBCO (National Estate Builders Co. Pvt. Ltd.) holds an A-Class construction license and has operated since 1995 under the Shah Group.",
  },
  {
    question: "Does NEBCO work with NRN clients outside Nepal?",
    answer:
      "Yes. NEBCO supports Non-Resident Nepalis and international clients with residential, commercial, and investment projects in Nepal through transparent communication and professional project management.",
  },
  {
    question: "How can I contact NEBCO?",
    answer: `You can reach NEBCO at ${siteConfig.phone}, ${siteConfig.email}, or visit the office at ${siteConfig.address}. Business hours are ${siteConfig.businessHours}.`,
  },
] as const;
