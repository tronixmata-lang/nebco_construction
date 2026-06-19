"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = { _id: string; author: string; organization: string; published: boolean };

export default function AdminTestimonialsPage() {
  return (
    <ResourceList<Row>
      title="Testimonials"
      description="Manage client testimonials on the homepage"
      apiPath="/api/admin/testimonials"
      createHref="/admin/testimonials/new"
      editHref={(id) => `/admin/testimonials/${id}`}
      columns={[
        { key: "author", label: "Author" },
        { key: "organization", label: "Organization" },
        {
          key: "published",
          label: "Status",
          render: (t) => (
            <span className={`admin-badge ${t.published ? "admin-badge-success" : "admin-badge-muted"}`}>
              {t.published ? "Live" : "Hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
