"use client";

import { useMemo, useState } from "react";
import { projectCategories } from "@/content/projects";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";
import { PortfolioMosaicCard } from "./PortfolioMosaicCard";
import {
  getMosaicGridClass,
  resolveMosaicLayout,
  sortProjectsForShowcase,
} from "./portfolio-mosaic";

type PortfolioGridProps = {
  projects: Project[];
};

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(() => {
    const list =
      activeCategory === "all"
        ? projects
        : projects.filter((project) => project.category === activeCategory);
    return sortProjectsForShowcase(list);
  }, [activeCategory, projects]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-6 border-b border-neutral-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Filter by Sector
          </p>
          <p className="mt-2 font-display text-2xl text-secondary sm:text-3xl">
            {filtered.length} Project{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
            All Projects
          </FilterButton>
          {projectCategories.map((cat) => (
            <FilterButton
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div
          key={activeCategory}
          className="portfolio-mosaic-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(220px,1fr)] lg:gap-5"
        >
          {filtered.map((project, index) => {
            const layout = resolveMosaicLayout(project, index, filtered.length);
            return (
              <div key={project.id} className={cn(getMosaicGridClass(layout))}>
                <PortfolioMosaicCard project={project} index={index} layout={layout} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="py-16 text-center text-text-muted">No projects found in this category.</p>
      )}
    </div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-sm px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-primary text-neutral shadow-sm"
          : "border border-neutral-border bg-neutral text-secondary hover:border-accent/60 hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
