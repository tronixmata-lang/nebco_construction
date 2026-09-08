import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { BrandIcon } from "@/components/ui/BrandIcon";

type MissionVisionCardsProps = {
  mission: string;
  vision: string;
  animated?: boolean;
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
      label: "text-primary",
    },
    accent: {
      stripe: "bg-accent",
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
        <span className="flex shrink-0 items-center justify-center">
          <BrandIcon
            name={accent === "primary" ? "mission" : "vision"}
            className="h-[170px] w-[170px]"
            alt=""
          />
        </span>
        <p className={`font-label text-xs ${accentStyles.label}`}>
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

export function MissionVisionCards({ mission, vision, animated = false }: MissionVisionCardsProps) {
  const cards = (
    <>
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
    </>
  );

  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
      {animated ? (
        <StaggerReveal className="contents" staggerMs={120}>
          {cards}
        </StaggerReveal>
      ) : (
        cards
      )}
    </div>
  );
}
