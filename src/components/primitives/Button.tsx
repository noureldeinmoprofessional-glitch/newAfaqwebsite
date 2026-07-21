import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "solid-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-display font-medium " +
  "transition-colors duration-[400ms] ease-out select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-ink-900 hover:bg-brand-400",
  ghost:
    "border border-line-inv text-current hover:border-brand-500 hover:text-brand-400",
  "solid-light": "bg-ink-900 text-mist-50 hover:bg-ink-800",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkProps = StyleProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;

type NativeButtonProps = StyleProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

type ButtonProps = LinkProps | NativeButtonProps;

/**
 * Primary interactive control. Renders a locale-aware `Link` when `href` is
 * provided, otherwise a `<button>`. Square-ish 8px radius, no shadow.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as LinkProps)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
