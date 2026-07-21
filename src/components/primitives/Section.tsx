import type { ElementType, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

export type Surface = "ink-900" | "ink-800" | "ink-700" | "white" | "mist-50" | "mist-100";

const surfaceClasses: Record<Surface, string> = {
  "ink-900": "bg-ink-900 text-mist-50",
  "ink-800": "bg-ink-800 text-mist-50",
  "ink-700": "bg-ink-700 text-mist-50",
  white: "bg-white text-slate-900",
  "mist-50": "bg-mist-50 text-slate-900",
  "mist-100": "bg-mist-100 text-slate-900",
};

interface SectionProps {
  surface?: Surface;
  as?: ElementType;
  className?: string;
  /** Remove the default vertical section padding when composing custom layouts. */
  flush?: boolean;
  id?: string;
  children: ReactNode;
  /** Optional ref forwarded to the rendered element (used to scope GSAP). */
  ref?: Ref<HTMLElement>;
}

/**
 * A full-bleed page section with a surface color and the standard vertical
 * rhythm (clamp 96–180px). Section order should alternate surfaces — never two
 * adjacent sections with the same one.
 */
export function Section({
  surface = "ink-900",
  as: Tag = "section",
  className,
  flush = false,
  id,
  children,
  ref,
}: SectionProps) {
  return (
    <Tag
      ref={ref}
      id={id}
      data-surface={surface}
      className={cn(
        "relative w-full",
        surfaceClasses[surface],
        !flush && "py-section",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
