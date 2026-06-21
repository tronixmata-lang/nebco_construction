import { SetBreadcrumbLabel } from "@/components/layout/BreadcrumbContext";
import { PageBodyLead } from "@/components/layout/PageBodyLead";
import { PageHeader } from "@/components/ui/PageHeader";

type PageIntroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbLabel?: string;
  showStats?: boolean;
  backgroundImage?: string;
  backgroundAlt?: string;
};

export async function PageIntro({
  title,
  description,
  eyebrow,
  breadcrumbLabel,
  showStats = true,
  backgroundImage,
  backgroundAlt,
}: PageIntroProps) {
  return (
    <>
      <SetBreadcrumbLabel label={breadcrumbLabel} />
      <PageHeader
        title={title}
        description={description}
        eyebrow={eyebrow}
        backgroundImage={backgroundImage}
        backgroundAlt={backgroundAlt}
      />
      <PageBodyLead showStats={showStats} />
    </>
  );
}
