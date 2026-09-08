import type { ReactNode } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function DivisionIcon({
  id,
  className,
  surface,
}: {
  id: string;
  className?: string;
  surface?: "light" | "dark";
}) {
  return <BrandIcon name={id} className={className} surface={surface} alt={`${id} vertical`} />;
}

export const divisionIcons: Record<string, ReactNode> = {
  construction: <DivisionIcon id="construction" />,
  investment: <DivisionIcon id="investment" />,
  consulting: <DivisionIcon id="consulting" />,
};
