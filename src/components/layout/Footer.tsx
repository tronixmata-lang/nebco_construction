import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "@/config/navigation";
import { CmsImage } from "@/components/ui/CmsImage";
import { Container } from "@/components/ui/Container";
import { SiteSocialLinks } from "@/components/ui/SiteSocialLinks";
import { BrandIcon } from "@/components/ui/BrandIcon";

export type FooterSiteConfig = {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  parentOrganization: string;
  siteLogo?: string;
  social: {
    website: string;
    facebook: string;
    linkedin: string;
  };
};

type FooterProps = {
  siteConfig: FooterSiteConfig;
};

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

export function Footer({ siteConfig }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-neutral-border bg-secondary text-neutral">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-neutral-border" />

      <Container className="py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="text-center lg:col-span-5 lg:text-left">
            <Link href="/" className="inline-block">
              <div className="inline-flex items-center gap-4 rounded-sm border border-neutral/10 bg-neutral/5 px-5 py-4">
                {siteConfig.siteLogo ? (
                  <CmsImage
                    src={siteConfig.siteLogo}
                    alt={`${siteConfig.name} logo`}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                ) : (
                  <Image
                    src="/images/site/NEBCO-Logo.png"
                    alt={`${siteConfig.name} logo`}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                )}
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
              <span className="font-label rounded-full bg-primary px-3 py-1 text-xs text-neutral">
                Since 1995
              </span>
              <span className="font-label rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent">
                A-Class Certified
              </span>
              <span className="font-label rounded-full border border-neutral/20 bg-neutral/5 px-3 py-1 text-xs text-neutral/80">
                {siteConfig.parentOrganization}
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

            <ul className="footer-contact mx-auto mt-8 max-w-sm space-y-3 text-left lg:mx-0 lg:max-w-none">
              <ContactItem icon={<BrandIcon title="Office" className="h-8 w-8" surface="dark" alt="" />}>
                {siteConfig.address}
              </ContactItem>
              <ContactItem icon={<BrandIcon title="Phone" className="h-8 w-8" surface="dark" alt="" />}>
                <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-neutral">
                  {siteConfig.phone}
                </a>
              </ContactItem>
              <ContactItem icon={<BrandIcon title="Email" className="h-8 w-8" surface="dark" alt="" />}>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-neutral">
                  {siteConfig.email}
                </a>
              </ContactItem>
            </ul>

            <SiteSocialLinks variant="dark" className="mt-8" social={siteConfig.social} />
          </div>

          <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left lg:col-span-7">
            <div>
              <h3 className="font-label mb-4 text-sm text-accent">
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
              <h3 className="font-label mb-4 text-sm text-accent">
                Our Verticals
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
              <h3 className="font-label mb-4 text-sm text-accent">
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
