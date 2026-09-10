import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { investmentPage } from "@/content/investment-page";

const GROUPS = [
  { label: "Banking partners", items: investmentPage.partners.banks },
  { label: "Payment rails", items: investmentPage.partners.payments },
  { label: "Legal partners", items: investmentPage.partners.legal },
] as const;

export function InvestmentPartners() {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Partner Institutions"
          title="The desks money actually moves through"
          description="Banking, digital payment, and legal counterparts we already work with on NRN and domestic files."
          align="center"
          compact
          className="mx-auto"
        />
      </ScrollReveal>
      <div className="grid gap-3 md:grid-cols-3">
        {GROUPS.map((group) => (
          <article key={group.label} className="flex h-full flex-col border border-neutral-border bg-neutral p-5">
            <p className="font-label text-[10px] text-accent">{group.label}</p>
            <ul className="mt-4 flex flex-1 flex-col justify-center gap-3">
              {group.items.map((item) => (
                <li key={item} className="font-display text-xl leading-snug text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
