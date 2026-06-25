"use client";

import { DivisionForm } from "@/components/admin/DivisionForm";

export default function DivisionFormPage({ params }: { params: Promise<{ id: string }> }) {
  return <DivisionForm params={params} />;
}
