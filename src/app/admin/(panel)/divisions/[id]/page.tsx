"use client";

import { GenericResourceForm } from "@/components/admin/GenericResourceForm";

const fields = [
  { key: "legacyId", label: "Legacy ID", type: "text" as const, required: true },
  { key: "slug", label: "Slug", type: "text" as const, required: true },
  { key: "name", label: "Name", type: "text" as const, required: true },
  { key: "shortName", label: "Short Name", type: "text" as const, required: true },
  { key: "tagline", label: "Tagline", type: "text" as const, required: true },
  { key: "description", label: "Description", type: "textarea" as const, required: true, rows: 4 },
  { key: "services", label: "Services (one per line)", type: "array" as const, required: true },
  { key: "href", label: "Link Path", type: "text" as const, required: true, hint: "e.g. /divisions/construction" },
  { key: "sortOrder", label: "Sort Order", type: "number" as const },
];

const defaults = {
  legacyId: "",
  slug: "",
  name: "",
  shortName: "",
  tagline: "",
  description: "",
  services: "",
  href: "",
  sortOrder: 0,
  published: true,
};

export default function DivisionFormPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <GenericResourceForm
      params={params}
      title="Division"
      description="Edit business division details"
      apiPath="/api/admin/divisions"
      listPath="/admin/divisions"
      fields={fields}
      defaults={defaults}
    />
  );
}
