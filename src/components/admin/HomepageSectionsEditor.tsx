"use client";

import { AdminField } from "@/components/admin/ResourceList";
import type { HomepageSections } from "@/types/site-content";

type HomepageSectionsEditorProps = {
  sections: HomepageSections;
  onChange: (sections: HomepageSections) => void;
};

type SectionKey = Exclude<keyof HomepageSections, "certificates">;

const sectionLabels: Record<SectionKey, string> = {
  divisions: "Our Verticals",
  valuePillars: "Core Values",
  featuredProjects: "Featured Projects",
  sectors: "Sectors",
  testimonials: "Testimonials",
  insights: "Insights Preview",
};

function updateSectionHeading(
  sections: HomepageSections,
  key: SectionKey,
  field: "eyebrow" | "title" | "description",
  value: string,
): HomepageSections {
  return {
    ...sections,
    [key]: {
      ...sections[key],
      [field]: value,
    },
  };
}

export function HomepageSectionsEditor({ sections, onChange }: HomepageSectionsEditorProps) {
  return (
    <section className="admin-card space-y-6 p-6">
      <div>
        <h2 className="admin-section-title">Homepage Section Headings</h2>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Eyebrow, title, and description for each homepage block below the hero.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5">
        <h3 className="font-medium text-[var(--admin-text)]">Certificates</h3>
        <AdminField label="Eyebrow" hint="Title and description are edited in Certificates Section above">
          <input
            className="admin-input"
            value={sections.certificates.eyebrow}
            onChange={(e) =>
              onChange({
                ...sections,
                certificates: { eyebrow: e.target.value },
              })
            }
          />
        </AdminField>
      </div>

      {(Object.keys(sectionLabels) as SectionKey[]).map((key) => (
        <div
          key={key}
          className="space-y-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
        >
          <h3 className="font-medium text-[var(--admin-text)]">{sectionLabels[key]}</h3>
          <AdminField label="Eyebrow">
            <input
              className="admin-input"
              value={sections[key].eyebrow}
              onChange={(e) => onChange(updateSectionHeading(sections, key, "eyebrow", e.target.value))}
            />
          </AdminField>
          <AdminField label="Title">
            <input
              className="admin-input"
              value={sections[key].title}
              onChange={(e) => onChange(updateSectionHeading(sections, key, "title", e.target.value))}
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className="admin-input min-h-20"
              value={sections[key].description}
              onChange={(e) =>
                onChange(updateSectionHeading(sections, key, "description", e.target.value))
              }
            />
          </AdminField>
        </div>
      ))}
    </section>
  );
}
