"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeOut, timing } from "@/lib/gsap/easings";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal for a group of children. Each direct child rises and
 * fades in with a stagger the first time the block scrolls into view. This is
 * the workhorse for the homepage's "scroll-triggered storytelling".
 *
 * The `.reveal-group > *` guard in globals.css hides children only when JS is
 * present, so non-JS and pre-hydration states always show the final layout.
 * Under reduced motion, children snap to their final state — no timeline.
 */
interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Per-child stagger (seconds). */
  stagger?: number;
  /** Rise distance (px). */
  y?: number;
  /** ScrollTrigger start. */
  start?: string;
  /** Treat children individually (default) or animate the whole block as one. */
  once?: boolean;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = timing.stagger,
  y = 28,
  start = "top 82%",
  once = true,
}: RevealProps) {
  const root = useRef<HTMLElement>(null);

  useGsapContext(
    () => {
      const node = root.current;
      if (!node) return;
      const targets = gsap.utils.toArray<HTMLElement>(node.children);
      if (!targets.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: timing.reveal,
            ease: easeOut,
            stagger,
            scrollTrigger: {
              trigger: node,
              start,
              once,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { opacity: 1, y: 0 });
      });
    },
    root,
    [],
  );

  return (
    <Tag ref={root} className={cn("reveal-group", className)}>
      {children}
    </Tag>
  );
}

export { ScrollTrigger };
