function ShieldIcon() {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const badges = [
  {
    label: "Since 1995",
    className: "bg-primary text-neutral",
    icon: true,
  },
  {
    label: "A-Class Certified",
    className: "border border-accent/50 bg-accent/10 text-accent",
    icon: true,
  },
  {
    label: "Shah Group",
    className: "border border-neutral-border bg-neutral-muted text-secondary",
    icon: false,
  },
] as const;

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase md:px-3 md:text-xs ${badge.className}`}
        >
          {badge.icon && <ShieldIcon />}
          {badge.label}
        </span>
      ))}
    </div>
  );
}
