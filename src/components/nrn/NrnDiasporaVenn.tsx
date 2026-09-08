import type { NrnFeatureCategory } from "@/content/nrn";

type NrnDiasporaVennProps = {
  features: NrnFeatureCategory["features"];
};

function shortTitle(title: string) {
  return title.replace(/\s+page$/i, "").replace(/\s+landing$/i, "");
}

export function NrnDiasporaVenn({ features }: NrnDiasporaVennProps) {
  const gulf = features[0];
  const western = features[1];
  const family = features[2];
  const investor = features[3];

  return (
    <div className="nrn-venn" aria-label="NRN audience paths">
      <div className="nrn-venn__stage">
        <div className="nrn-venn__circle nrn-venn__circle--left" aria-hidden="true" />
        <div className="nrn-venn__circle nrn-venn__circle--right" aria-hidden="true" />

        {gulf && (
          <article className="nrn-venn__label nrn-venn__label--left">
            <p className="nrn-venn__num">01</p>
            <h3>{shortTitle(gulf.title)}</h3>
            <p>{gulf.description}</p>
          </article>
        )}

        {western && (
          <article className="nrn-venn__label nrn-venn__label--right">
            <p className="nrn-venn__num">02</p>
            <h3>{shortTitle(western.title)}</h3>
            <p>{western.description}</p>
          </article>
        )}

        <div className="nrn-venn__overlap">
          {family && (
            <article className="nrn-venn__label nrn-venn__label--family">
              <p className="nrn-venn__num">03</p>
              <h3>{shortTitle(family.title)}</h3>
              <p>{family.description}</p>
            </article>
          )}
          {investor && (
            <article className="nrn-venn__label nrn-venn__label--investor">
              <p className="nrn-venn__num">04</p>
              <h3>{shortTitle(investor.title)}</h3>
              <p>{investor.description}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
