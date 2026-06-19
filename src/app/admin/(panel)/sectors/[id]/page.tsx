"use client";

import { GenericResourceForm } from "@/components/admin/GenericResourceForm";

export default function SectorFormPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <GenericResourceForm
      params={params}
      title="Sector"
      description="Edit industry sector"
      apiPath="/api/admin/sectors"
      listPath="/admin/sectors"
      fields={[
        { key: "legacyId", label: "Legacy ID", type: "text", required: true },
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
        { key: "highlight", label: "Highlight", type: "text", required: true },
        { key: "sortOrder", label: "Sort Order", type: "number" },
      ]}
      defaults={{ legacyId: "", title: "", description: "", highlight: "", sortOrder: 0, published: true }}
    />
  );
}
