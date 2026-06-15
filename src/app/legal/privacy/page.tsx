import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how NEBCO Construction collects, uses, and protects your personal information.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/legal/privacy")} />
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        description="How NEBCO collects, uses, and protects your personal information."
        showStats={false}
      />
      <Section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl prose prose-lg text-text-muted">
          <p>Last updated: June 2025</p>
          <h2>Information We Collect</h2>
          <p>
            NEBCO Construction collects information you provide through our
            contact forms, including your name, email address, phone number,
            organization, and message content.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            We use the information collected to respond to your inquiries,
            provide our services, and improve our website experience. We do not
            sell or share your personal information with third parties for
            marketing purposes.
          </p>
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, or destruction.
          </p>
          <h2>Contact</h2>
          <p>
            For questions about this privacy policy, please contact us through
            our contact page.
          </p>
        </div>
      </Section>
    </>
  );
}
