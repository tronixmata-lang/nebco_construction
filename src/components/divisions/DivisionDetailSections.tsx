import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import type { DivisionCapability } from "@/types";

type DivisionCapabilitiesSectionProps = {
  capabilities: DivisionCapability[];
  divisionName: string;
};

export function DivisionCapabilitiesSection({
  capabilities,
  divisionName,
}: DivisionCapabilitiesSectionProps) {
  return (
    <div>
      <ScrollReveal>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">What We Deliver</p>
        <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">
          Capabilities Across {divisionName}
        </h2>
        <p className="mt-4 max-w-3xl text-base text-text-muted">
          Specialized services backed by A-Class credentials, disciplined project controls, and teams
          that understand Nepal&apos;s construction landscape.
        </p>
      </ScrollReveal>

      <StaggerReveal
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        staggerMs={85}
      >
        {capabilities.map((capability, index) => (
          <article
            key={capability.title}
            className="division-capability-card group relative h-full overflow-hidden rounded-sm border border-neutral-border/90 bg-neutral p-6 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg sm:p-7"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            <span className="font-mono text-xs font-semibold tracking-[0.18em] text-primary/55">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg text-secondary transition-colors group-hover:text-primary">
              {capability.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{capability.description}</p>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}

type DivisionCommitmentsProps = {
  commitments: string[];
};

export function DivisionCommitments({ commitments }: DivisionCommitmentsProps) {
  return (
    <div className="division-commitments rounded-sm border border-accent/25 bg-neutral p-6 sm:p-8 lg:p-10">
      <ScrollReveal>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Our Commitment</p>
        <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">
          How We Work With Clients
        </h2>
      </ScrollReveal>

      <StaggerReveal className="mt-8 grid gap-4 sm:grid-cols-2" staggerMs={70}>
        {commitments.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-sm border border-neutral-border/80 bg-neutral-muted/40 px-4 py-4"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3.25-3.25a1 1 0 1 1 1.414-1.414l2.543 2.543 6.543-6.543a1 1 0 0 1 1.413-.006Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <p className="text-sm leading-relaxed text-secondary sm:text-base">{item}</p>
          </div>
        ))}
      </StaggerReveal>
    </div>
  );
}

type DivisionProjectsPreviewProps = {
  projects: Array<{
    slug: string;
    title: string;
    location: string;
    image: string;
  }>;
};

export function DivisionProjectsPreview({ projects }: DivisionProjectsPreviewProps) {
  if (projects.length === 0) return null;

  return (
    <div>
      <ScrollReveal>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Proven Work</p>
        <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">Featured Projects</h2>
        <p className="mt-4 max-w-2xl text-base text-text-muted">
          A sample of completed and ongoing work that reflects the quality and scale of our delivery.
        </p>
      </ScrollReveal>

      <StaggerReveal className="mt-10 grid gap-6 md:grid-cols-3" staggerMs={100}>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="division-project-card group relative overflow-hidden rounded-sm border border-neutral-border bg-neutral shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-secondary transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-text-muted">{project.location}</p>
            </div>
          </Link>
        ))}
      </StaggerReveal>

      <ScrollReveal className="mt-8 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:text-accent"
        >
          View full portfolio
          <span aria-hidden="true">→</span>
        </Link>
      </ScrollReveal>
    </div>
  );
}
