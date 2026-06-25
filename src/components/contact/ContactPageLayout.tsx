import { cn } from "@/lib/utils";

type ContactPageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function ContactPageLayout({ children, className }: ContactPageLayoutProps) {
  return (
    <div className={cn("contact-page relative isolate font-medium", className)}>
      {children}
    </div>
  );
}
