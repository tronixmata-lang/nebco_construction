"use client";

import { GenericResourceForm } from "@/components/admin/GenericResourceForm";

export default function PillarFormPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <GenericResourceForm
      params={params}
      title="Value Pillar"
      description="Edit value pillar"
      apiPath="/api/admin/pillars"
      listPath="/admin/pillars"
      fields={[
        { key: "legacyId", label: "Legacy ID", type: "text", required: true },
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea", required: true },
        { key: "icon", label: "Icon Key", type: "text", required: true, hint: "quality, integrity, timely, innovation, value" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
      ]}
      defaults={{ legacyId: "", title: "", description: "", icon: "quality", sortOrder: 0, published: true }}
    />
  );
}
