"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { fadeUp } from "@/lib/gsap/animations";

/**
 * Phase 0 motion smoke-test. Reveals its direct children with GSAP inside a
 * scoped context (auto-reverted on unmount). Under `prefers-reduced-motion:
 * reduce` the children are set to their final state instantly — no timeline.
 *
 * The `.reveal-group > *` CSS guard (globals.css) hides the children only when
 * JS is present, so non-JS users always see the final state and there is no
 * hydration flash.
 */
export function MotionCheck({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      const node = root.current;
      if (!node) return;
      const targets = gsap.utils.toArray<HTMLElement>(node.children);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        fadeUp(targets, { stagger: 0.08 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      });
    },
    root,
    [],
  );

  return (
    <div ref={root} className="reveal-group">
      {children}
    </div>
  );
}
