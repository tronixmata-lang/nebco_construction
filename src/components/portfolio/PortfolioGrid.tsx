"use client";

import { useState } from "react";
import { projectCategories, projects } from "@/content/projects";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<
    ProjectCategory | "all"
  >("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <FilterButton
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-text-muted">
          No projects found in this category.
        </p>
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
        "rounded-sm px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-neutral"
          : "border border-neutral-border bg-neutral text-secondary hover:border-primary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
