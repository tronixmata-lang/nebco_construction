type TrustedBadgeProps = {
  label?: string;
  variant?: "primary" | "accent";
};

export function TrustedBadge({
  label = "Trusted",
  variant = "accent",
}: TrustedBadgeProps) {
  const styles =
    variant === "primary"
      ? "bg-primary/10 text-primary"
      : "bg-accent/10 text-accent";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${styles}`}
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      {label}
    </span>
  );
}
