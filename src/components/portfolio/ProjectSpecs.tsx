import { Building2, Calendar, MapPin, Star } from "lucide-react";
import { projectCategories } from "@/content/projects";
import type { Project } from "@/types";
import { ContentCard } from "@/components/ui/ContentCard";

type ProjectSpecsProps = {
  project: Project;
};

function categoryLabel(category: Project["category"]): string {
  return projectCategories.find((item) => item.id === category)?.label ?? category;
}

const specItems = [
  {
    key: "category",
    label: "Category",
    icon: Building2,
    value: (project: Project) => categoryLabel(project.category),
  },
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    value: (project: Project) => project.location,
  },
  {
    key: "year",
    label: "Completion",
    icon: Calendar,
    value: (project: Project) => project.year,
  },
  {
    key: "status",
    label: "Status",
    icon: Star,
    value: () => "Completed",
  },
] as const;

export function ProjectSpecs({ project }: ProjectSpecsProps) {
  return (
    <ContentCard hover={false} accent="accent" className="mt-8 bg-neutral-muted p-1">
      <div className="grid gap-px bg-neutral-border sm:grid-cols-2 lg:grid-cols-4">
        {specItems.map(({ key, label, icon: Icon, value }) => (
          <div key={key} className="flex gap-3 bg-neutral p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-wide text-accent uppercase">{label}</p>
              <p className="mt-1 font-medium text-secondary">{value(project)}</p>
            </div>
          </div>
        ))}
      </div>
      {project.featured && (
        <div className="border-t border-neutral-border bg-accent/5 px-5 py-3">
          <p className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
            Featured Project
          </p>
        </div>
      )}
    </ContentCard>
  );
}
