import { CmsImage } from "@/components/ui/CmsImage";
import { Button } from "@/components/ui/Button";
import type { NrnFeature } from "@/content/nrn";

type NrnCommunityCardsProps = {
  features: NrnFeature[];
};

export function NrnCommunityCards({ features }: NrnCommunityCardsProps) {
  return (
    <ol className="nrn-blog-grid nrn-community-grid">
      {features.map((feature) => {
        const subscribeHref = `/contact?topic=${encodeURIComponent(`Subscribe: ${feature.title}`)}`;

        return (
          <li key={feature.title}>
            <article className="nrn-blog-card">
              <div className="nrn-blog-card__media">
                <CmsImage
                  src={feature.image ?? "/images/home.jpg"}
                  alt={`${feature.title}, NEBCO Construction`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="nrn-blog-card__body">
                <h3 className="nrn-blog-card__title">{feature.title}</h3>
                <p className="nrn-blog-card__excerpt">{feature.description}</p>
                <Button href={subscribeHref} size="sm" className="nrn-blog-card__subscribe">
                  Subscribe
                </Button>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
