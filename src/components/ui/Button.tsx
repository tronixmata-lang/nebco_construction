import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-neutral hover:bg-primary-dark focus-visible:ring-primary",
  secondary:
    "bg-secondary text-neutral hover:bg-secondary/90 focus-visible:ring-secondary",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-neutral focus-visible:ring-primary",
  ghost:
    "text-secondary hover:bg-neutral-muted focus-visible:ring-secondary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

export function Button({
  variant = "primary",
  size = "md",
  pill = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    "font-button inline-flex items-center justify-center font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    pill
      ? "rounded-full tracking-normal normal-case"
      : "rounded-sm tracking-wide uppercase",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href } = props;
    if (isExternalHref(href)) {
      return (
        <a href={href} className={styles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick, name, id, form, value } =
    props as ButtonAsButton;

  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
      name={name}
      id={id}
      form={form}
      value={value}
    >
      {children}
    </button>
  );
}
