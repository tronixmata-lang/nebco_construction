import { BrandIcon } from "@/components/ui/BrandIcon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { constructionPage } from "@/content/construction-page";

type ServiceItem = { title: string; description: string };

type ConstructionServicesProps = {
  services?: ServiceItem[];
};

export function ConstructionServices({ services }: ConstructionServicesProps) {
  const items = services?.length ? services : constructionPage.services;
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="What We Build"
          title="Construction services, clearly scoped"
          description="Six delivery lines, from private homes to civil works, each run with the same A-Class site standard."
          align="center"
          compact
          className="mx-auto"
        />
      </ScrollReveal>

      <div className="border-b border-neutral-border">
        <StaggerReveal
          className="grid auto-rows-fr [&>*]:border-t [&>*]:border-neutral-border sm:grid-cols-2 sm:[&>*:nth-child(odd)]:border-r"
          staggerMs={70}
        >
          {items.map((service, index) => (
            <article
              key={service.title}
              className="group relative flex h-full items-start gap-4 py-5 pl-5 pr-1 sm:px-6"
            >
              <span
                className="absolute inset-y-5 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="font-display w-10 shrink-0 text-2xl leading-none text-accent sm:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl leading-snug text-secondary transition-colors group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{service.description}</p>
              </div>
              <BrandIcon title={service.title} fallbackIndex={index} className="division-mark shrink-0" alt="" />
            </article>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
}
