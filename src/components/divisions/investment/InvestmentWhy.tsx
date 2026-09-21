import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { investmentPage } from "@/content/investment-page";

export function InvestmentWhy() {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Why Invest in Nepal Now"
          title="The macro case, then the asset"
          description="Growth, remittances, reconstruction, and tourism are the backdrop. Every Your Company deal still starts with title, rent, and who builds it."
          align="center"
          dark
          compact
          className="mx-auto"
        />
      </ScrollReveal>
      <StaggerReveal className="grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3" staggerMs={80}>
        {investmentPage.reasons.map((reason, index) => (
          <article
            key={reason.title}
            className="group relative flex h-full flex-col overflow-hidden bg-neutral/[0.04] p-5"
          >
            <span
              className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100"
              aria-hidden="true"
            />
            <p className="font-label text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-display text-3xl text-neutral">{reason.stat}</p>
            <p className="font-label mt-1 text-[10px] text-neutral/45">{reason.statLabel}</p>
            <h3 className="mt-4 font-display text-xl leading-snug text-neutral">{reason.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral/70">{reason.description}</p>
          </article>
        ))}
      </StaggerReveal>
      <p className="mt-4 text-center text-xs text-neutral/50">
        Figures are indicative for discussion, not a forecast. Confirm current data with an advisor.
      </p>
    </div>
  );
}
