"use client";

import { useEffect } from "react";

type ProjectViewTrackerProps = {
  slug: string;
};

export function ProjectViewTracker({ slug }: ProjectViewTrackerProps) {
  useEffect(() => {
    void fetch(`/api/portfolio/${slug}/view`, { method: "POST" }).catch(() => {});
  }, [slug]);

  return null;
}
