import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * A grid of logo placeholders. Partner / technology identities render as text
 * marks inside uniform framed tiles, monochrome by default and revealing the
 * brand accent on hover — the site convention pending brand-approved logos.
 * Swap the inner <span> for an <img> once real logo assets are supplied.
 */
export function LogoMarks({
  names,
  variant = "light",
}: {
  names: string[];
  variant?: "light" | "dark";
}) {
  return (
    <Reveal
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      stagger={0.03}
    >
      {names.map((name) => (
        <div
          key={name}
          className={cn(
            "group/mark flex h-20 items-center justify-center rounded-card border px-4 text-center transition-all duration-300 hover:-translate-y-0.5",
            variant === "dark"
              ? "border-mist-50/10 bg-white/[0.02] hover:border-brand-400/40 hover:bg-white/[0.04]"
              : "border-line bg-white hover:border-brand-500/40 hover:shadow-md hover:shadow-ink-900/5",
          )}
        >
          <span
            className={cn(
              "font-display text-small font-medium leading-tight transition-colors duration-300 md:text-body",
              variant === "dark"
                ? "text-mist-50/45 group-hover/mark:text-brand-400"
                : "text-slate-900/40 group-hover/mark:text-brand-600",
            )}
          >
            {name}
          </span>
        </div>
      ))}
    </Reveal>
  );
}
