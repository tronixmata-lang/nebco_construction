import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Terms of Use"
        description="The terms and conditions governing your use of the NEBCO website and services."
        showStats={false}
      />
      <Section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl prose prose-lg text-text-muted">
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
      </Section>
    </>
  );
}
