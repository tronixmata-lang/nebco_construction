import type { NrnFeatureCategory } from "@/content/nrn";
import { BrandIcon } from "@/components/ui/BrandIcon";
import type { BrandIconName } from "@/lib/brand-icons";

type NrnTrustGridProps = {
  features: NrnFeatureCategory["features"];
};

const TRUST_ICONS: BrandIconName[] = [
  "integrity",
  "quality",
  "investment",
  "consulting",
  "timelyDelivery",
  "innovation",
];

export function NrnTrustGrid({ features }: NrnTrustGridProps) {
  return (
    <ol className="nrn-trust-grid">
      {features.map((feature, index) => (
        <li key={feature.title} className="nrn-trust-card">
          <span className="nrn-trust-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="nrn-trust-card__icon">
            <BrandIcon
              name={TRUST_ICONS[index] ?? "integrity"}
              alt=""
              className="nrn-trust-card__brand-icon"
            />
          </div>
          <h3 className="nrn-trust-card__title">{feature.title}</h3>
          <p className="nrn-trust-card__desc">{feature.description}</p>
        </li>
      ))}
    </ol>
  );
}
