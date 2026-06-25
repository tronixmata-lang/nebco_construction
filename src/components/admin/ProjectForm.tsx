"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { showcaseLayoutOptions } from "@/components/portfolio/portfolio-mosaic";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SeoFieldsForm, emptySeoFields } from "@/components/admin/SeoFieldsForm";
import type { ProjectShowcaseLayout, SeoFields } from "@/types";

const categories = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "industrial", label: "Industrial" },
];

type ProjectFormState = {
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  galleryImages: string;
  featured: boolean;
  showcaseLayout: ProjectShowcaseLayout;
  published: boolean;
  sortOrder: number;
  viewCount: number;
  seo: SeoFields;
};

const emptyForm: ProjectFormState = {
  title: "",
  slug: "",
  category: "residential",
  location: "",
  year: new Date().getFullYear().toString(),
  description: "",
  image: "",
  galleryImages: "",
  featured: false,
  showcaseLayout: "auto",
  published: true,
  sortOrder: 0,
  viewCount: 0,
  seo: emptySeoFields,
};

type ProjectFormProps = {
  params: Promise<{ id: string }>;
};

export function ProjectForm({ params }: ProjectFormProps) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);
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
            galleryImages: Array.isArray(data.images) ? data.images.join("\n") : "",
            featured: data.featured ?? false,
            showcaseLayout: data.showcaseLayout ?? "auto",
            published: data.published ?? true,
            sortOrder: data.sortOrder ?? 0,
            viewCount: data.viewCount ?? 0,
            seo: { ...emptySeoFields, ...data.seo },
          });
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateField<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category,
      location: form.location.trim(),
      year: form.year.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      images: form.galleryImages
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      featured: form.featured,
      showcaseLayout: form.showcaseLayout,
      published: form.published,
      sortOrder: Number(form.sortOrder) || 0,
      seo: form.seo,
    };

    try {
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${id}`;
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
      router.push("/admin/projects");
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  const selectedLayout = showcaseLayoutOptions.find((option) => option.value === form.showcaseLayout);

  return (
    <>
      <AdminHeader
        title={isNew ? "New Project" : "Edit Project"}
        description="Manage portfolio details, mosaic showcase placement, and gallery images"
      />

      <form onSubmit={handleSubmit} className="admin-card max-w-4xl space-y-8 p-6">
        <section className="space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
            Project Details
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Title">
              <input
                className="admin-input"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Slug" hint="Used in /portfolio/[slug]">
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
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
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

          <AdminField label="Description" hint="Shown on the portfolio mosaic card and project page">
            <textarea
              className="admin-input min-h-32"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
            />
          </AdminField>

          <ImageUpload
            label="Cover Image"
            hint="Main image used in the portfolio mosaic and project hero"
            value={form.image}
            onChange={(url) => updateField("image", url)}
            required
          />

          <AdminField
            label="Gallery Images"
            hint="One image path or URL per line. Shown on the project detail page."
          >
            <textarea
              className="admin-input min-h-28 font-mono text-xs"
              value={form.galleryImages}
              onChange={(e) => updateField("galleryImages", e.target.value)}
              placeholder="/images/site/example.jpg"
            />
          </AdminField>
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
              Portfolio Mosaic Showcase
            </h2>
            <p className="mt-2 text-sm text-[var(--admin-muted)]">
              Control how this project appears on the public portfolio page mosaic grid.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <AdminField label="Mosaic Tile Size">
              <select
                className="admin-input"
                value={form.showcaseLayout}
                onChange={(e) =>
                  updateField("showcaseLayout", e.target.value as ProjectShowcaseLayout)
                }
              >
                {showcaseLayoutOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {selectedLayout && (
                <p className="mt-2 text-xs text-[var(--admin-muted)]">{selectedLayout.hint}</p>
              )}
            </AdminField>

            <AdminField label="Sort Order" hint="Lower numbers appear first within the same featured group">
              <input
                type="number"
                className="admin-input max-w-[160px]"
                value={form.sortOrder}
                onChange={(e) => updateField("sortOrder", Number(e.target.value))}
              />
            </AdminField>
          </div>

          <div className="flex flex-wrap gap-6">
            <AdminToggle
              label="Featured project"
              checked={form.featured}
              onChange={(value) => updateField("featured", value)}
            />
            <AdminToggle
              label="Published (visible on site)"
              checked={form.published}
              onChange={(value) => updateField("published", value)}
            />
          </div>

          {!isNew && (
            <p className="text-sm text-[var(--admin-muted)]">
              Page views: <span className="font-medium text-[var(--admin-text)]">{form.viewCount}</span>
            </p>
          )}

          {form.slug && (
            <p className="text-sm text-[var(--admin-muted)]">
              Public URL:{" "}
              <span className="font-mono text-xs text-[var(--admin-text)]">
                /portfolio/{form.slug}
              </span>
            </p>
          )}
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <SeoFieldsForm
            seo={form.seo}
            onChange={(seo) => updateField("seo", seo)}
            defaultTitle={form.title}
            defaultDescription={form.description}
            previewUrl={form.slug ? `https://nebco.com.np/portfolio/${form.slug}` : undefined}
          />
        </section>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/projects")} />
      </form>
    </>
  );
}
