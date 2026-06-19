import type { Metadata } from "next";
import { BusinessDivisions } from "@/components/sections/BusinessDivisions";
import { CertificateSection } from "@/components/sections/CertificateSection";
import { CompanyOverview } from "@/components/sections/CompanyOverview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustrySectors } from "@/components/sections/IndustrySectors";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { LeadershipMessage } from "@/components/sections/LeadershipMessage";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { faqSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/", {
    title: siteConfig.seoTitle,
    description: `${siteConfig.description} Explore residential, commercial, and infrastructure projects, business divisions, and trusted credentials.`,
    absoluteTitle: true,
  });
}

const homeFaq = [
  {
    question: "Who is NEBCO Construction?",
    answer:
      "NEBCO (National Estate Builders Co. Pvt. Ltd.) is an A-Class construction company in Kathmandu, Nepal, established in 1995 and operating under the Shah Group.",
  },
  {
    question: "What types of projects does NEBCO build?",
    answer:
      "NEBCO delivers residential homes, commercial buildings, infrastructure projects, and real estate investment developments across Nepal.",
  },
  {
    question: "Why choose NEBCO for construction in Nepal?",
    answer:
      "NEBCO combines 30+ years of experience, A-Class licensing, transparent project management, and integrated construction, investment, and consulting services.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema([...homeFaq])} />
      <HeroSection />
      <CompanyOverview />
      <CertificateSection />
      <BusinessDivisions />
      <ValuePillars />
      <FeaturedProjects />
      <IndustrySectors />
      <LeadershipMessage />
      <TestimonialsSection />
      <InsightsPreview />
    </>
  );
}
