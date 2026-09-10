import { BrandIcon } from "@/components/ui/BrandIcon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { investmentPage } from "@/content/investment-page";

type ProductItem = { title: string; description: string };

type InvestmentProductsProps = {
  products?: ProductItem[];
};

export function InvestmentProducts({ products }: InvestmentProductsProps) {
  const items = products?.length ? products : investmentPage.products;
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Investment Products"
          title="Six ways to put capital to work"
          description="From apartments you can rent this year to land you hold for later — each product is titled, built or acquired, and reported through NEBCO."
          align="center"
          compact
          className="mx-auto"
        />
      </ScrollReveal>
      <StaggerReveal className="grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3" staggerMs={70}>
        {items.map((product, index) => (
          <article
            key={product.title}
            className="group relative flex h-full flex-col overflow-hidden border border-neutral-border bg-neutral p-5"
          >
            <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden="true" />
            <div className="flex items-start justify-between gap-3">
              <span className="font-label text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span>
              <BrandIcon title={product.title} fallbackIndex={index} className="division-mark" alt="" />
            </div>
            <h3 className="mt-3 font-display text-xl leading-snug text-secondary">{product.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{product.description}</p>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
