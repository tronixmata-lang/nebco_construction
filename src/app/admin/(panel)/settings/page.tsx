"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminField, AdminFormActions } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { NEBCO_FACEBOOK_URL } from "@/config/site";
import {
  defaultPageHeroImages,
  PAGE_HERO_IMAGE_KEYS,
  PAGE_HERO_LABELS,
  type PageHeroImages,
} from "@/config/page-images";
import { HomepageSectionsEditor } from "@/components/admin/HomepageSectionsEditor";
import { defaultHomepageSections } from "@/lib/data/site-content-defaults";
import type {
  AboutPageIntro,
  CtaBannerContent,
  HeroFeatureCard,
  HomepageSections,
} from "@/types/site-content";

type SiteContentForm = {
  hero: {
    headline: string;
    subheadline: string;
    backgroundImage: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  heroFeatureCards: HeroFeatureCard[];
  pageHeroImages: PageHeroImages;
  companyOverview: { title: string; description: string; trustPoints: string };
  about: {
    mission: string;
    vision: string;
    values: string;
    history: string;
  };
  aboutPageIntro: AboutPageIntro;
  chairmanMessage: { quote: string; author: string; role: string; image: string };
  certificateSection: { title: string; description: string };
  ctaBanner: CtaBannerContent;
  homepageSections: HomepageSections;
  siteConfig: {
    name: string;
    legalName: string;
    shortName: string;
    parentOrganization: string;
    seoTitle: string;
    url: string;
    email: string;
    phone: string;
    address: string;
    businessHours: string;
    tagline: string;
    description: string;
    logo: string;
    siteLogo: string;
    social: { facebook: string; linkedin: string; website: string };
  };
};

const emptyHeroFeatureCard = (): HeroFeatureCard => ({
  title: "",
  cta: "Explore",
  href: "",
  image: "",
  imageAlt: "",
});

const emptyForm: SiteContentForm = {
  hero: {
    headline: "",
    subheadline: "",
    backgroundImage: "",
    primaryCta: { label: "", href: "" },
    secondaryCta: { label: "", href: "" },
  },
  heroFeatureCards: [],
  pageHeroImages: { ...defaultPageHeroImages },
  companyOverview: { title: "", description: "", trustPoints: "" },
  about: { mission: "", vision: "", values: "", history: "" },
  aboutPageIntro: { eyebrow: "", title: "", description: "", backgroundAlt: "" },
  chairmanMessage: { quote: "", author: "", role: "", image: "" },
  certificateSection: { title: "", description: "" },
  ctaBanner: {
    title: "",
    description: "",
    primaryCta: { label: "", href: "" },
    secondaryCta: { label: "", href: "" },
  },
  homepageSections: {
    certificates: { ...defaultHomepageSections.certificates },
    divisions: { ...defaultHomepageSections.divisions },
    valuePillars: { ...defaultHomepageSections.valuePillars },
    featuredProjects: { ...defaultHomepageSections.featuredProjects },
    sectors: { ...defaultHomepageSections.sectors },
    testimonials: { ...defaultHomepageSections.testimonials },
    insights: { ...defaultHomepageSections.insights },
  },
  siteConfig: {
    name: "",
    legalName: "",
    shortName: "",
    parentOrganization: "",
    seoTitle: "",
    url: "",
    email: "",
    phone: "",
    address: "",
    businessHours: "",
    tagline: "",
    description: "",
    logo: "",
    siteLogo: "",
    social: { facebook: NEBCO_FACEBOOK_URL, linkedin: "", website: "https://nebco.com.np" },
  },
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteContentForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
          return;
        }
        setForm({
          hero: {
            ...emptyForm.hero,
            ...data.hero,
            backgroundImage: data.hero?.backgroundImage ?? "",
            primaryCta: { ...emptyForm.hero.primaryCta, ...data.hero?.primaryCta },
            secondaryCta: { ...emptyForm.hero.secondaryCta, ...data.hero?.secondaryCta },
          },
          pageHeroImages: {
            ...defaultPageHeroImages,
            ...data.pageHeroImages,
          },
          companyOverview: {
            ...emptyForm.companyOverview,
            ...data.companyOverview,
            trustPoints: Array.isArray(data.companyOverview?.trustPoints)
              ? data.companyOverview.trustPoints.join("\n")
              : "",
          },
          about: {
            ...emptyForm.about,
            ...data.about,
            values: Array.isArray(data.about?.values) ? data.about.values.join("\n") : "",
          },
          aboutPageIntro: { ...emptyForm.aboutPageIntro, ...data.aboutPageIntro },
          chairmanMessage: {
            ...emptyForm.chairmanMessage,
            ...data.chairmanMessage,
            image: data.chairmanMessage?.image ?? "",
          },
          certificateSection: data.certificateSection ?? emptyForm.certificateSection,
          ctaBanner: {
            ...emptyForm.ctaBanner,
            ...data.ctaBanner,
            primaryCta: { ...emptyForm.ctaBanner.primaryCta, ...data.ctaBanner?.primaryCta },
            secondaryCta: { ...emptyForm.ctaBanner.secondaryCta, ...data.ctaBanner?.secondaryCta },
          },
          homepageSections: {
            certificates: {
              ...defaultHomepageSections.certificates,
              ...data.homepageSections?.certificates,
            },
            divisions: {
              ...defaultHomepageSections.divisions,
              ...data.homepageSections?.divisions,
            },
            valuePillars: {
              ...defaultHomepageSections.valuePillars,
              ...data.homepageSections?.valuePillars,
            },
            featuredProjects: {
              ...defaultHomepageSections.featuredProjects,
              ...data.homepageSections?.featuredProjects,
            },
            sectors: {
              ...defaultHomepageSections.sectors,
              ...data.homepageSections?.sectors,
            },
            testimonials: {
              ...defaultHomepageSections.testimonials,
              ...data.homepageSections?.testimonials,
            },
            insights: {
              ...defaultHomepageSections.insights,
              ...data.homepageSections?.insights,
            },
          },
          heroFeatureCards: Array.isArray(data.heroFeatureCards)
            ? data.heroFeatureCards.map((card: HeroFeatureCard) => ({ ...card }))
            : [],
          siteConfig: {
            ...emptyForm.siteConfig,
            ...data.siteConfig,
            social: { ...emptyForm.siteConfig.social, ...data.siteConfig?.social },
          },
        });
      })
      .catch(() => setMessage("Failed to load site settings"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const payload = {
      ...form,
      companyOverview: {
        ...form.companyOverview,
        trustPoints: form.companyOverview.trustPoints
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean),
      },
      about: {
        ...form.about,
        values: form.about.values.split("\n").map((v) => v.trim()).filter(Boolean),
      },
      heroFeatureCards: form.heroFeatureCards
        .filter((card) => card.title.trim())
        .map((card) => ({
          title: card.title.trim(),
          cta: card.cta.trim() || "Explore",
          href: card.href.trim(),
          image: card.image.trim(),
          imageAlt: card.imageAlt.trim() || card.title.trim(),
        })),
    };
    try {
      const res = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Settings saved successfully! Changes appear on the public site within a minute.");
      } else {
        setMessage(data.error ?? "Failed to save settings");
      }
    } catch {
      setMessage("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  function updateHeroCard(index: number, key: keyof HeroFeatureCard, value: string) {
    setForm((prev) => ({
      ...prev,
      heroFeatureCards: prev.heroFeatureCards.map((card, i) =>
        i === index ? { ...card, [key]: value } : card,
      ),
    }));
  }

  function addHeroCard() {
    setForm((prev) => ({
      ...prev,
      heroFeatureCards: [...prev.heroFeatureCards, emptyHeroFeatureCard()],
    }));
  }

  function removeHeroCard(index: number) {
    setForm((prev) => ({
      ...prev,
      heroFeatureCards: prev.heroFeatureCards.filter((_, i) => i !== index),
    }));
  }

  if (loading) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  return (
    <>
      <AdminHeader
        title="Site Settings"
        description="Manage homepage hero, page backgrounds, about content, contact info, and global settings"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Homepage Hero</h2>
          <p className="text-sm text-[var(--admin-muted)]">
            Headline, subheadline, and full-screen background on the homepage.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Parent Organization" hint="Small text above the headline, e.g. Shah Group">
              <input
                className="admin-input"
                value={form.siteConfig.parentOrganization}
                onChange={(e) =>
                  setForm({
                    ...form,
                    siteConfig: { ...form.siteConfig, parentOrganization: e.target.value },
                  })
                }
              />
            </AdminField>
            <AdminField label="Short Name" hint="Shown next to parent organization in the hero">
              <input
                className="admin-input"
                value={form.siteConfig.shortName}
                onChange={(e) =>
                  setForm({ ...form, siteConfig: { ...form.siteConfig, shortName: e.target.value } })
                }
              />
            </AdminField>
          </div>
          <AdminField label="Headline">
            <input
              className="admin-input"
              value={form.hero.headline}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, headline: e.target.value } })}
              required
            />
          </AdminField>
          <AdminField label="Subheadline">
            <textarea
              className="admin-input min-h-20"
              value={form.hero.subheadline}
              onChange={(e) =>
                setForm({ ...form, hero: { ...form.hero, subheadline: e.target.value } })
              }
              required
            />
          </AdminField>
          <ImageUpload
            label="Homepage Hero Background"
            hint="Full-screen background image for the homepage hero section"
            value={form.hero.backgroundImage}
            onChange={(url) => setForm({ ...form, hero: { ...form.hero, backgroundImage: url } })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Primary CTA Label">
              <input
                className="admin-input"
                value={form.hero.primaryCta.label}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hero: {
                      ...form.hero,
                      primaryCta: { ...form.hero.primaryCta, label: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Primary CTA Link">
              <input
                className="admin-input"
                value={form.hero.primaryCta.href}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hero: {
                      ...form.hero,
                      primaryCta: { ...form.hero.primaryCta, href: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Phone Button Label" hint="Secondary button — links to the site phone number">
              <input
                className="admin-input"
                value={form.hero.secondaryCta.label}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hero: {
                      ...form.hero,
                      secondaryCta: { ...form.hero.secondaryCta, label: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-card space-y-5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="admin-section-title">Hero Feature Cards</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Rotating vertical cards on the right side of the homepage hero.
              </p>
            </div>
            <button
              type="button"
              onClick={addHeroCard}
              className="admin-btn-secondary inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Card
            </button>
          </div>

          {form.heroFeatureCards.map((card, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium text-[var(--admin-text)]">Card {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeHeroCard(index)}
                  className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
              <AdminField label="Title">
                <input
                  className="admin-input"
                  value={card.title}
                  onChange={(e) => updateHeroCard(index, "title", e.target.value)}
                />
              </AdminField>
              <div className="grid gap-4 sm:grid-cols-2">
                <AdminField label="Button Label">
                  <input
                    className="admin-input"
                    value={card.cta}
                    onChange={(e) => updateHeroCard(index, "cta", e.target.value)}
                  />
                </AdminField>
                <AdminField label="Link Path">
                  <input
                    className="admin-input"
                    value={card.href}
                    onChange={(e) => updateHeroCard(index, "href", e.target.value)}
                    placeholder="/divisions/construction"
                  />
                </AdminField>
              </div>
              <ImageUpload
                label="Card Image"
                value={card.image}
                onChange={(url) => updateHeroCard(index, "image", url)}
              />
              <AdminField label="Image Alt Text">
                <input
                  className="admin-input"
                  value={card.imageAlt}
                  onChange={(e) => updateHeroCard(index, "imageAlt", e.target.value)}
                />
              </AdminField>
            </div>
          ))}
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Page Hero Backgrounds</h2>
          <p className="text-sm text-[var(--admin-muted)]">
            Background images for inner page hero sections. Leave blank to use the site default.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            {PAGE_HERO_IMAGE_KEYS.map((key) => (
              <ImageUpload
                key={key}
                label={PAGE_HERO_LABELS[key]}
                hint={`Hero background for the ${PAGE_HERO_LABELS[key]} page`}
                value={form.pageHeroImages[key]}
                onChange={(url) =>
                  setForm({
                    ...form,
                    pageHeroImages: { ...form.pageHeroImages, [key]: url },
                  })
                }
              />
            ))}
          </div>
        </section>

        <HomepageSectionsEditor
          sections={form.homepageSections}
          onChange={(homepageSections) => setForm({ ...form, homepageSections })}
        />

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Company Overview</h2>
          <p className="text-sm text-[var(--admin-muted)]">Homepage section below the hero and certificates.</p>
          <AdminField label="Title">
            <input
              className="admin-input"
              value={form.companyOverview.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  companyOverview: { ...form.companyOverview, title: e.target.value },
                })
              }
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className="admin-input min-h-24"
              value={form.companyOverview.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  companyOverview: { ...form.companyOverview, description: e.target.value },
                })
              }
            />
          </AdminField>
          <AdminField label="Trust Points (one per line)" hint="Bullet list under the company overview text">
            <textarea
              className="admin-input min-h-32 font-mono text-sm"
              value={form.companyOverview.trustPoints}
              onChange={(e) =>
                setForm({
                  ...form,
                  companyOverview: { ...form.companyOverview, trustPoints: e.target.value },
                })
              }
            />
          </AdminField>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">CTA Banner</h2>
          <p className="text-sm text-[var(--admin-muted)]">
            Red call-to-action block at the bottom of most pages.
          </p>
          <AdminField label="Title">
            <input
              className="admin-input"
              value={form.ctaBanner.title}
              onChange={(e) =>
                setForm({ ...form, ctaBanner: { ...form.ctaBanner, title: e.target.value } })
              }
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className="admin-input min-h-24"
              value={form.ctaBanner.description}
              onChange={(e) =>
                setForm({ ...form, ctaBanner: { ...form.ctaBanner, description: e.target.value } })
              }
            />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Primary Button Label">
              <input
                className="admin-input"
                value={form.ctaBanner.primaryCta.label}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ctaBanner: {
                      ...form.ctaBanner,
                      primaryCta: { ...form.ctaBanner.primaryCta, label: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Primary Button Link">
              <input
                className="admin-input"
                value={form.ctaBanner.primaryCta.href}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ctaBanner: {
                      ...form.ctaBanner,
                      primaryCta: { ...form.ctaBanner.primaryCta, href: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Secondary Button Label">
              <input
                className="admin-input"
                value={form.ctaBanner.secondaryCta.label}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ctaBanner: {
                      ...form.ctaBanner,
                      secondaryCta: { ...form.ctaBanner.secondaryCta, label: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Secondary Button Link">
              <input
                className="admin-input"
                value={form.ctaBanner.secondaryCta.href}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ctaBanner: {
                      ...form.ctaBanner,
                      secondaryCta: { ...form.ctaBanner.secondaryCta, href: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Certificates Section</h2>
          <p className="text-sm text-[var(--admin-muted)]">Heading and intro on the homepage certificates block.</p>
          <AdminField label="Title">
            <input
              className="admin-input"
              value={form.certificateSection.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  certificateSection: { ...form.certificateSection, title: e.target.value },
                })
              }
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className="admin-input min-h-24"
              value={form.certificateSection.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  certificateSection: { ...form.certificateSection, description: e.target.value },
                })
              }
            />
          </AdminField>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">About Page Intro</h2>
          <p className="text-sm text-[var(--admin-muted)]">Hero text at the top of the /about page.</p>
          <AdminField label="Eyebrow">
            <input
              className="admin-input"
              value={form.aboutPageIntro.eyebrow}
              onChange={(e) =>
                setForm({
                  ...form,
                  aboutPageIntro: { ...form.aboutPageIntro, eyebrow: e.target.value },
                })
              }
            />
          </AdminField>
          <AdminField label="Title">
            <input
              className="admin-input"
              value={form.aboutPageIntro.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  aboutPageIntro: { ...form.aboutPageIntro, title: e.target.value },
                })
              }
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className="admin-input min-h-24"
              value={form.aboutPageIntro.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  aboutPageIntro: { ...form.aboutPageIntro, description: e.target.value },
                })
              }
            />
          </AdminField>
          <AdminField label="Hero Image Alt Text">
            <input
              className="admin-input"
              value={form.aboutPageIntro.backgroundAlt}
              onChange={(e) =>
                setForm({
                  ...form,
                  aboutPageIntro: { ...form.aboutPageIntro, backgroundAlt: e.target.value },
                })
              }
            />
          </AdminField>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">About Page Content</h2>
          <AdminField label="Mission">
            <textarea
              className="admin-input"
              value={form.about.mission}
              onChange={(e) => setForm({ ...form, about: { ...form.about, mission: e.target.value } })}
            />
          </AdminField>
          <AdminField label="Vision">
            <textarea
              className="admin-input"
              value={form.about.vision}
              onChange={(e) => setForm({ ...form, about: { ...form.about, vision: e.target.value } })}
            />
          </AdminField>
          <AdminField label="Values (one per line)">
            <textarea
              className="admin-input min-h-32"
              value={form.about.values}
              onChange={(e) => setForm({ ...form, about: { ...form.about, values: e.target.value } })}
            />
          </AdminField>
          <AdminField label="History">
            <textarea
              className="admin-input min-h-32"
              value={form.about.history}
              onChange={(e) => setForm({ ...form, about: { ...form.about, history: e.target.value } })}
            />
          </AdminField>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Chairman Message</h2>
          <AdminField label="Quote">
            <textarea
              className="admin-input min-h-32"
              value={form.chairmanMessage.quote}
              onChange={(e) =>
                setForm({
                  ...form,
                  chairmanMessage: { ...form.chairmanMessage, quote: e.target.value },
                })
              }
            />
          </AdminField>
          <ImageUpload
            label="Chairman Photo"
            hint="Portrait shown alongside the chairman's message on the homepage"
            value={form.chairmanMessage.image}
            onChange={(url) =>
              setForm({ ...form, chairmanMessage: { ...form.chairmanMessage, image: url } })
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Author">
              <input
                className="admin-input"
                value={form.chairmanMessage.author}
                onChange={(e) =>
                  setForm({
                    ...form,
                    chairmanMessage: { ...form.chairmanMessage, author: e.target.value },
                  })
                }
              />
            </AdminField>
            <AdminField label="Role">
              <input
                className="admin-input"
                value={form.chairmanMessage.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    chairmanMessage: { ...form.chairmanMessage, role: e.target.value },
                  })
                }
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Contact & Site Info</h2>
          <p className="text-sm text-[var(--admin-muted)]">
            Shown in the footer, contact page, and phone button on the homepage hero.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <ImageUpload
              label="Header Logo"
              hint="Large logo in the site header"
              value={form.siteConfig.logo}
              onChange={(url) =>
                setForm({ ...form, siteConfig: { ...form.siteConfig, logo: url } })
              }
            />
            <ImageUpload
              label="Footer Logo"
              hint="Square logo shown in the footer"
              value={form.siteConfig.siteLogo}
              onChange={(url) =>
                setForm({ ...form, siteConfig: { ...form.siteConfig, siteLogo: url } })
              }
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Company Name">
              <input
                className="admin-input"
                value={form.siteConfig.name}
                onChange={(e) =>
                  setForm({ ...form, siteConfig: { ...form.siteConfig, name: e.target.value } })
                }
              />
            </AdminField>
            <AdminField label="Legal Name">
              <input
                className="admin-input"
                value={form.siteConfig.legalName}
                onChange={(e) =>
                  setForm({ ...form, siteConfig: { ...form.siteConfig, legalName: e.target.value } })
                }
              />
            </AdminField>
          </div>
          <AdminField label="Site Tagline" hint="Footer tagline">
            <input
              className="admin-input"
              value={form.siteConfig.tagline}
              onChange={(e) =>
                setForm({ ...form, siteConfig: { ...form.siteConfig, tagline: e.target.value } })
              }
            />
          </AdminField>
          <AdminField label="Site Description" hint="Footer summary and default SEO description">
            <textarea
              className="admin-input min-h-24"
              value={form.siteConfig.description}
              onChange={(e) =>
                setForm({ ...form, siteConfig: { ...form.siteConfig, description: e.target.value } })
              }
            />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="SEO Title" hint="Default browser tab title and Google listing title">
              <input
                className="admin-input"
                value={form.siteConfig.seoTitle}
                onChange={(e) =>
                  setForm({ ...form, siteConfig: { ...form.siteConfig, seoTitle: e.target.value } })
                }
              />
            </AdminField>
            <AdminField label="Site URL" hint="Canonical site URL, e.g. https://nebco.com.np">
              <input
                className="admin-input"
                value={form.siteConfig.url}
                onChange={(e) =>
                  setForm({ ...form, siteConfig: { ...form.siteConfig, url: e.target.value } })
                }
              />
            </AdminField>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Email">
              <input
                className="admin-input"
                value={form.siteConfig.email}
                onChange={(e) =>
                  setForm({ ...form, siteConfig: { ...form.siteConfig, email: e.target.value } })
                }
              />
            </AdminField>
            <AdminField label="Phone">
              <input
                className="admin-input"
                value={form.siteConfig.phone}
                onChange={(e) =>
                  setForm({ ...form, siteConfig: { ...form.siteConfig, phone: e.target.value } })
                }
              />
            </AdminField>
          </div>
          <AdminField label="Address">
            <input
              className="admin-input"
              value={form.siteConfig.address}
              onChange={(e) =>
                setForm({ ...form, siteConfig: { ...form.siteConfig, address: e.target.value } })
              }
            />
          </AdminField>
          <AdminField label="Business Hours">
            <input
              className="admin-input"
              value={form.siteConfig.businessHours}
              onChange={(e) =>
                setForm({
                  ...form,
                  siteConfig: { ...form.siteConfig, businessHours: e.target.value },
                })
              }
            />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Facebook URL">
              <input
                className="admin-input"
                value={form.siteConfig.social.facebook}
                onChange={(e) =>
                  setForm({
                    ...form,
                    siteConfig: {
                      ...form.siteConfig,
                      social: { ...form.siteConfig.social, facebook: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Website URL">
              <input
                className="admin-input"
                value={form.siteConfig.social.website}
                onChange={(e) =>
                  setForm({
                    ...form,
                    siteConfig: {
                      ...form.siteConfig,
                      social: { ...form.siteConfig.social, website: e.target.value },
                    },
                  })
                }
              />
            </AdminField>
          </div>
        </section>

        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <AdminFormActions saving={saving} onCancel={() => window.location.reload()} />
      </form>
    </>
  );
}
