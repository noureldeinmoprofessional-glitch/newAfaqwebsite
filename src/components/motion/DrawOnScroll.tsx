"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { cn } from "@/lib/utils";

/**
 * Draws any descendant SVG stroke marked `.draw-path` via strokeDashoffset when
 * the block scrolls into view — the "blueprint line drawing" motion (brief).
 * Each path should set `pathLength="1"`. Reduced motion shows lines drawn.
 */
export function DrawOnScroll({
  children,
  className,
  start = "top 80%",
  duration = 1.6,
  stagger = 0.15,
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  duration?: number;
  stagger?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const node = root.current;
    const paths = node?.querySelectorAll<SVGPathElement>(".draw-path");
    if (!node || !paths?.length) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration,
        ease: "power2.out",
        stagger,
        scrollTrigger: { trigger: node, start, once: true },
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(paths, { strokeDashoffset: 0 });
    });
  }, root, []);

  return (
    <div ref={root} className={cn(className)}>
      {children}
    </div>
  );
}
