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

export const divisionIcons: Record<string, React.ReactNode> = {
  construction: (
    <svg {...iconBaseProps}>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9h.01M9 12h.01M9 15h.01" />
    </svg>
  ),
  investment: (
    <svg {...iconBaseProps}>
      <path d="M3 21h18" />
      <path d="M4 21V8l5-3 5 3v13" />
      <path d="M14 21v-9l5-2v11" />
      <path d="M8 11h.01M8 15h.01" />
    </svg>
  ),
  consulting: (
    <svg {...iconBaseProps}>
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
};
