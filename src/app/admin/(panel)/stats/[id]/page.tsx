"use client";

import { GenericResourceForm } from "@/components/admin/GenericResourceForm";

export default function StatFormPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <GenericResourceForm
      params={params}
      title="Stat"
      description="Edit company statistic"
      apiPath="/api/admin/stats"
      listPath="/admin/stats"
      fields={[
        { key: "legacyId", label: "Legacy ID", type: "text", required: true },
        { key: "value", label: "Value", type: "text", required: true, hint: "e.g. 30+" },
        { key: "label", label: "Label", type: "text", required: true },
        { key: "sortOrder", label: "Sort Order", type: "number" },
      ]}
      defaults={{ legacyId: "", value: "", label: "", sortOrder: 0, published: true }}
    />
  );
}
