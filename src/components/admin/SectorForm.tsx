"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SectorAtlasPreview } from "@/components/admin/SectorAtlasPreview";

type CapabilityForm = {
  title: string;
  description: string;
};

type SectorFormState = {
  legacyId: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
  messageQuote: string;
  messageBody: string;
  capabilities: CapabilityForm[];
  sortOrder: number;
  published: boolean;
};

const emptyCapability = (): CapabilityForm => ({
  title: "",
  description: "",
});

const emptyForm: SectorFormState = {
  legacyId: "",
  title: "",
  description: "",
  highlight: "",
  image: "",
  messageQuote: "",
  messageBody: "",
  capabilities: [],
  sortOrder: 0,
  published: true,
};

type SectorFormProps = {
  params: Promise<{ id: string }>;
};

export function SectorForm({ params }: SectorFormProps) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<SectorFormState>(emptyForm);
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
      fetch(`/api/admin/sectors/${paramId}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({
            legacyId: data.legacyId ?? "",
            title: data.title ?? "",
            description: data.description ?? "",
            highlight: data.highlight ?? "",
            image: data.image ?? "",
            messageQuote: data.messageQuote ?? "",
            messageBody: Array.isArray(data.messageBody) ? data.messageBody.join("\n\n") : "",
            capabilities: Array.isArray(data.capabilities)
              ? data.capabilities.map((item: CapabilityForm) => ({
                  title: item.title ?? "",
                  description: item.description ?? "",
                }))
              : [],
            sortOrder: data.sortOrder ?? 0,
            published: data.published ?? true,
          });
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateField<K extends keyof SectorFormState>(key: K, value: SectorFormState[K]) {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      legacyId: form.legacyId.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      highlight: form.highlight.trim(),
      image: form.image.trim() || undefined,
      messageQuote: form.messageQuote.trim(),
      messageBody: form.messageBody.split("\n\n").map((p) => p.trim()).filter(Boolean),
      capabilities: form.capabilities
        .filter((item) => item.title.trim())
        .map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),
        })),
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
    };

    try {
      const url = isNew ? "/api/admin/sectors" : `/api/admin/sectors/${id}`;
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
      router.push("/admin/sectors");
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
        title={isNew ? "New Sector" : "Edit Sector"}
        description="Manage sector atlas cards, detail page perspective, and capabilities"
      />

      <form onSubmit={handleSubmit} className="admin-card max-w-4xl space-y-8 p-6">
        <section className="space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
            Sector Atlas Showcase
          </h2>
          <p className="text-sm text-[var(--admin-muted)]">
            These fields power the animated sector atlas on{" "}
            <span className="font-mono text-xs text-[var(--admin-text)]">/sectors</span> and the
            homepage sector cards.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Legacy ID" hint="URL slug, e.g. residential, commercial">
              <input
                className="admin-input"
                value={form.legacyId}
                onChange={(e) => updateField("legacyId", e.target.value)}
                required
                disabled={!isNew}
              />
            </AdminField>
            <AdminField label="Atlas Order" hint="Controls timeline position on /sectors (0 = first)">
              <input
                type="number"
                className="admin-input max-w-[160px]"
                value={form.sortOrder}
                onChange={(e) => updateField("sortOrder", Number(e.target.value))}
              />
            </AdminField>
          </div>
          <AdminField label="Title">
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Card Summary" hint="Shown on atlas cards and sector page intro">
            <textarea
              className="admin-input min-h-28"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Card Highlight" hint="Proof point shown in the atlas card footer">
            <input
              className="admin-input"
              value={form.highlight}
              onChange={(e) => updateField("highlight", e.target.value)}
              required
            />
          </AdminField>
          <ImageUpload
            label="Atlas Image"
            hint="Large image for the sector atlas card and detail page hero"
            value={form.image}
            onChange={(url) => updateField("image", url)}
          />

          <SectorAtlasPreview
            title={form.title}
            description={form.description}
            highlight={form.highlight}
            image={form.image}
            sortOrder={form.sortOrder}
          />
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
            Sector Perspective
          </h2>
          <AdminField label="Featured Quote" hint="Shown in the Sector Perspective section on the detail page">
            <textarea
              className="admin-input min-h-28"
              value={form.messageQuote}
              onChange={(e) => updateField("messageQuote", e.target.value)}
            />
          </AdminField>
          <AdminField label="Full Statement" hint="Separate paragraphs with a blank line">
            <textarea
              className="admin-input min-h-40"
              value={form.messageBody}
              onChange={(e) => updateField("messageBody", e.target.value)}
            />
          </AdminField>
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
                Capabilities
              </h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Shown on the sector detail page as a capability grid.
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
              No capabilities yet.
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

        <div className="border-t border-[var(--admin-border)] pt-6">
          <AdminToggle
            label="Published (visible on site)"
            checked={form.published}
            onChange={(value) => updateField("published", value)}
          />
          {form.legacyId && (
            <p className="mt-4 text-sm text-[var(--admin-muted)]">
              Public URL:{" "}
              <span className="font-mono text-xs text-[var(--admin-text)]">
                /sectors/{form.legacyId}
              </span>
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/sectors")} />
      </form>
    </>
  );
}
