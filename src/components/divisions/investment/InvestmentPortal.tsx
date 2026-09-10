import { BrandIcon } from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { investmentPage } from "@/content/investment-page";

export function InvestmentPortal() {
  const { portal } = investmentPage;

  return (
    <ScrollReveal>
      <div className="grid gap-6 border border-accent/25 bg-secondary p-6 text-neutral md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-8 md:p-8">
        <BrandIcon title="Client portal for tracking" className="division-mark" surface="dark" alt="" />
        <div>
          <p className="font-label text-[10px] text-accent">{portal.eyebrow}</p>
          <h2 className="mt-2 font-display text-2xl leading-snug sm:text-3xl">{portal.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral/70">{portal.description}</p>
        </div>
        <Button href={portal.href} className="shrink-0">
          {portal.hrefLabel}
        </Button>
      </div>
    </ScrollReveal>
  );
}
