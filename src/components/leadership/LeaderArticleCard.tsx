import Image from "next/image";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import type { LeaderArticle } from "@/types";

const DEFAULT_ARTICLE_IMAGE = "/images/pexels-mike-van-schoonderwalt-1884800-5505119.jpg";

type LeaderArticleCardProps = {
  leaderId: string;
  article: LeaderArticle;
  titleTag?: "h2" | "h3";
};

export function LeaderArticleCard({
  leaderId,
  article,
  titleTag: TitleTag = "h3",
}: LeaderArticleCardProps) {
  const imageSrc = article.image ?? DEFAULT_ARTICLE_IMAGE;
  const href = `/leadership/${leaderId}/${article.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-accent/45 bg-neutral transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden bg-secondary"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={imageSrc}
          alt={`${article.title}, NEBCO Leadership`}
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
          <Link href={href} className="transition-colors hover:text-primary">
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
