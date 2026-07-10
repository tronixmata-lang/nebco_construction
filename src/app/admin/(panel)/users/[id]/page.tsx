"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";

type UserForm = {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "editor";
  isActive: boolean;
};

const emptyForm: UserForm = {
  name: "",
  email: "",
  password: "",
  role: "editor",
  isActive: true,
};

export default function UserFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<UserForm>(emptyForm);
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
      fetch(`/api/admin/users/${paramId}`)
        .then((r) => {
          if (r.status === 403) {
            router.push("/admin");
            return null;
          }
          return r.json();
        })
        .then((data) => {
          if (!data) return;
          setForm({
            name: data.name ?? "",
            email: data.email ?? "",
            password: "",
            role: data.role ?? "editor",
            isActive: data.isActive ?? true,
          });
        })
        .finally(() => setLoading(false));
    });
  }, [params, router]);

  function updateField<K extends keyof UserForm>(key: K, value: UserForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload: Record<string, unknown> = {
      name: form.name,
      email: form.email,
      role: form.role,
      isActive: form.isActive,
    };
    if (form.password) payload.password = form.password;
    if (isNew && !form.password) {
      setError("Password is required for new users");
      setSaving(false);
      return;
    }

    try {
      const url = isNew ? "/api/admin/users" : `/api/admin/users/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? { ...payload, password: form.password } : payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      router.push("/admin/users");
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
        title={isNew ? "New Admin User" : "Edit Admin User"}
        description="Superadmins have full access including user management. Editors can manage content only."
      />

      <form onSubmit={handleSubmit} className="admin-card max-w-xl space-y-5 p-6">
        <AdminField label="Full Name">
          <input className="admin-input" value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
        </AdminField>

        <AdminField label="Email Address">
          <input type="email" className="admin-input" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
        </AdminField>

        <AdminField label={isNew ? "Password" : "New Password"} hint={isNew ? "Minimum 8 characters" : "Leave blank to keep current password"}>
          <input
            type="password"
            className="admin-input"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            required={isNew}
            minLength={8}
          />
        </AdminField>

        <AdminField label="Role">
          <select className="admin-input" value={form.role} onChange={(e) => updateField("role", e.target.value as UserForm["role"])}>
            <option value="editor">Editor, content management only</option>
            <option value="superadmin">Superadmin, full access</option>
          </select>
        </AdminField>

        <AdminToggle label="Account active" checked={form.isActive} onChange={(v) => updateField("isActive", v)} />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/users")} />
      </form>
    </>
  );
}
