"use client";

import { ProjectForm } from "@/components/admin/ProjectForm";

export default function ProjectFormPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProjectForm params={params} />;
}
