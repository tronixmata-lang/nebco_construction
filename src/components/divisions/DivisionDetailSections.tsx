import Link from "next/link";
import { PortfolioMosaicCard } from "@/components/portfolio/PortfolioMosaicCard";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { cn } from "@/lib/utils";
import type { DivisionCapability, Project } from "@/types";

type DivisionCapabilitiesSectionProps = {
  capabilities: DivisionCapability[];
  divisionName: string;
};

export function DivisionCapabilitiesSection({
  capabilities,
  divisionName,
}: DivisionCapabilitiesSectionProps) {
  const featured = capabilities.slice(0, 2);
  const rest = capabilities.slice(2);

  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="What We Deliver"
          title={`Capabilities Across ${divisionName}`}
          description="Specialized services backed by A-Class credentials, disciplined project controls, and teams that understand Nepal's construction landscape."
          align="center"
          className="mx-auto mb-8 md:mb-10"
        />
      </ScrollReveal>

      {featured.length > 0 ? (
        <StaggerReveal className="grid gap-5 md:grid-cols-2 lg:gap-6" staggerMs={80}>
          {featured.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} featured />
          ))}
        </StaggerReveal>
      ) : null}

      {rest.length > 0 ? (
        <StaggerReveal
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-6"
          staggerMs={70}
        >
          {rest.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
              index={index + featured.length}
            />
          ))}
        </StaggerReveal>
      ) : null}
    </div>
  );
}

function CapabilityCard({
  capability,
  index,
  featured = false,
}: {
  capability: DivisionCapability;
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "division-capability-card group relative h-full overflow-hidden rounded-sm border border-neutral-border/90 bg-neutral shadow-[0_8px_30px_-18px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg",
        featured ? "p-6 sm:p-8" : "p-5 sm:p-6",
      )}
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-4">
        <BrandIcon title={capability.title} fallbackIndex={index} className="division-mark" alt="" />
        <span className="font-label text-xs text-primary/50">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3
        className={cn(
          "mt-5 font-display text-secondary transition-colors group-hover:text-primary",
          featured ? "text-2xl" : "text-lg",
        )}
      >
        {capability.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">{capability.description}</p>
    </article>
  );
}

type DivisionCommitmentsProps = {
  commitments: string[];
};

export function DivisionCommitments({ commitments }: DivisionCommitmentsProps) {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Our Commitment"
          title="How We Work With Clients"
          description="Principles we uphold on every engagement, from first briefing through final delivery."
          align="center"
          dark
          className="mx-auto mb-8 md:mb-10"
        />
      </ScrollReveal>

      <StaggerReveal
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8"
        staggerMs={70}
      >
        {commitments.map((item, index) => (
          <article key={item} className="group relative border-t border-neutral/15 pt-5">
            <span className="font-display text-2xl leading-none text-accent/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-neutral/85">{item}</p>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}

type DivisionProjectsPreviewProps = {
  projects: Project[];
};

export function DivisionProjectsPreview({ projects }: DivisionProjectsPreviewProps) {
  if (projects.length === 0) return null;

  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Proven Work"
          title="Featured Projects"
          description="A sample of completed and ongoing work that reflects the quality and scale of our delivery."
          align="center"
          className="mx-auto mb-8 md:mb-10"
        />
      </ScrollReveal>

      <div className="portfolio-mosaic-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-rows-[minmax(220px,1fr)_minmax(220px,1fr)] lg:gap-5">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={cn(
              index === 0 && projects.length > 1 && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
              index === 0 ? "min-h-[320px] lg:min-h-0" : "min-h-[240px]",
            )}
          >
            <PortfolioMosaicCard
              project={project}
              index={index}
              layout={index === 0 ? "hero" : "standard"}
            />
          </div>
        ))}
      </div>

      <ScrollReveal className="mt-8 text-center">
        <Link
          href="/portfolio"
          className="font-label inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-accent"
        >
          View full portfolio
          <span aria-hidden="true">→</span>
        </Link>
      </ScrollReveal>
    </div>
  );
}
