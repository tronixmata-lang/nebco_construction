import { CmsImage } from "@/components/ui/CmsImage";
import { nrnServiceInsights } from "@/content/insights";
import Link from "next/link";

export function NrnServiceBlogs() {
  return (
    <ol className="nrn-blog-grid">
      {nrnServiceInsights.map((article, index) => (
        <li key={article.slug}>
          <article className="nrn-blog-card">
            <Link
              href={`/insights/${article.slug}`}
              className="nrn-blog-card__media"
              tabIndex={-1}
              aria-hidden="true"
            >
              <CmsImage
                src={article.image ?? "/images/home.jpg"}
                alt={`${article.title}, NEBCO Construction`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
            <div className="nrn-blog-card__body">
              <p className="nrn-blog-card__meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">/</span>
                <span>{article.topic}</span>
              </p>
              <h3 className="nrn-blog-card__title">
                <Link href={`/insights/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="nrn-blog-card__excerpt">{article.excerpt}</p>
              <div className="nrn-blog-card__footer">
                <span>{article.readTime}</span>
                <Link href={`/insights/${article.slug}`} className="nrn-blog-card__read">
                  Read article
                </Link>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
