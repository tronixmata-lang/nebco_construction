import type { NrnFeatureCategory } from "@/content/nrn";
import { siteConfig } from "@/config/site";
import { CmsImage } from "@/components/ui/CmsImage";

type NrnTargetVennProps = {
  features: NrnFeatureCategory["features"];
};

const SETS = [
  { short: "Gulf NRN", slot: "a" },
  { short: "USA · UK · AU", slot: "b" },
  { short: "Family-build", slot: "c" },
  { short: "Investor", slot: "d" },
] as const;

export function NrnTargetVenn({ features }: NrnTargetVennProps) {
  const items = features.slice(0, 4);

  if (items.length < 4) {
    return null;
  }

  return (
    <div className="nrn-union">
      <div className="nrn-union__stage">
        {SETS.map((set) => (
          <div
            key={set.slot}
            className={`nrn-union__petal nrn-union__petal--${set.slot}`}
          >
            <span className="nrn-union__set" />
            <h3 className="nrn-union__title">{set.short}</h3>
          </div>
        ))}

        <div className="nrn-union__hub">
          <CmsImage
            src={siteConfig.logo}
            alt={`${siteConfig.shortName} logo`}
            width={320}
            height={96}
            className="nrn-union__logo"
          />
        </div>
      </div>

      <ol className="nrn-union__descriptions">
        {items.map((feature, index) => (
          <li
            key={feature.title}
            className={`nrn-union__description nrn-union__description--${SETS[index].slot}`}
          >
            <h3 className="nrn-union__description-title">{SETS[index].short}</h3>
            <p className="nrn-union__description-copy">{feature.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
