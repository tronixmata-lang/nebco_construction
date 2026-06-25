import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Certificate } from "@/types";

type AboutCredentialsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  certificates: Certificate[];
};

export function AboutCredentialsSection({
  eyebrow,
  title,
  description,
  certificates,
}: AboutCredentialsSectionProps) {
  return (
    <Section variant="default" className="py-14 md:py-20" glow="primary">
      <ScrollReveal>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mx-auto"
        />
      </ScrollReveal>

      <ScrollReveal delay={90}>
        <div className="about-credentials-frame mx-auto mt-12 max-w-6xl rounded-sm border border-accent/25 bg-neutral-muted/40 p-5 sm:p-8">
          <CertificateGallery certificates={certificates} />
        </div>
      </ScrollReveal>
    </Section>
  );
}
