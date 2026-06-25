"use client";

import { LeaderForm } from "@/components/admin/LeaderForm";

export default function LeaderFormPage({ params }: { params: Promise<{ id: string }> }) {
  return <LeaderForm params={params} />;
}
