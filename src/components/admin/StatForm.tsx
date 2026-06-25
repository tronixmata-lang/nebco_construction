"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";

const HERO_STAT_IDS = ["years", "clients", "completed", "running"] as const;

type StatFormState = {
  legacyId: string;
  value: string;
  label: string;
  sortOrder: number;
  published: boolean;
};

const emptyForm: StatFormState = {
  legacyId: "",
  value: "",
  label: "",
  sortOrder: 0,
  published: true,
};

type StatFormProps = {
  params: Promise<{ id: string }>;
};

export function StatForm({ params }: StatFormProps) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<StatFormState>(emptyForm);
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
      fetch(`/api/admin/stats/${paramId}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({
            legacyId: data.legacyId ?? "",
            value: data.value ?? "",
            label: data.label ?? "",
            sortOrder: data.sortOrder ?? 0,
            published: data.published ?? true,
          });
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateField<K extends keyof StatFormState>(key: K, value: StatFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      legacyId: form.legacyId.trim(),
      value: form.value.trim(),
      label: form.label.trim(),
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
    };

    try {
      const url = isNew ? "/api/admin/stats" : `/api/admin/stats/${id}`;
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
      router.push("/admin/stats");
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
        title={isNew ? "New Stat" : "Edit Stat"}
        description="Stats appear on the homepage hero strip, company overview, testimonials, and inner pages"
      />

      <form onSubmit={handleSubmit} className="admin-card max-w-3xl space-y-5 p-6">
        <AdminField
          label="Legacy ID"
          hint={`Homepage hero uses: ${HERO_STAT_IDS.join(", ")}. Do not change this ID after publishing.`}
        >
          <input
            className="admin-input font-mono text-sm"
            value={form.legacyId}
            onChange={(e) => updateField("legacyId", e.target.value)}
            required
            disabled={!isNew}
            list="stat-legacy-ids"
          />
          <datalist id="stat-legacy-ids">
            {HERO_STAT_IDS.map((statId) => (
              <option key={statId} value={statId} />
            ))}
          </datalist>
        </AdminField>

        <AdminField label="Value" hint="e.g. 30+, 500+, 200+">
          <input
            className="admin-input"
            value={form.value}
            onChange={(e) => updateField("value", e.target.value)}
            required
          />
        </AdminField>

        <AdminField label="Label" hint="Shown under the value on all public stat blocks">
          <input
            className="admin-input"
            value={form.label}
            onChange={(e) => updateField("label", e.target.value)}
            required
          />
        </AdminField>

        <AdminField label="Sort Order" hint="Lower numbers appear first (0 = first)">
          <input
            type="number"
            className="admin-input max-w-[160px]"
            value={form.sortOrder}
            onChange={(e) => updateField("sortOrder", Number(e.target.value))}
          />
        </AdminField>

        <AdminToggle
          label="Published (visible on site)"
          checked={form.published}
          onChange={(value) => updateField("published", value)}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}
        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/stats")} />
      </form>
    </>
  );
}
