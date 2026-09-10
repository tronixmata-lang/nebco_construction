import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { consultingPage } from "@/content/consulting-page";
import { cn } from "@/lib/utils";

export function ConsultingPackages() {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Consulting Packages"
          title="Three ways to start"
          description="Basic, Standard, and Full advisory. NPR fees are quoted after we hear the brief, not a menu price that ignores the site."
          align="center"
          compact
          showRules={false}
          className="mx-auto"
        />
      </ScrollReveal>
      <StaggerReveal className="grid auto-rows-fr items-stretch gap-3 lg:grid-cols-3" staggerMs={140}>
        {consultingPage.packages.map((pack) => (
          <article
            key={pack.name}
            className={cn(
              "group relative flex h-full flex-col overflow-hidden border p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              "hover:-translate-y-1.5 hover:shadow-lg",
              pack.featured
                ? "border-primary bg-secondary text-neutral hover:border-accent hover:shadow-[0_22px_40px_-18px_rgba(0,0,0,0.5)]"
                : "border-neutral-border bg-neutral hover:border-accent/50",
            )}
          >
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-0.5 origin-left bg-accent transition-transform duration-500 ease-out",
                pack.featured ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
              aria-hidden="true"
            />
            <p className={cn("font-label text-[10px]", pack.featured ? "text-accent" : "text-accent")}>
              {pack.featured ? "Most requested" : pack.name}
            </p>
            <h3
              className={cn(
                "mt-2 font-display text-2xl leading-snug",
                pack.featured ? "text-neutral" : "text-secondary",
              )}
            >
              {pack.name}
            </h3>
            <p className={cn("mt-2 font-display text-lg", pack.featured ? "text-accent" : "text-primary")}>
              {pack.price}
            </p>
            <p className={cn("mt-3 text-sm leading-relaxed", pack.featured ? "text-neutral/70" : "text-text-muted")}>
              {pack.description}
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm">
              {pack.items.map((item) => (
                <li key={item} className={pack.featured ? "text-neutral/80" : "text-text-muted"}>
                  {item}
                </li>
              ))}
            </ul>
            <Button
              href="#book-consultation"
              variant={pack.featured ? "primary" : "outline"}
              className={cn("mt-6", pack.featured && "bg-primary text-neutral hover:bg-primary-dark")}
            >
              Get a quote
            </Button>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
