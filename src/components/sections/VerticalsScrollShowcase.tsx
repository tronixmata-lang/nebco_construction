import { VerticalsScrollGrid } from "@/components/sections/VerticalsScrollGrid";
import type { Division } from "@/types";

type VerticalsScrollShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  divisions: Division[];
};

export function VerticalsScrollShowcase({
  eyebrow,
  title,
  description,
  divisions,
}: VerticalsScrollShowcaseProps) {
  return (
    <section
      id="divisions"
      className="relative overflow-x-clip bg-neutral-muted py-14 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-neutral-border/80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      <VerticalsScrollGrid
        divisions={divisions}
        featuredId="consulting"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
    </section>
  );
}
