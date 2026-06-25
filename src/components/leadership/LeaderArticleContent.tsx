import type { Leader, LeaderArticle } from "@/types";
import { formatDate } from "@/lib/utils";

type LeaderArticleContentProps = {
  leader: Leader;
  article: LeaderArticle;
};

export function LeaderArticleContent({ leader, article }: LeaderArticleContentProps) {
  return (
    <>
      <div className="mb-10 rounded-sm border border-accent/30 bg-accent/5 px-6 py-5 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
          Author
        </p>
        <p className="mt-2 font-display text-lg text-secondary">{leader.name}</p>
        <p className="mt-1 text-sm text-text-muted">{leader.role}</p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-neutral-border pb-6 text-sm text-text-muted">
        <span>{formatDate(article.date)}</span>
        <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" aria-hidden="true" />
        <span>{article.readTime}</span>
        <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" aria-hidden="true" />
        <span className="font-medium text-accent">{article.category}</span>
      </div>

      <article>
        <p className="font-display text-xl leading-relaxed text-secondary md:text-2xl md:leading-snug">
          {article.excerpt}
        </p>
        <div className="my-8 h-px w-16 bg-accent" aria-hidden="true" />
        <div className="space-y-6">
          {article.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-text-muted md:text-lg md:leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
