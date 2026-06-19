import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

function ContactItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 text-sm text-neutral/70">
      <span className="mt-0.5 shrink-0 text-accent">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-neutral-border bg-secondary text-neutral">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-neutral-border" />

      <Container className="py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="text-center lg:col-span-5 lg:text-left">
            <Link href="/" className="inline-block">
              <div className="inline-flex items-center gap-4 rounded-sm border border-neutral/10 bg-neutral/5 px-5 py-4">
                <Image
                  src={siteConfig.siteLogo}
                  alt={`${siteConfig.name} logo`}
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
                <div>
                  <p className="text-xl tracking-tight text-neutral">
                    {siteConfig.shortName}
                  </p>
                  <p className="text-xs tracking-wide text-neutral/60">
                    {siteConfig.legalName}
                  </p>
                </div>
              </div>
            </Link>

            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-neutral/75 lg:mx-0">
              {siteConfig.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-neutral uppercase">
                Since 1995
              </span>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase">
                A-Class Certified
              </span>
              <span className="rounded-full border border-neutral/20 bg-neutral/5 px-3 py-1 text-xs font-semibold tracking-wide text-neutral/80 uppercase">
                Shah Group
              </span>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {footerNavigation.divisions.map((division) => (
                <Link
                  key={division.href}
                  href={division.href}
                  className="rounded-sm border border-neutral/15 bg-neutral/5 px-3 py-1.5 text-xs font-medium text-neutral/80 transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {division.label}
                </Link>
              ))}
            </div>

            <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left lg:mx-0 lg:max-w-none">
              <ContactItem
                icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              >
                {siteConfig.address}
              </ContactItem>
              <ContactItem
                icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                }
              >
                <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-neutral">
                  {siteConfig.phone}
                </a>
              </ContactItem>
              <ContactItem
                icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
              >
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-neutral">
                  {siteConfig.email}
                </a>
              </ContactItem>
            </ul>
          </div>

          <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left lg:col-span-7">
            <div>
              <h3 className="mb-4 text-sm tracking-widest text-accent uppercase">
                Company
              </h3>
              <ul className="space-y-2.5">
                {footerNavigation.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral/70 transition-colors hover:text-neutral"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm tracking-widest text-accent uppercase">
                Divisions
              </h3>
              <ul className="space-y-2.5">
                {footerNavigation.divisions.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral/70 transition-colors hover:text-neutral"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm tracking-widest text-accent uppercase">
                Resources
              </h3>
              <ul className="space-y-2.5">
                {footerNavigation.resources.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral/70 transition-colors hover:text-neutral"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral/15 pt-8 md:flex-row">
          <div className="text-center text-sm text-neutral/50 md:text-left">
            <p>
              &copy; {currentYear} {siteConfig.legalName} All rights reserved.
            </p>
            <p className="mt-1">
              Developed by{" "}
              <span className="font-medium text-neutral/70">Nepatronix</span>
            </p>
          </div>
          <p className="text-sm tracking-wide text-neutral/40">
            {siteConfig.tagline}
          </p>
          <div className="flex gap-6 text-sm text-neutral/50">
            <Link href="/legal/privacy" className="transition-colors hover:text-neutral">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-neutral">
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
