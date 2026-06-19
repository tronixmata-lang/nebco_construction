"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = { _id: string; title: string; subtitle: string; published: boolean };

export default function AdminCertificatesPage() {
  return (
    <ResourceList<Row>
      title="Certificates"
      description="Manage certificates and awards"
      apiPath="/api/admin/certificates"
      createHref="/admin/certificates/new"
      editHref={(id) => `/admin/certificates/${id}`}
      columns={[
        { key: "title", label: "Title" },
        { key: "subtitle", label: "Subtitle" },
        {
          key: "published",
          label: "Status",
          render: (c) => (
            <span className={`admin-badge ${c.published ? "admin-badge-success" : "admin-badge-muted"}`}>
              {c.published ? "Live" : "Hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
