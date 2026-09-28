import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outline-dark" | "solid-light";
type Size = "sm" | "md" | "lg";

/**
 * Pill button with a trailing circular arrow badge (brand identity, per the
 * company profile). `primary` is a solid green pill with a dark badge; the
 * outline variants are transparent with a green badge for dark / light surfaces.
 * Renders a locale-aware `Link` when `href` is given, otherwise a `<button>`.
 */
const base =
  "group/btn inline-flex items-center rounded-full font-display font-medium " +
  "transition-[background-color,border-color,color] duration-300 ease-out select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-ink-900 hover:bg-brand-400",
  outline:
    "border border-mist-50/30 bg-transparent text-mist-50 hover:border-brand-400 hover:text-brand-400",
  "outline-dark":
    "border border-line bg-transparent text-slate-900 hover:border-brand-500 hover:text-brand-600",
  "solid-light": "bg-ink-900 text-mist-50 hover:bg-ink-800",
};

/** Badge (circle) colours per variant. */
const badges: Record<Variant, string> = {
  primary: "bg-ink-900 text-brand-400",
  outline: "bg-brand-500 text-ink-900",
  "outline-dark": "bg-brand-500 text-ink-900",
  "solid-light": "bg-brand-500 text-ink-900",
};

const sizes: Record<Size, { pad: string; badge: string; icon: string }> = {
  sm: { pad: "ps-4 pe-1 py-1 text-small gap-2.5", badge: "size-7", icon: "size-3.5" },
  md: { pad: "ps-5 pe-1.5 py-1.5 text-small gap-3", badge: "size-8", icon: "size-4" },
  lg: { pad: "ps-7 pe-2 py-2 text-body gap-3", badge: "size-10", icon: "size-4" },
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  /** Show the trailing arrow badge (default true). */
  arrow?: boolean;
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

export function Button({
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  const s = sizes[size];
  const classes = cn(base, variants[variant], s.pad, className);

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5",
            badges[variant],
            s.badge,
          )}
          aria-hidden="true"
        >
          <ArrowRight className={cn(s.icon, "rtl:rotate-180")} strokeWidth={2.5} />
        </span>
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as LinkProps)}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {content}
    </button>
  );
}
