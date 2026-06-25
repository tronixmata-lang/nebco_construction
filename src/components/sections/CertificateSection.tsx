import { getCertificates, getSiteContent } from "@/lib/data/content";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function CertificateSection() {
  const { certificateSection } = await getSiteContent();
  const certificates = await getCertificates();

  return (
    <Section variant="default" id="certificate" className="relative z-10" glow="none">
      <SectionHeader
        eyebrow="Certificate"
        title={certificateSection.title}
        description={certificateSection.description}
        align="center"
        className="mx-auto"
      />
      <div className="mt-10">
        <CertificateGallery certificates={certificates} />
      </div>
    </Section>
  );
}
