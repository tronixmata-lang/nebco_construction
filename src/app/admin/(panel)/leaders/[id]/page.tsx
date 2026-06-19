"use client";

import { GenericResourceForm } from "@/components/admin/GenericResourceForm";

export default function LeaderFormPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <GenericResourceForm
      params={params}
      title="Leader"
      description="Edit leadership profile"
      apiPath="/api/admin/leaders"
      listPath="/admin/leaders"
      fields={[
        { key: "legacyId", label: "Legacy ID", type: "text", required: true },
        { key: "name", label: "Name", type: "text", required: true },
        { key: "role", label: "Role", type: "text", required: true },
        { key: "bio", label: "Bio", type: "textarea", required: true, rows: 4 },
        { key: "image", label: "Profile Photo", type: "image" as const },
        { key: "sortOrder", label: "Sort Order", type: "number" },
      ]}
      defaults={{ legacyId: "", name: "", role: "", bio: "", image: "", sortOrder: 0, published: true }}
    />
  );
}
