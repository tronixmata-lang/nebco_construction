import type { Metadata } from "next";
import { BusinessDivisions } from "@/components/sections/BusinessDivisions";
import { CertificateSection } from "@/components/sections/CertificateSection";
import { CompanyOverview } from "@/components/sections/CompanyOverview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HeroSection } from "@/components/sections/HeroSection";
import { PageBodyLead } from "@/components/layout/PageBodyLead";
import { IndustrySectors } from "@/components/sections/IndustrySectors";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/config/site";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { faqSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/", {
    title: siteConfig.seoTitle,
    description: `${siteConfig.description} Explore residential, commercial, and infrastructure projects, our verticals, and trusted credentials.`,
    absoluteTitle: true,
  });
}

const homeFaq = [
  {
    question: "Who is Your Construction Company?",
    answer:
      "Your Company (Your Company Pvt. Ltd.) is an A-Class construction company in Kathmandu, Nepal, established in 1995 and operating under the Your Group.",
  },
  {
    question: "What types of projects does Your Company build?",
    answer:
      "Your Company delivers residential homes, commercial buildings, infrastructure projects, and real estate investment developments across Nepal.",
  },
  {
    question: "Why choose Your Company for construction in Nepal?",
    answer:
      "Your Company combines 30+ years of experience, A-Class licensing, transparent project management, and integrated construction, investment, and consulting services.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema([...homeFaq])} />
      <HeroSection />
      <PageBodyLead />
      <BusinessDivisions />
      <CertificateSection />
      <ScrollReveal delay={50}>
        <CompanyOverview />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <ValuePillars className="pt-6 pb-6 md:pt-8 md:pb-8" />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <FeaturedProjects />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <IndustrySectors className="pt-6 pb-6 md:pt-8 md:pb-8" />
      </ScrollReveal>
      <TestimonialsSection />
      <ScrollReveal delay={50}>
        <InsightsPreview />
      </ScrollReveal>
    </>
  );
}

