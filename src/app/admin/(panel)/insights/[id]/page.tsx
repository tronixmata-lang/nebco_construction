"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SeoFieldsForm, emptySeoFields } from "@/components/admin/SeoFieldsForm";
import type { SeoFields } from "@/types";

type InsightForm = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  status: "draft" | "published";
  featured: boolean;
  seo: SeoFields;
};

const emptyForm: InsightForm = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  category: "Construction",
  date: new Date().toISOString().split("T")[0],
  readTime: "5 min read",
  image: "",
  status: "draft",
  featured: false,
  seo: emptySeoFields,
};

export default function InsightFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<InsightForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ id: paramId }) => {
      setIsNew(paramId === "new");
      if (paramId === "new") {
        setLoading(false);
        return;
      }
      setId(paramId);
      fetch(`/api/admin/insights/${paramId}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({
            title: data.title ?? "",
            slug: data.slug ?? "",
            excerpt: data.excerpt ?? "",
            body: Array.isArray(data.body) ? data.body.join("\n\n") : "",
            category: data.category ?? "Construction",
            date: data.date ?? "",
            readTime: data.readTime ?? "5 min read",
            image: data.image ?? "",
            status: data.status ?? "draft",
            featured: data.featured ?? false,
            seo: { ...emptySeoFields, ...data.seo },
          });
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateField<K extends keyof InsightForm>(key: K, value: InsightForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      body: form.body.split("\n\n").filter(Boolean),
    };
    try {
      const url = isNew ? "/api/admin/insights" : `/api/admin/insights/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      router.push("/admin/insights");
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  return (
    <>
      <AdminHeader
        title={isNew ? "New Article" : "Edit Article"}
        description="Write and publish insights for the website"
      />
      <form onSubmit={handleSubmit} className="admin-card max-w-3xl space-y-5 p-6">
        <AdminField label="Title">
          <input className="admin-input" value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
        </AdminField>
        <AdminField label="Slug">
          <input className="admin-input" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} />
        </AdminField>
        <AdminField label="Excerpt">
          <textarea className="admin-input min-h-20" value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} required />
        </AdminField>
        <ImageUpload
          label="Card Image"
          hint="Shown at the top of the article card on the Insights page"
          value={form.image}
          onChange={(url) => updateField("image", url)}
        />
        <AdminField label="Body" hint="Separate paragraphs with a blank line">
          <textarea className="admin-input min-h-48" value={form.body} onChange={(e) => updateField("body", e.target.value)} required />
        </AdminField>
        <div className="grid gap-5 sm:grid-cols-3">
          <AdminField label="Category">
            <input className="admin-input" value={form.category} onChange={(e) => updateField("category", e.target.value)} />
          </AdminField>
          <AdminField label="Date">
            <input type="date" className="admin-input" value={form.date} onChange={(e) => updateField("date", e.target.value)} />
          </AdminField>
          <AdminField label="Read Time">
            <input className="admin-input" value={form.readTime} onChange={(e) => updateField("readTime", e.target.value)} />
          </AdminField>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Status">
            <select className="admin-input" value={form.status} onChange={(e) => updateField("status", e.target.value as InsightForm["status"])}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </AdminField>
          <div className="flex items-end pb-1">
            <AdminToggle label="Featured article" checked={form.featured} onChange={(v) => updateField("featured", v)} />
          </div>
        </div>
        <SeoFieldsForm
          seo={form.seo}
          onChange={(seo) => updateField("seo", seo)}
          defaultTitle={form.title}
          defaultDescription={form.excerpt}
          previewUrl={form.slug ? `https://nebco.com.np/insights/${form.slug}` : undefined}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/insights")} />
      </form>
    </>
  );
}
