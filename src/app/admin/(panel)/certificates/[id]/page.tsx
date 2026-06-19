"use client";

import { GenericResourceForm } from "@/components/admin/GenericResourceForm";

export default function CertificateFormPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <GenericResourceForm
      params={params}
      title="Certificate"
      description="Edit certificate or award"
      apiPath="/api/admin/certificates"
      listPath="/admin/certificates"
      fields={[
        { key: "legacyId", label: "Legacy ID", type: "text", required: true },
        { key: "title", label: "Title", type: "text", required: true },
        { key: "subtitle", label: "Subtitle", type: "text", required: true },
        { key: "image", label: "Image", type: "image" as const, required: true },
        { key: "alt", label: "Alt Text", type: "text", required: true },
        { key: "sortOrder", label: "Sort Order", type: "number" },
      ]}
      defaults={{ legacyId: "", title: "", subtitle: "", image: "", alt: "", sortOrder: 0, published: true }}
    />
  );
}
