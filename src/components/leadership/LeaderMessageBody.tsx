type LeaderMessageBodyProps = {
  paragraphs: string[];
};

export function LeaderMessageBody({ paragraphs }: LeaderMessageBodyProps) {
  if (paragraphs.length === 0) return null;

  const [lead, ...rest] = paragraphs;

  return (
    <article className="relative mx-auto max-w-3xl overflow-hidden rounded-sm border border-neutral-border/70 bg-neutral px-8 py-10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] sm:px-10 sm:py-12 md:px-12 md:py-14">
      <span
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-accent to-primary/40"
        aria-hidden="true"
      />

      <header className="mb-8 pl-1">
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
          Full Statement
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-0.5 w-10 rounded-full bg-accent" aria-hidden="true" />
          <span className="h-px flex-1 max-w-[120px] bg-neutral-border" aria-hidden="true" />
        </div>
      </header>

      <p className="pl-1 font-display text-xl font-medium leading-relaxed text-secondary md:text-[1.35rem] md:leading-relaxed lg:text-2xl lg:leading-snug">
        {lead}
      </p>

      {rest.length > 0 && (
        <div className="mt-10 space-y-6 border-t border-neutral-border/70 pt-10 pl-1">
          {rest.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-[1.85] text-text-muted md:text-[1.05rem]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}
