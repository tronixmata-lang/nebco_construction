type MissionVisionCardsProps = {
  mission: string;
  vision: string;
};

function MissionVisionCard({
  label,
  title,
  body,
  accent,
}: {
  label: string;
  title: string;
  body: string;
  accent: "primary" | "accent";
}) {
  const accentStyles = {
    primary: {
      stripe: "bg-primary",
      icon: "bg-primary/10 text-primary",
      label: "text-primary",
    },
    accent: {
      stripe: "bg-accent",
      icon: "bg-accent/10 text-accent",
      label: "text-accent",
    },
  }[accent];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-neutral-border/80 bg-neutral p-8 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-border hover:shadow-lg sm:p-10">
      <span
        className={`absolute top-0 left-0 h-full w-1 ${accentStyles.stripe} transition-all duration-300 group-hover:w-1.5`}
        aria-hidden="true"
      />
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${accentStyles.icon}`}
          aria-hidden="true"
        >
          {accent === "primary" ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </span>
        <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${accentStyles.label}`}>
          {label}
        </p>
      </div>
      <h2 className="mt-6 font-display text-2xl tracking-tight text-secondary sm:text-[1.65rem]">
        {title}
      </h2>
      <p className="mt-4 flex-1 text-base leading-relaxed text-text-muted">{body}</p>
    </article>
  );
}

export function MissionVisionCards({ mission, vision }: MissionVisionCardsProps) {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
      <MissionVisionCard
        label="Mission"
        title="Our Mission"
        body={mission}
        accent="primary"
      />
      <MissionVisionCard
        label="Vision"
        title="Our Vision"
        body={vision}
        accent="accent"
      />
    </div>
  );
}
