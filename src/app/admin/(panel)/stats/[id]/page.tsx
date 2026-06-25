"use client";

import { StatForm } from "@/components/admin/StatForm";

export default function StatFormPage({ params }: { params: Promise<{ id: string }> }) {
  return <StatForm params={params} />;
}
