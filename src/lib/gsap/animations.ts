"use client";

/**
 * Reusable animation factories. Keep motion primitives here so every section
 * shares the same easing, timing, and RTL handling.
 *
 * All horizontal motion consumes `dir` (1 = LTR, -1 = RTL) so mirroring is
 * automatic — see getDirectionMultiplier in @/i18n/direction.
 */
import { gsap } from "./index";
import { easeOut, easeExpo, easeLinear, timing } from "./easings";
import type { DirectionMultiplier } from "@/i18n/direction";

type Target = gsap.TweenTarget;

/** Fade + rise. The workhorse reveal. */
export function fadeUp(
  target: Target,
  opts: { y?: number; duration?: number; stagger?: number; delay?: number } = {},
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { opacity: 0, y: opts.y ?? 24 },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? timing.reveal,
      stagger: opts.stagger ?? 0,
      delay: opts.delay ?? 0,
      ease: easeOut,
    },
  );
}

/** Line-by-line clip reveal for large display type (expects pre-split lines). */
export function revealLines(
  lines: Target,
  opts: { stagger?: number; delay?: number } = {},
): gsap.core.Tween {
  return gsap.fromTo(
    lines,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 1,
      ease: easeExpo,
      stagger: opts.stagger ?? 0.09,
      delay: opts.delay ?? 0,
    },
  );
}

/**
 * Draw an SVG path/line via strokeDashoffset (no DrawSVGPlugin dependency).
 * The element must have `pathLength="1"` (or a matching dasharray) so the
 * offset animates cleanly from 1 → 0.
 */
export function drawLine(
  target: Target,
  opts: { duration?: number; delay?: number } = {},
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    {
      strokeDashoffset: 0,
      duration: opts.duration ?? timing.reveal,
      delay: opts.delay ?? 0,
      ease: easeOut,
    },
  );
}

/** Count a numeric value up from 0. Duration scales with magnitude by default. */
export function countUp(
  node: HTMLElement,
  value: number,
  opts: { duration?: number; suffix?: string; prefix?: string } = {},
): gsap.core.Tween {
  const proxy = { v: 0 };
  const duration =
    opts.duration ?? gsap.utils.clamp(0.9, 2.0, 0.9 + value / 1000);
  const prefix = opts.prefix ?? "";
  const suffix = opts.suffix ?? "";
  return gsap.to(proxy, {
    v: value,
    duration,
    ease: easeOut,
    onUpdate: () => {
      node.textContent = `${prefix}${Math.round(proxy.v)}${suffix}`;
    },
  });
}

/** Diagonal grid stagger reveal. */
export function staggerGrid(
  cells: Target,
  opts: { each?: number; from?: gsap.StaggerVars["from"] } = {},
): gsap.core.Tween {
  return gsap.fromTo(
    cells,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: timing.reveal,
      ease: easeOut,
      stagger: { each: opts.each ?? timing.stagger, from: opts.from ?? "start" },
    },
  );
}

/** Scrubbed vertical parallax for images. Attach your own ScrollTrigger. */
export function parallaxImage(
  target: Target,
  opts: { yPercent?: number } = {},
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { yPercent: opts.yPercent ?? -12 },
    { yPercent: opts.yPercent ? -opts.yPercent : 12, ease: "none" },
  );
}

/** Infinite horizontal marquee. Direction inverts with `dir`. */
export function marquee(
  track: Target,
  dir: DirectionMultiplier,
  opts: { duration?: number; xPercent?: number } = {},
): gsap.core.Tween {
  const distance = (opts.xPercent ?? -50) * dir;
  return gsap.to(track, {
    xPercent: distance,
    duration: opts.duration ?? 30,
    ease: easeLinear,
    repeat: -1,
  });
}
