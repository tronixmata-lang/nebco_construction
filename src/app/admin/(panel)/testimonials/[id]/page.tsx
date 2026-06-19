"use client";

import { GenericResourceForm } from "@/components/admin/GenericResourceForm";

export default function TestimonialFormPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <GenericResourceForm
      params={params}
      title="Testimonial"
      description="Edit client testimonial"
      apiPath="/api/admin/testimonials"
      listPath="/admin/testimonials"
      fields={[
        { key: "quote", label: "Quote", type: "textarea", required: true, rows: 4 },
        { key: "author", label: "Author", type: "text", required: true },
        { key: "organization", label: "Organization", type: "text", required: true },
        { key: "role", label: "Role", type: "text", required: true },
        { key: "sortOrder", label: "Sort Order", type: "number" },
      ]}
      defaults={{ quote: "", author: "", organization: "", role: "", sortOrder: 0, published: true }}
    />
  );
}
