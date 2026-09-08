import { BrandIcon } from "@/components/ui/BrandIcon";

const SECTOR_ICON_NAMES: Record<string, string> = {
  residential: "residential",
  commercial: "commercial",
  infrastructure: "infrastructure",
  design: "architectural",
  "real-estate": "realEstate",
  consulting: "consultingAlt",
};

export function SectorIcon({
  id,
  className,
  surface,
}: {
  id: string;
  className?: string;
  surface?: "light" | "dark";
}) {
  return (
    <BrandIcon
      name={SECTOR_ICON_NAMES[id] ?? id}
      className={className}
      surface={surface}
      alt=""
    />
  );
}
