"use client";

import { useState } from "react";
import type { NrnFeatureCategory } from "@/content/nrn";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { CmsImage } from "@/components/ui/CmsImage";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type NrnPortalShowcaseProps = {
  category: NrnFeatureCategory;
};

const TRACK = [
  "Site photos",
  "Progress",
  "Money",
  "Reports",
  "Family",
  "Concerns",
  "Live visit",
  "Approvals",
  "Alerts",
] as const;

const PHOTOS = [
  {
    src: "/images/home3.jpg",
    when: "Today · 09:14 NPT",
    note: "Slab curing · east bay",
  },
  {
    src: "/images/site/1-81_11zon.jpg",
    when: "Today · 08:52 NPT",
    note: "Column ties · L2",
  },
  {
    src: "/images/home2.jpg",
    when: "Yesterday · 16:40 NPT",
    note: "Material delivery",
  },
  {
    src: "/images/home.jpg",
    when: "Yesterday · 11:05 NPT",
    note: "Street front · Lazimpat",
  },
] as const;

export function NrnPortalShowcase({ category }: NrnPortalShowcaseProps) {
  const [active, setActive] = useState(0);
  const current = category.features[active] ?? category.features[0];

    return (
    <div className="nrn-portal">
      <div className="nrn-portal__copy">
        <ul className="nrn-portal__list">
          {category.features.map((feature, index) => {
            const selected = index === active;
            return (
              <li key={feature.title}>
                <button
                  type="button"
                  className={cn("nrn-portal__item", selected && "nrn-portal__item--active")}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                >
                  <BrandIcon
                    title={feature.title}
                    fallbackIndex={index}
                    alt=""
                    className="nrn-portal__item-icon"
                  />
                  <span>
                    <span className="nrn-portal__item-title">{feature.title}</span>
                    <span className="nrn-portal__item-desc">{feature.description}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="nrn-portal__frame">
        <div className="nrn-portal__topbar">
          <CmsImage
            src={siteConfig.logo}
            alt=""
            width={160}
            height={48}
            className="h-8 w-auto object-contain"
          />
          <p className="nrn-portal__login">You · NRN owner · Dubai</p>
        </div>

        <div className="nrn-portal__project">
          <div>
            <p className="nrn-portal__stat-label">Your project</p>
            <p className="font-display text-lg text-secondary">Sharma Residence, Lazimpat</p>
          </div>
          <dl className="nrn-portal__project-meta">
            <div>
              <dt>Watching</dt>
              <dd>You + 3 family</dd>
            </div>
            <div>
              <dt>Last site update</dt>
              <dd>2 hrs ago</dd>
            </div>
          </dl>
        </div>

        <div className="nrn-portal__body">
          <aside className="nrn-portal__nav">
            <p className="font-display text-sm text-accent">Track build</p>
            <ul>
              {TRACK.map((item, index) => (
                <li key={item}>
                  <button
                    type="button"
                    className={cn(
                      "nrn-portal__nav-item",
                      index === active && "nrn-portal__nav-item--active",
                    )}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="nrn-portal__main" key={active}>
            <PortalScreen index={active} title={current.title} description={current.description} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PortalScreen({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  if (index === 0) {
    return (
      <>
        <p className="nrn-portal__screen-kicker">Confirm it is your site</p>
        <h3 className="nrn-portal__screen-title">{title}</h3>
        <div className="nrn-portal__photos">
          {PHOTOS.map((photo) => (
            <figure key={photo.src}>
              <CmsImage src={photo.src} alt="" width={320} height={180} className="h-24 w-full object-cover" />
              <figcaption>
                <strong>{photo.when}</strong>
                {photo.note}
                <em>27.72°N · 85.32°E · GPS verified</em>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="nrn-portal__caption">Uploaded by site engineer B. K. Mandal, not a gallery photo.</p>
      </>
    );
  }

  if (index === 1) {
    return (
      <>
        <p className="nrn-portal__screen-kicker">Where the build stands</p>
        <h3 className="nrn-portal__screen-title">Structure L2 · 62% of this phase</h3>
        <p className="nrn-portal__next">Next for you: independent inspection before the L2 payment is released.</p>
        <ul className="nrn-portal__phases">
          {[
            ["Foundation", "Done", "100%"],
            ["Structure L1", "Done", "100%"],
            ["Structure L2", "Now", "62%"],
            ["MEP", "Queued", "12%"],
            ["Handover", "Later", "0%"],
          ].map(([label, state, value], i) => (
            <li key={label} className={i === 2 ? "is-active" : undefined}>
              <span>{label}</span>
              <span className="nrn-portal__bar">
                <span style={{ width: value }} />
              </span>
              <em>{state}</em>
            </li>
          ))}
        </ul>
        <p className="nrn-portal__caption">Started 12 Mar · expected finish 18 Jun · you last viewed this from Dubai.</p>
      </>
    );
  }

  if (index === 2) {
    return (
      <>
        <p className="nrn-portal__screen-kicker">Your money on this build</p>
        <h3 className="nrn-portal__screen-title">NPR 1.51 Cr spent of 2.4 Cr approved</h3>
        <p className="nrn-portal__next">Next draw: Phase 3, only after L2 inspection is shared with you.</p>
        <ul className="nrn-portal__budget">
          {[
            ["Materials", "NPR 78 L", "78%"],
            ["Labour", "NPR 41 L", "64%"],
            ["Permits", "NPR 9 L", "91%"],
            ["Held back", "NPR 22 L", "22%"],
          ].map(([label, amount, value]) => (
            <li key={label}>
              <span>{label}</span>
              <span className="nrn-portal__bar">
                <span style={{ width: value }} />
              </span>
              <em>{amount}</em>
            </li>
          ))}
        </ul>
        <p className="nrn-portal__caption">{description}</p>
      </>
    );
  }

  if (index === 3) {
    return (
      <div className="nrn-portal__report">
        <p className="nrn-portal__screen-kicker">Inbox, without chasing the site</p>
        <h3 className="nrn-portal__screen-title">May 2026 pack · PDF ready</h3>
        <p className="nrn-portal__caption">
          Emailed to you (Dubai) and family viewers (Kathmandu) on 1 Jun. Same photos, spend, and next milestone.
        </p>
        <ul>
          <li>Work this month: slab pour, column ties</li>
          <li>Spend this month: NPR 18.4 Lakh</li>
          <li>Next milestone you should watch: roof structure</li>
          <li>Download also sits in the portal if email is missed</li>
        </ul>
      </div>
    );
  }

  if (index === 4) {
    return (
      <>
        <p className="nrn-portal__screen-kicker">Same project, two countries</p>
        <h3 className="nrn-portal__screen-title">Family in Nepal can watch with you</h3>
        <p className="nrn-portal__next">They see photos and progress, they cannot approve spend. Only you can.</p>
        <ul className="nrn-portal__people">
          <li>
            <strong>Parents · Maharajgunj</strong>
            <span>Read-only · last opened yesterday</span>
          </li>
          <li>
            <strong>Sister · Baneshwor</strong>
            <span>Read-only · visited site Sunday</span>
          </li>
          <li>
            <strong>Local caretaker</strong>
            <span>Photos only · no budget</span>
          </li>
        </ul>
      </>
    );
  }

  if (index === 5) {
    return (
      <div className="nrn-portal__ticket">
        <p className="nrn-portal__screen-kicker">You raised this from Dubai</p>
        <h3 className="nrn-portal__screen-title">Window alignment, east elevation</h3>
        <ol className="nrn-portal__thread">
          <li>
            <strong>You</strong>
            <span>Looks off vs. the drawing. Please show a close-up before plaster.</span>
          </li>
          <li>
            <strong>Engineer · site</strong>
            <span>Photo pack attached. Reply due in 18 hrs. No extra cost unless you approve a change.</span>
          </li>
        </ol>
        <p className="nrn-portal__badge">Open until you mark it resolved</p>
      </div>
    );
  }

  if (index === 6) {
    return (
      <div className="nrn-portal__call">
        <CmsImage
          src="/images/home3.jpg"
          alt=""
          width={640}
          height={360}
          className="h-40 w-full object-cover"
        />
        <p className="nrn-portal__screen-kicker">Walk the site without flying home</p>
        <h3 className="nrn-portal__screen-title">Saturday live visit · 15 min</h3>
        <p className="nrn-portal__tz">
          <span>You · 10:00 GST (Dubai)</span>
          <span>Site · 11:45 NPT (Kathmandu)</span>
        </p>
        <p className="nrn-portal__caption">
          Engineer walks camera through L2. Ask to stop on any wall, slab, or finish.
        </p>
        <p className="nrn-portal__badge">Join from the portal, no extra app</p>
      </div>
    );
  }

  if (index === 7) {
    return (
      <>
        <p className="nrn-portal__screen-kicker">Nothing extra starts without you</p>
        <h3 className="nrn-portal__screen-title">1 change waiting for the NRN owner</h3>
        <p className="nrn-portal__next">Family viewers can see this. Only your account can approve.</p>
        <ul className="nrn-portal__orders">
          <li className="is-active">
            <span>
              <strong>Marble upgrade, lobby</strong>
              +NPR 1.2 L · waiting
            </span>
            <span>Approve</span>
          </li>
          <li>
            <span>
              <strong>Extra balcony railing</strong>
              Approved 4 May
            </span>
            <span>Done</span>
          </li>
        </ul>
      </>
    );
  }

  return (
    <>
      <p className="nrn-portal__screen-kicker">Stay in the loop without logging in daily</p>
      <h3 className="nrn-portal__screen-title">Today’s alerts on WhatsApp + SMS</h3>
      <ul className="nrn-portal__alerts">
        <li>
          <strong>Milestone</strong>
          Structure L2 reached 62% · sent 09:20 GST
        </li>
        <li>
          <strong>Payment</strong>
          Tranche 4 is ready after inspection · not charged yet
        </li>
        <li>
          <strong>Inspection</strong>
          Third-party report shared with you and family
        </li>
      </ul>
      <p className="nrn-portal__caption">Same three channels: portal, WhatsApp, SMS, so a missed email is not a missed update.</p>
    </>
  );
}
