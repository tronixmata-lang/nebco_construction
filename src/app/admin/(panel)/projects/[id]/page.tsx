"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SeoFieldsForm, emptySeoFields } from "@/components/admin/SeoFieldsForm";
import type { SeoFields } from "@/types";

const categories = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "industrial", label: "Industrial" },
];

type ProjectForm = {
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  seo: SeoFields;
};

const emptyForm: ProjectForm = {
  title: "",
  slug: "",
  category: "residential",
  location: "",
  year: new Date().getFullYear().toString(),
  description: "",
  image: "",
  featured: false,
  published: true,
  sortOrder: 0,
  seo: emptySeoFields,
};

export default function ProjectFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
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
      fetch(`/api/admin/projects/${paramId}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({
            title: data.title ?? "",
            slug: data.slug ?? "",
            category: data.category ?? "residential",
            location: data.location ?? "",
            year: data.year ?? "",
            description: data.description ?? "",
            image: data.image ?? "",
            featured: data.featured ?? false,
            published: data.published ?? true,
            sortOrder: data.sortOrder ?? 0,
            seo: { ...emptySeoFields, ...data.seo },
          });
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateField<K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      router.push("/admin/projects");
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-[var(--admin-muted)]">Loading...</p>;
  }

  return (
    <>
      <AdminHeader
        title={isNew ? "New Project" : "Edit Project"}
        description="Manage project details for the portfolio"
      />

      <form onSubmit={handleSubmit} className="admin-card max-w-3xl space-y-5 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Title">
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Slug" hint="Auto-generated if left empty on create">
            <input
              className="admin-input"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
            />
          </AdminField>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <AdminField label="Category">
            <select
              className="admin-input"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Location">
            <input
              className="admin-input"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Year">
            <input
              className="admin-input"
              value={form.year}
              onChange={(e) => updateField("year", e.target.value)}
              required
            />
          </AdminField>
        </div>

        <AdminField label="Description">
          <textarea
            className="admin-input min-h-32"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            required
          />
        </AdminField>

        <ImageUpload
          label="Project Image"
          hint="Upload a photo or paste an existing image path"
          value={form.image}
          onChange={(url) => updateField("image", url)}
          required
        />

        <div className="flex flex-wrap gap-6">
          <AdminToggle label="Featured on homepage" checked={form.featured} onChange={(v) => updateField("featured", v)} />
          <AdminToggle label="Published (visible on site)" checked={form.published} onChange={(v) => updateField("published", v)} />
        </div>

        <AdminField label="Sort Order">
          <input
            type="number"
            className="admin-input max-w-[120px]"
            value={form.sortOrder}
            onChange={(e) => updateField("sortOrder", Number(e.target.value))}
          />
        </AdminField>

        <SeoFieldsForm
          seo={form.seo}
          onChange={(seo) => updateField("seo", seo)}
          defaultTitle={form.title}
          defaultDescription={form.description}
          previewUrl={form.slug ? `https://nebco.com.np/portfolio/${form.slug}` : undefined}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/projects")} />
      </form>
    </>
  );
}
