"use client";

import Image from "next/image";
import { ResourceList } from "@/components/admin/ResourceList";

type Row = {
  _id: string;
  legacyId: string;
  title: string;
  highlight: string;
  image?: string;
  messageQuote?: string;
  messageBody?: string[];
  capabilities?: { title: string }[];
  sortOrder: number;
  published: boolean;
};

export default function AdminSectorsPage() {
  return (
    <ResourceList<Row>
      title="Industry Sectors"
      description="Manage sector atlas cards, detail page content, and capabilities"
      apiPath="/api/admin/sectors"
      createHref="/admin/sectors/new"
      editHref={(id) => `/admin/sectors/${id}`}
      searchPlaceholder="Search sectors..."
      columns={[
        {
          key: "image",
          label: "Atlas",
          render: (sector) =>
            sector.image ? (
              <div className="relative h-12 w-16 overflow-hidden rounded border border-[var(--admin-border)] bg-[var(--admin-bg-warm)]">
                <Image
                  src={sector.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <span className="admin-badge admin-badge-muted">No image</span>
            ),
        },
        { key: "title", label: "Title" },
        {
          key: "legacyId",
          label: "Sector URL",
          render: (sector) => (
            <span className="font-mono text-xs text-[var(--admin-muted)]">
              /sectors/{sector.legacyId}
            </span>
          ),
        },
        { key: "highlight", label: "Highlight" },
        {
          key: "messageQuote",
          label: "Perspective",
          render: (sector) => {
            const hasQuote = Boolean(sector.messageQuote?.trim());
            const hasBody = (sector.messageBody?.length ?? 0) > 0;
            return (
              <span
                className={`admin-badge ${hasQuote || hasBody ? "admin-badge-success" : "admin-badge-muted"}`}
              >
                {hasQuote && hasBody ? "Full" : hasQuote || hasBody ? "Partial" : "Empty"}
              </span>
            );
          },
        },
        {
          key: "capabilities",
          label: "Capabilities",
          render: (sector) => (
            <span className="admin-badge admin-badge-muted">
              {sector.capabilities?.length ?? 0}
            </span>
          ),
        },
        {
          key: "sortOrder",
          label: "Atlas #",
          render: (sector) => (
            <span className="font-mono text-xs text-[var(--admin-muted)]">
              {String((sector.sortOrder ?? 0) + 1).padStart(2, "0")}
            </span>
          ),
        },
        {
          key: "published",
          label: "Status",
          render: (sector) => (
            <span
              className={`admin-badge ${sector.published ? "admin-badge-success" : "admin-badge-muted"}`}
            >
              {sector.published ? "Live" : "Hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
