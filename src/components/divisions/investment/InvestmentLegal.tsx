import { BrandIcon } from "@/components/ui/BrandIcon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { investmentPage } from "@/content/investment-page";

export function InvestmentLegal() {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Legal & Compliance"
          title="The paperwork that makes the asset real"
          description="NRN and NRB files, repatriation, PoA, and tax — sequenced before capital leaves your account."
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
          {investmentPage.legal.map((item, index) => (
            <article key={item.title} className="group relative flex h-full flex-col gap-3 py-5 pl-5 pr-4 sm:px-6">
              <span
                className="absolute inset-y-5 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-2xl leading-none text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <BrandIcon title={item.title} fallbackIndex={index} className="division-mark shrink-0" alt="" />
              </div>
              <h3 className="font-display text-xl leading-snug text-secondary">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{item.description}</p>
            </article>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
}
