"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  status: string;
  notes?: string;
  createdAt: string;
};

export default function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [status, setStatus] = useState("new");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/admin/inquiries/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setInquiry(data);
          setStatus(data.status ?? "new");
          setNotes(data.notes ?? "");
        });
    });
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inquiry) return;
    setSaving(true);
    await fetch(`/api/admin/inquiries/${inquiry._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    setSaving(false);
    router.push("/admin/inquiries");
  }

  if (!inquiry) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  return (
    <>
      <AdminHeader title="Inquiry Details" description={`From ${inquiry.name} — ${new Date(inquiry.createdAt).toLocaleString()}`} />

      <div className="admin-card mb-6 space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><p className="text-xs text-[var(--admin-muted)]">Name</p><p className="text-[var(--brand-charcoal)]">{inquiry.name}</p></div>
          <div><p className="text-xs text-[var(--admin-muted)]">Email</p><p className="text-[var(--brand-charcoal)]">{inquiry.email}</p></div>
          {inquiry.phone && <div><p className="text-xs text-[var(--admin-muted)]">Phone</p><p className="text-[var(--brand-charcoal)]">{inquiry.phone}</p></div>}
          {inquiry.organization && <div><p className="text-xs text-[var(--admin-muted)]">Organization</p><p className="text-[var(--brand-charcoal)]">{inquiry.organization}</p></div>}
        </div>
        <div><p className="text-xs text-[var(--admin-muted)]">Subject</p><p className="font-medium text-[var(--brand-charcoal)]">{inquiry.subject}</p></div>
        <div><p className="text-xs text-[var(--admin-muted)]">Message</p><p className="whitespace-pre-wrap text-[var(--admin-text)]">{inquiry.message}</p></div>
      </div>

      <form onSubmit={handleSubmit} className="admin-card max-w-xl space-y-4 p-6">
        <AdminField label="Status">
          <select className="admin-input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </AdminField>
        <AdminField label="Internal Notes">
          <textarea className="admin-input min-h-24" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </AdminField>
        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/inquiries")} />
      </form>
    </>
  );
}
