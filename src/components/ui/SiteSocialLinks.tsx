import { NEBCO_FACEBOOK_URL, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  GlobeIcon,
  LinkedInIcon,
  type SocialIconComponent,
} from "@/components/ui/SocialIcons";

type SiteSocialLinksProps = {
  variant?: "light" | "dark";
  className?: string;
  label?: string;
};

type SocialEntry = {
  href: string;
  label: string;
  icon: SocialIconComponent;
};

function SocialIconButton({
  href,
  label,
  icon: Icon,
  variant,
}: SocialEntry & { variant: "light" | "dark" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200",
        variant === "dark"
          ? "border-neutral/20 bg-neutral/5 text-neutral/70 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
          : "border-neutral-border bg-neutral-muted text-text-muted hover:border-accent/50 hover:bg-accent/10 hover:text-accent",
      )}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

export function getSiteSocialEntries(): SocialEntry[] {
  const facebook = siteConfig.social.facebook || NEBCO_FACEBOOK_URL;
  const { linkedin, website } = siteConfig.social;
  const entries: SocialEntry[] = [];

  if (facebook) {
    entries.push({ href: facebook, label: "NEBCO on Facebook", icon: FacebookIcon });
  }
  if (linkedin) {
    entries.push({ href: linkedin, label: "NEBCO on LinkedIn", icon: LinkedInIcon });
  }
  if (website) {
    entries.push({ href: website, label: "NEBCO website", icon: GlobeIcon });
  }

  return entries;
}

export function SiteSocialLinks({
  variant = "dark",
  className,
  label = "Follow Us",
}: SiteSocialLinksProps) {
  const links = getSiteSocialEntries();

  if (links.length === 0) return null;

  return (
    <div className={className}>
      <p
        className={cn(
          "mb-3 text-xs font-semibold tracking-widest uppercase",
          variant === "dark" ? "text-accent" : "text-accent",
        )}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <SocialIconButton key={link.href} {...link} variant={variant} />
        ))}
      </div>
    </div>
  );
}
