import { CmsImage } from "@/components/ui/CmsImage";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import type { InsightArticle } from "@/types";

const DEFAULT_INSIGHT_IMAGE = "/images/pexels-mike-van-schoonderwalt-1884800-5505119.jpg";

type InsightCardProps = {
  article: InsightArticle;
  titleTag?: "h2" | "h3";
};

function insightImageAlt(article: InsightArticle) {
  return `${article.title} — NEBCO Construction`;
}

export function InsightCard({ article, titleTag: TitleTag = "h2" }: InsightCardProps) {
  const imageSrc = article.image ?? DEFAULT_INSIGHT_IMAGE;

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <Link
        href={`/insights/${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-secondary"
        tabIndex={-1}
        aria-hidden="true"
      >
        <CmsImage
          src={imageSrc}
          alt={insightImageAlt(article)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <span className="block h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">{article.category}</p>
        <TitleTag
          className={cn(
            "mt-2 font-display text-secondary",
            TitleTag === "h3" ? "text-lg" : "text-xl",
          )}
        >
          <Link href={`/insights/${article.slug}`} className="transition-colors hover:text-primary">
            {article.title}
          </Link>
        </TitleTag>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-neutral-border pt-4 text-xs text-text-muted">
          <span>{formatDate(article.date)}</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}
