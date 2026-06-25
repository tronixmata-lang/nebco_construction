import { CmsImage } from "@/components/ui/CmsImage";
import Link from "next/link";
import { NEBCO_FACEBOOK_URL } from "@/config/site";
import { cn } from "@/lib/utils";
import { FacebookIcon, LinkedInIcon, MailIcon } from "@/components/ui/SocialIcons";
import type { Leader } from "@/types";

type SocialFallback = {
  facebook?: string;
  linkedin?: string;
};

type LeadershipTeamProps = {
  leaders: Leader[];
  socialFallback?: SocialFallback;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = /^(https?:|mailto:)/i.test(href);

  return (
    <a
      href={href}
      target={external && !href.startsWith("mailto:") ? "_blank" : undefined}
      rel={external && !href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-border bg-neutral-muted text-text-muted transition-all duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
    >
      {children}
    </a>
  );
}

function LeaderCard({
  leader,
  socialFallback,
}: {
  leader: Leader;
  socialFallback?: SocialFallback;
}) {
  const facebook = leader.facebook || socialFallback?.facebook || NEBCO_FACEBOOK_URL;
  const linkedin = leader.linkedin || socialFallback?.linkedin;
  const email = leader.email;
  const hasSocial = Boolean(facebook || linkedin || email);

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral transition-all duration-300 hover:-translate-y-2 hover:border-primary/25 hover:shadow-xl">
      <Link href={`/leadership/${leader.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          {leader.image ? (
            <CmsImage
              src={leader.image}
              alt={leader.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary via-secondary to-primary/70">
              <span className="font-display text-5xl font-bold text-neutral/15 select-none">
                {getInitials(leader.name)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-lg leading-tight text-neutral">{leader.name}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{leader.role}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="flex-1 text-sm leading-relaxed text-text-muted">{leader.bio}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-primary uppercase">
            View profile
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </Link>

      {hasSocial && (
        <div className="flex items-center gap-2 border-t border-neutral-border px-5 py-4">
          {linkedin && (
            <SocialButton href={linkedin} label={`${leader.name} on LinkedIn`}>
              <LinkedInIcon className="h-4 w-4" />
            </SocialButton>
          )}
          {facebook && (
            <SocialButton href={facebook} label={`${leader.name} on Facebook`}>
              <FacebookIcon className="h-4 w-4" />
            </SocialButton>
          )}
          {email && (
            <SocialButton href={`mailto:${email}`} label={`Email ${leader.name}`}>
              <MailIcon className="h-4 w-4" />
            </SocialButton>
          )}
        </div>
      )}

      <span className="block h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
    </article>
  );
}

export function LeadershipTeam({ leaders, socialFallback }: LeadershipTeamProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4")}>
      {leaders.map((leader) => (
        <LeaderCard key={leader.id} leader={leader} socialFallback={socialFallback} />
      ))}
    </div>
  );
}
