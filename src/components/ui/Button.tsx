import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
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

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-sm font-medium tracking-wide uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href } = props;
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
