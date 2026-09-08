"use client";

import { useState } from "react";
import Link from "next/link";
import type { NrnFeatureCategory } from "@/content/nrn";
import { nrnExperts } from "@/content/nrn";
import { CmsImage } from "@/components/ui/CmsImage";
import { cn } from "@/lib/utils";

type NrnExpertConsultProps = {
  category: NrnFeatureCategory;
};

export function NrnExpertConsult({ category }: NrnExpertConsultProps) {
  const [active, setActive] = useState(0);
  const feature = category.features[active] ?? category.features[0];
  const team = [0, 1, 2, 3].map((offset) => nrnExperts[(active + offset) % nrnExperts.length]);

  return (
    <div className="nrn-network">
      <nav className="nrn-network__nav" aria-label="Specialist desks">
        {category.features.map((item, i) => (
          <h3 key={item.title} className="nrn-network__tab-heading">
            <button
              type="button"
              className={cn("nrn-network__tab", i === active && "is-active")}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              {item.title}
            </button>
          </h3>
        ))}
      </nav>

      <ul className="nrn-network__grid" key={active}>
        {team.map((expert) => {
          const bookHref = `/nrn/book?expert=${encodeURIComponent(expert.name)}&topic=${encodeURIComponent(feature.title)}`;
          return (
            <li key={expert.name} className="nrn-net-card nrn-net-card--expert">
              <CmsImage
                src={expert.image}
                alt=""
                width={480}
                height={360}
                className="nrn-net-card__photo"
              />
              <h3 className="nrn-net-card__title">{expert.name}</h3>
              <p className="nrn-net-card__kicker">{expert.experience}</p>
              <p className="nrn-net-card__remarks">{expert.description}</p>
              <Link href={bookHref} className="nrn-net-card__book">
                Book appointment
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
