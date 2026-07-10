"use client";

import { AdminField, AdminToggle } from "@/components/admin/ResourceList";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SeoPreview } from "@/components/admin/SeoPreview";
import type { SeoFields } from "@/types";

type SeoFieldsFormProps = {
  seo: SeoFields;
  onChange: (seo: SeoFields) => void;
  defaultTitle?: string;
  defaultDescription?: string;
  previewUrl?: string;
};

export function SeoFieldsForm({
  seo,
  onChange,
  defaultTitle = "",
  defaultDescription = "",
  previewUrl,
}: SeoFieldsFormProps) {
  function update<K extends keyof SeoFields>(key: K, value: SeoFields[K]) {
    onChange({ ...seo, [key]: value });
  }

  return (
    <section className="space-y-4 border-t border-[var(--admin-border)] pt-5">
      <h3 className="admin-section-title">SEO Settings</h3>

      <SeoPreview
        title={seo.metaTitle || defaultTitle}
        description={seo.metaDescription || defaultDescription}
        url={previewUrl}
      />

      <AdminField label="Meta Title" hint="Leave blank to use the page title">
        <input
          className="admin-input"
          value={seo.metaTitle ?? ""}
          onChange={(e) => update("metaTitle", e.target.value)}
          maxLength={70}
        />
      </AdminField>

      <AdminField label="Meta Description">
        <textarea
          className="admin-input min-h-20"
          value={seo.metaDescription ?? ""}
          onChange={(e) => update("metaDescription", e.target.value)}
          maxLength={160}
        />
      </AdminField>

      <AdminField label="Focus Keyword">
        <input
          className="admin-input"
          value={seo.focusKeyword ?? ""}
          onChange={(e) => update("focusKeyword", e.target.value)}
        />
      </AdminField>

      <ImageUpload
        label="OG Image"
        hint="Override the default social share image"
        value={seo.ogImage ?? ""}
        onChange={(url) => update("ogImage", url)}
      />

      <AdminField label="Canonical URL" hint="Optional. Override the default URL">
        <input
          className="admin-input"
          value={seo.canonical ?? ""}
          onChange={(e) => update("canonical", e.target.value)}
          placeholder="https://nebco.com.np/page"
        />
      </AdminField>

      <AdminToggle
        label="No Index (hide from search engines)"
        checked={seo.noIndex ?? false}
        onChange={(v) => update("noIndex", v)}
      />
    </section>
  );
}

export const emptySeoFields: SeoFields = {
  metaTitle: "",
  metaDescription: "",
  ogImage: "",
  focusKeyword: "",
  noIndex: false,
  canonical: "",
};
