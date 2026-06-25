const iconBaseProps = {
  className: "h-7 w-7",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const sectorIcons: Record<string, React.ReactNode> = {
  residential: (
    <svg {...iconBaseProps}>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9h.01M9 12h.01M9 15h.01" />
    </svg>
  ),
  commercial: (
    <svg {...iconBaseProps}>
      <path d="M3 21h18" />
      <path d="M6 21V5l6-3 6 3v16" />
      <path d="M10 9h4M10 13h4M10 17h4" />
    </svg>
  ),
  infrastructure: (
    <svg {...iconBaseProps}>
      <path d="M2 20h20" />
      <path d="M5 20V10l7-5 7 5v10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  design: (
    <svg {...iconBaseProps}>
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
    </svg>
  ),
  "real-estate": (
    <svg {...iconBaseProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  consulting: (
    <svg {...iconBaseProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export function SectorIcon({ id, className }: { id: string; className?: string }) {
  const icon = sectorIcons[id];
  if (!icon) return null;
  return <span className={className}>{icon}</span>;
}
