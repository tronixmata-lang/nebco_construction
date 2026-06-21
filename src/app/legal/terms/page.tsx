import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContentCard } from "@/components/ui/ContentCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { pageHeroImages } from "@/config/page-images";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description:
    "Terms and conditions governing your use of the NEBCO Construction website and services.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/legal/terms")} />
      <PageIntro
        eyebrow="Legal"
        title="Terms of Use"
        description="The terms and conditions governing your use of the NEBCO website and services."
        showStats={false}
        backgroundImage={pageHeroImages.legal}
        backgroundAlt="NEBCO terms of use"
      />
      <Section className="pt-10 md:pt-14" glow="primary">
        <ScrollReveal>
          <ContentCard hover={false} className="mx-auto max-w-3xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-text-muted">
              <p>Last updated: June 2025</p>
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using the NEBCO Construction website, you accept and
                agree to be bound by these Terms of Use. If you do not agree, please
                do not use this website.
              </p>
              <h2>Use of Website</h2>
              <p>
                This website is provided for informational purposes about NEBCO&apos;s
                construction, investment, and consulting services. Content may not be
                reproduced without prior written consent.
              </p>
              <h2>Limitation of Liability</h2>
              <p>
                NEBCO Construction makes reasonable efforts to ensure accuracy but does
                not warrant that all information is complete or current. NEBCO shall not
                be liable for damages arising from use of this website.
              </p>
              <h2>Contact</h2>
              <p>
                For questions about these terms, please contact us through our contact
                page.
              </p>
            </div>
          </ContentCard>
        </ScrollReveal>
      </Section>
      <CtaBanner />
    </>
  );
}
