import { certificateSection } from "@/content/homepage";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function CertificateSection() {
  return (
    <Section variant="muted" id="certificate">
      <SectionHeader
        eyebrow="Certificate"
        title={certificateSection.title}
        description={certificateSection.description}
        align="center"
        className="mx-auto"
      />

      <div className="mt-10">
        <CertificateGallery certificates={certificateSection.certificates} />
      </div>
    </Section>
  );
}
