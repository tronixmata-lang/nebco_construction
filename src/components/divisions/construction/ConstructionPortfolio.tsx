"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CmsImage } from "@/components/ui/CmsImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "renovation", label: "Renovation" },
  { id: "civil", label: "Civil" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

type ConstructionPortfolioProps = {
  projects: Project[];
};

function matchesFilter(project: Project, filter: FilterId) {
  if (filter === "all") return true;
  if (filter === "civil") return project.category === "infrastructure";
  if (filter === "renovation") {
    return /renovat|interior|extension|finish|upgrade|redesign/i.test(
      `${project.title} ${project.description}`,
    );
  }
  return project.category === filter;
}

function typeLabel(project: Project) {
  if (project.category === "infrastructure") return "Civil";
  if (/renovat|interior|extension/i.test(`${project.title} ${project.description}`)) {
    return "Renovation";
  }
  return project.category.charAt(0).toUpperCase() + project.category.slice(1);
}

export function ConstructionPortfolio({ projects }: ConstructionPortfolioProps) {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter)).slice(0, 8),
    [filter, projects],
  );

  return (
    <div id="portfolio">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Project Portfolio"
          title="Work you can inspect"
          description="Filter by residential, commercial, renovation, or civil. Each tile lists location, type, and delivery year."
          align="center"
          className="mx-auto mb-8 md:mb-10"
        />
      </ScrollReveal>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "font-label rounded-full border px-4 py-2 text-xs transition-colors",
              filter === item.id
                ? "border-primary bg-primary text-neutral"
                : "border-neutral-border bg-neutral text-secondary hover:border-accent/50",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-text-muted">
          No projects in this filter yet. View the full portfolio for the complete record.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group overflow-hidden rounded-sm border border-neutral-border bg-neutral shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-muted">
                {project.image?.trim() ? (
                  <CmsImage
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center"
                    role="img"
                    aria-label="Your project photo"
                  >
                    <span className="font-label text-[10px] tracking-[0.14em] text-secondary/60 uppercase">
                      Your logo
                    </span>
                    <span className="font-display text-sm text-secondary/75">Your project photo</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-label text-[10px] text-accent">
                  {typeLabel(project)}
                  <span className="mx-2 text-text-muted/50">·</span>
                  {project.year}
                </p>
                <h3 className="mt-2 font-display text-lg text-secondary group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="mt-8 text-center">
        <Link
          href="/portfolio"
          className="font-label inline-flex items-center gap-2 text-sm text-primary hover:text-accent"
        >
          View full portfolio
          <span aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  );
}
