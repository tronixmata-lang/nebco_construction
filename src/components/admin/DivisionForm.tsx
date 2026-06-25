"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";

type CapabilityForm = {
  title: string;
  description: string;
};

type ProcessStepForm = {
  title: string;
  description: string;
};

type DivisionFormState = {
  legacyId: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  services: string;
  href: string;
  highlight: string;
  overview: string;
  heroImage: string;
  capabilities: CapabilityForm[];
  process: ProcessStepForm[];
  commitments: string;
  sortOrder: number;
  published: boolean;
};

const emptyCapability = (): CapabilityForm => ({
  title: "",
  description: "",
});

const emptyProcessStep = (): ProcessStepForm => ({
  title: "",
  description: "",
});

const emptyForm: DivisionFormState = {
  legacyId: "",
  slug: "",
  name: "",
  shortName: "",
  tagline: "",
  description: "",
  services: "",
  href: "",
  highlight: "",
  overview: "",
  heroImage: "",
  capabilities: [],
  process: [],
  commitments: "",
  sortOrder: 0,
  published: true,
};

type DivisionFormProps = {
  params: Promise<{ id: string }>;
};

export function DivisionForm({ params }: DivisionFormProps) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<DivisionFormState>(emptyForm);
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
      fetch(`/api/admin/divisions/${paramId}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({
            legacyId: data.legacyId ?? "",
            slug: data.slug ?? "",
            name: data.name ?? "",
            shortName: data.shortName ?? "",
            tagline: data.tagline ?? "",
            description: data.description ?? "",
            services: Array.isArray(data.services) ? data.services.join("\n") : "",
            href: data.href ?? "",
            highlight: data.highlight ?? "",
            overview: data.overview ?? "",
            heroImage: data.heroImage ?? "",
            capabilities: Array.isArray(data.capabilities)
              ? data.capabilities.map((item: CapabilityForm) => ({
                  title: item.title ?? "",
                  description: item.description ?? "",
                }))
              : [],
            process: Array.isArray(data.process)
              ? data.process.map((item: ProcessStepForm) => ({
                  title: item.title ?? "",
                  description: item.description ?? "",
                }))
              : [],
            commitments: Array.isArray(data.commitments) ? data.commitments.join("\n") : "",
            sortOrder: data.sortOrder ?? 0,
            published: data.published ?? true,
          });
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateField<K extends keyof DivisionFormState>(key: K, value: DivisionFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateCapability(index: number, key: keyof CapabilityForm, value: string) {
    setForm((prev) => ({
      ...prev,
      capabilities: prev.capabilities.map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function addCapability() {
    setForm((prev) => ({ ...prev, capabilities: [...prev.capabilities, emptyCapability()] }));
  }

  function removeCapability(index: number) {
    setForm((prev) => ({
      ...prev,
      capabilities: prev.capabilities.filter((_, i) => i !== index),
    }));
  }

  function updateProcessStep(index: number, key: keyof ProcessStepForm, value: string) {
    setForm((prev) => ({
      ...prev,
      process: prev.process.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  }

  function addProcessStep() {
    setForm((prev) => ({ ...prev, process: [...prev.process, emptyProcessStep()] }));
  }

  function removeProcessStep(index: number) {
    setForm((prev) => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      legacyId: form.legacyId.trim(),
      slug: form.slug.trim(),
      name: form.name.trim(),
      shortName: form.shortName.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      services: form.services
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      href: form.href.trim(),
      highlight: form.highlight.trim(),
      overview: form.overview.trim(),
      heroImage: form.heroImage.trim() || undefined,
      capabilities: form.capabilities
        .filter((item) => item.title.trim())
        .map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),
        })),
      process: form.process
        .filter((item) => item.title.trim())
        .map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),
        })),
      commitments: form.commitments
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
    };

    try {
      const url = isNew ? "/api/admin/divisions" : `/api/admin/divisions/${id}`;
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
      router.push("/admin/divisions");
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
        title={isNew ? "New Vertical" : "Edit Vertical"}
        description="Manage vertical cards, detail page content, and capabilities"
      />

      <form onSubmit={handleSubmit} className="admin-card max-w-4xl space-y-8 p-6">
        <section className="space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
            Vertical Cards
          </h2>
          <p className="text-sm text-[var(--admin-muted)]">
            These fields power the homepage flip cards and the vertical listing on{" "}
            <span className="font-mono text-xs text-[var(--admin-text)]">/divisions</span>.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Legacy ID" hint="Internal ID, e.g. construction, consulting">
              <input
                className="admin-input"
                value={form.legacyId}
                onChange={(e) => updateField("legacyId", e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Slug" hint="URL segment, e.g. construction">
              <input
                className="admin-input"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                required
              />
            </AdminField>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Name">
              <input
                className="admin-input"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Short Name">
              <input
                className="admin-input"
                value={form.shortName}
                onChange={(e) => updateField("shortName", e.target.value)}
                required
              />
            </AdminField>
          </div>
          <AdminField label="Tagline">
            <input
              className="admin-input"
              value={form.tagline}
              onChange={(e) => updateField("tagline", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Card Description" hint="Shown on flip cards and used as fallback overview">
            <textarea
              className="admin-input min-h-28"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Services (one per line)" hint="Shown on the back of flip cards">
            <textarea
              className="admin-input min-h-32 font-mono text-sm"
              value={form.services}
              onChange={(e) => updateField("services", e.target.value)}
              required
            />
          </AdminField>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Link Path" hint="e.g. /divisions/construction">
              <input
                className="admin-input"
                value={form.href}
                onChange={(e) => updateField("href", e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Sort Order">
              <input
                type="number"
                className="admin-input max-w-[160px]"
                value={form.sortOrder}
                onChange={(e) => updateField("sortOrder", Number(e.target.value))}
              />
            </AdminField>
          </div>
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
            Detail Page
          </h2>
          <AdminField label="Highlight" hint="Featured callout on the vertical detail page">
            <input
              className="admin-input"
              value={form.highlight}
              onChange={(e) => updateField("highlight", e.target.value)}
              placeholder={form.tagline || "Defaults to tagline if empty"}
            />
          </AdminField>
          <AdminField label="Overview" hint="Long-form intro on the detail page">
            <textarea
              className="admin-input min-h-40"
              value={form.overview}
              onChange={(e) => updateField("overview", e.target.value)}
              placeholder={form.description || "Defaults to card description if empty"}
            />
          </AdminField>
          <ImageUpload
            label="Hero Image"
            hint="Background image on the vertical detail page"
            value={form.heroImage}
            onChange={(url) => updateField("heroImage", url)}
          />
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
                Capabilities
              </h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Shown on the vertical detail page. Leave empty to derive from services.
              </p>
            </div>
            <button
              type="button"
              onClick={addCapability}
              className="admin-btn-secondary inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Capability
            </button>
          </div>

          {form.capabilities.length === 0 && (
            <p className="rounded-lg border border-dashed border-[var(--admin-border)] px-4 py-8 text-center text-sm text-[var(--admin-muted)]">
              No capabilities yet. Services will be used on the public site.
            </p>
          )}

          {form.capabilities.map((capability, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium text-[var(--admin-text)]">Capability {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeCapability(index)}
                  className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
              <AdminField label="Title">
                <input
                  className="admin-input"
                  value={capability.title}
                  onChange={(e) => updateCapability(index, "title", e.target.value)}
                />
              </AdminField>
              <AdminField label="Description">
                <textarea
                  className="admin-input min-h-20"
                  value={capability.description}
                  onChange={(e) => updateCapability(index, "description", e.target.value)}
                />
              </AdminField>
            </div>
          ))}
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
                Process Steps
              </h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                How we deliver — shown as a timeline on the detail page.
              </p>
            </div>
            <button
              type="button"
              onClick={addProcessStep}
              className="admin-btn-secondary inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Step
            </button>
          </div>

          {form.process.map((step, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium text-[var(--admin-text)]">Step {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeProcessStep(index)}
                  className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
              <AdminField label="Title">
                <input
                  className="admin-input"
                  value={step.title}
                  onChange={(e) => updateProcessStep(index, "title", e.target.value)}
                />
              </AdminField>
              <AdminField label="Description">
                <textarea
                  className="admin-input min-h-20"
                  value={step.description}
                  onChange={(e) => updateProcessStep(index, "description", e.target.value)}
                />
              </AdminField>
            </div>
          ))}
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <AdminField label="Commitments (one per line)" hint="Bullet points on the detail page">
            <textarea
              className="admin-input min-h-32 font-mono text-sm"
              value={form.commitments}
              onChange={(e) => updateField("commitments", e.target.value)}
            />
          </AdminField>
        </section>

        <div className="border-t border-[var(--admin-border)] pt-6">
          <AdminToggle
            label="Published (visible on site)"
            checked={form.published}
            onChange={(value) => updateField("published", value)}
          />
          {form.slug && (
            <p className="mt-4 text-sm text-[var(--admin-muted)]">
              Public URL:{" "}
              <span className="font-mono text-xs text-[var(--admin-text)]">
                /divisions/{form.slug}
              </span>
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/divisions")} />
      </form>
    </>
  );
}
