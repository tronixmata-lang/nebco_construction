import Link from "next/link";
import { Award, Handshake, MessageSquareQuote, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CmsImage } from "@/components/ui/CmsImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { cn } from "@/lib/utils";
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
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">What We Deliver</p>
        <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">
          Capabilities Across {divisionName}
        </h2>
        <p className="mt-4 text-base text-text-muted">
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

const commitmentIcons: LucideIcon[] = [ShieldCheck, Handshake, MessageSquareQuote, Award, Sparkles];

export function DivisionCommitments({ commitments }: DivisionCommitmentsProps) {
  const columnClass =
    commitments.length === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : commitments.length === 4
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Our Commitment</p>
        <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">
          How We Work With Clients
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          Principles we uphold on every engagement, from first briefing through final delivery.
        </p>
        <span className="mx-auto mt-5 block h-0.5 w-12 rounded-full bg-primary" aria-hidden="true" />
      </ScrollReveal>

      <StaggerReveal
        className={cn("mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5", columnClass)}
        staggerMs={80}
      >
        {commitments.map((item, index) => {
          const Icon = commitmentIcons[index % commitmentIcons.length];

          return (
            <article
              key={item}
              className="group relative flex h-full flex-col rounded-sm border border-neutral-border/80 bg-neutral p-6 shadow-[0_8px_28px_-18px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.18)] sm:p-7"
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent to-primary transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-[0.18em] text-primary/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-5 flex-1 text-base leading-relaxed text-secondary">{item}</p>
            </article>
          );
        })}
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
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Proven Work</p>
        <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">Featured Projects</h2>
        <p className="mt-4 text-base text-text-muted">
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
              <CmsImage
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
