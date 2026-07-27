"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { countUp } from "@/lib/gsap/animations";
import { cn } from "@/lib/utils";

/**
 * A single statistic that counts up from 0 once, when scrolled into view.
 * Numerals are kept LTR (western digits) in both locales for engineering data.
 * Reduced motion shows the final value immediately.
 */
interface CountUpStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** Optional supporting line under the label. */
  sublabel?: string;
  className?: string;
  size?: "stat" | "display";
  tone?: "brand" | "gold" | "ink";
}

const toneClass: Record<NonNullable<CountUpStatProps["tone"]>, string> = {
  brand: "text-brand-600",
  gold: "text-brand-400",
  ink: "text-slate-900",
};

export function CountUpStat({
  value,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  className,
  size = "stat",
  tone = "brand",
}: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const el = ref.current?.querySelector<HTMLElement>("[data-count]");
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => countUp(el, value, { suffix, prefix }),
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      el.textContent = `${prefix}${value}${suffix}`;
    });
  }, ref, []);

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)}>
      <span
        data-count
        dir="ltr"
        className={cn(
          "block font-display font-bold leading-none tracking-[-0.03em] tabular-nums",
          size === "display" ? "text-display" : "text-stat",
          toneClass[tone],
        )}
      >
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="text-eyebrow uppercase tracking-[0.12em] text-slate-600">{label}</span>
      {sublabel && <span className="text-body text-slate-500">{sublabel}</span>}
    </div>
  );
}
