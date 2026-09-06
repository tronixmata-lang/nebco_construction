import { getCertificates, getSiteContent } from "@/lib/data/content";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function CertificateSection() {
  const { certificateSection, homepageSections } = await getSiteContent();
  const certificates = await getCertificates();

  return (
    <Section variant="default" id="certificate" className="relative z-10 py-8 md:py-12" glow="none">
      <SectionHeader
        eyebrow={homepageSections.certificates.eyebrow}
        title={certificateSection.title}
        description={certificateSection.description}
        align="center"
        className="mx-auto mb-8 md:mb-10"
      />
      <div className="mt-0">
        <CertificateGallery certificates={certificates} />
      </div>
    </Section>
  );
}
