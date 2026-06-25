"use client";

import { SectorForm } from "@/components/admin/SectorForm";

export default function SectorFormPage({ params }: { params: Promise<{ id: string }> }) {
  return <SectorForm params={params} />;
}
