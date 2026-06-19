"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";

export type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "array" | "image";
  hint?: string;
  required?: boolean;
  rows?: number;
};

type GenericFormProps = {
  params: Promise<{ id: string }>;
  title: string;
  description: string;
  apiPath: string;
  listPath: string;
  fields: FieldConfig[];
  defaults: Record<string, unknown>;
  toggles?: { key: string; label: string }[];
};

export function GenericResourceForm({
  params,
  title,
  description,
  apiPath,
  listPath,
  fields,
  defaults,
  toggles = [{ key: "published", label: "Published (visible on site)" }],
}: GenericFormProps) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<Record<string, unknown>>(defaults);
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
      fetch(`${apiPath}/${paramId}`)
        .then((r) => r.json())
        .then((data) => {
          const next: Record<string, unknown> = { ...defaults };
          for (const field of fields) {
            const val = data[field.key];
            if (field.type === "array" && Array.isArray(val)) {
              next[field.key] = val.join("\n");
            } else if (val !== undefined) {
              next[field.key] = val;
            }
          }
          for (const toggle of toggles) {
            next[toggle.key] = data[toggle.key] ?? defaults[toggle.key] ?? false;
          }
          setForm(next);
        })
        .finally(() => setLoading(false));
    });
  }, [params, apiPath, defaults, fields, toggles]);

  function updateField(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload: Record<string, unknown> = { ...form };
    for (const field of fields) {
      if (field.type === "array" && typeof payload[field.key] === "string") {
        payload[field.key] = (payload[field.key] as string)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (field.type === "number") {
        payload[field.key] = Number(payload[field.key]);
      }
    }

    try {
      const url = isNew ? apiPath : `${apiPath}/${id}`;
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
      router.push(listPath);
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  return (
    <>
      <AdminHeader title={isNew ? `New ${title}` : `Edit ${title}`} description={description} />
      <form onSubmit={handleSubmit} className="admin-card max-w-3xl space-y-5 p-6">
        {fields.map((field) => (
          <AdminField key={field.key} label={field.type === "image" ? "" : field.label} hint={field.type === "image" ? undefined : field.hint}>
            {field.type === "image" ? (
              <ImageUpload
                label={field.label}
                hint={field.hint}
                value={String(form[field.key] ?? "")}
                onChange={(url) => updateField(field.key, url)}
                required={field.required}
              />
            ) : field.type === "textarea" || field.type === "array" ? (
              <textarea
                className="admin-input min-h-24"
                rows={field.rows ?? (field.type === "array" ? 6 : 4)}
                value={String(form[field.key] ?? "")}
                onChange={(e) => updateField(field.key, e.target.value)}
                required={field.required}
              />
            ) : field.type === "number" ? (
              <input
                type="number"
                className="admin-input max-w-[160px]"
                value={String(form[field.key] ?? 0)}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
            ) : (
              <input
                className="admin-input"
                value={String(form[field.key] ?? "")}
                onChange={(e) => updateField(field.key, e.target.value)}
                required={field.required}
              />
            )}
          </AdminField>
        ))}

        <div className="flex flex-wrap gap-6">
          {toggles.map((toggle) => (
            <AdminToggle
              key={toggle.key}
              label={toggle.label}
              checked={Boolean(form[toggle.key])}
              onChange={(v) => updateField(toggle.key, v)}
            />
          ))}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <AdminFormActions saving={saving} onCancel={() => router.push(listPath)} />
      </form>
    </>
  );
}
