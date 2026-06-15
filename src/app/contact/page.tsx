import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { divisions } from "@/content/divisions";
import { siteConfig } from "@/config/site";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  breadcrumbSchema,
  contactFaq,
  createPageMetadata,
  faqSchema,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact NEBCO for construction, investment, and consulting inquiries in Kathmandu, Nepal. Call +977-9803850955 or email nebconepal@gmail.com.",
  path: "/contact",
});

const contactItems = [
  {
    title: "Office",
    value: siteConfig.address,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    title: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    title: "Business Hours",
    value: siteConfig.businessHours,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("/contact"),
          faqSchema([...contactFaq]),
        ]}
      />
      <PageIntro
        eyebrow="Contact"
        title="Get in Touch"
        description="Whether you have a project in mind or want to explore a partnership, our trusted team is ready to help."
        showStats={false}
      />

      <Section variant="muted" className="pt-10 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="rounded-sm border border-neutral-border bg-neutral p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] sm:p-8 md:p-10">
              <SectionHeader
                eyebrow="Inquiry Form"
                title="Send an Inquiry"
                description="Tell us about your project. We respond with transparency and professional guidance within two business days."
                className="mb-8"
              />
              <ContactForm />
            </div>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-sm border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-primary">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-secondary">Response Time</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    Our team reviews every inquiry and responds within 2 business days with clear next steps.
                  </p>
                </div>
              </div>
            </div>

            {contactItems.map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-neutral-border bg-neutral p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center text-primary">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-secondary">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="mt-2 block text-sm text-text-muted transition-colors hover:text-primary">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Visit Us"
              title="Our Kathmandu Office"
              description="Located in Kuleshwor, our office is open Sunday through Friday. Walk-ins are welcome — we recommend scheduling a visit for project consultations."
            />
            <p className="font-medium text-secondary">{siteConfig.address}</p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-2 inline-block text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              {siteConfig.phone}
            </a>
          </div>
          <div className="overflow-hidden rounded-sm border border-neutral-border shadow-sm">
            <iframe
              title="NEBCO office location in Kuleshwor, Kathmandu"
              src="https://www.openstreetmap.org/export/embed.html?bbox=85.295%2C27.698%2C85.305%2C27.708&layer=mapnik&marker=27.703%2C85.300"
              className="h-64 w-full border-0 md:h-72"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          eyebrow="Divisions"
          title="Reach the Right Team"
          description="Not sure where to start? Select a division below or use the form above and we will route your inquiry to the right specialists."
          align="center"
          className="mx-auto"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={division.href}
              className="group rounded-sm border border-neutral-border bg-neutral p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:text-left"
            >
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                {division.shortName}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-secondary transition-colors group-hover:text-primary">
                {division.name}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{division.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-primary uppercase">
                Learn more
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBanner showContactButton={false} />
    </>
  );
}
