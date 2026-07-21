"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle engineering-inspired background overlays rendered as inline SVG so they
 * inherit `currentColor` and can be tinted per surface. Kept at 3–8% opacity to
 * stay elegant (brief §Background System). Purely decorative — always aria-hidden.
 *
 * Client component so each instance can mint a unique pattern id via useId —
 * avoids duplicate-id collisions when many overlays share the page.
 *
 * Variants:
 *  - grid    : GIS / coordinate grid
 *  - topo    : topographic contour lines
 *  - terrain : wireframe terrain perspective
 *  - survey  : survey markers + crosshairs
 */
type Variant = "grid" | "topo" | "terrain" | "survey";

interface TechBackgroundProps {
  variant?: Variant;
  className?: string;
  /** 0–100. Opacity of the overlay. Defaults to 5 (%). */
  opacity?: number;
}

export function TechBackground({
  variant = "grid",
  className,
  opacity = 5,
}: TechBackgroundProps) {
  const uid = useId().replace(/[:]/g, "");

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity: opacity / 100 }}
    >
      {variant === "grid" && <GridPattern uid={uid} />}
      {variant === "topo" && <TopoPattern />}
      {variant === "terrain" && <TerrainPattern />}
      {variant === "survey" && <SurveyPattern uid={uid} />}
    </div>
  );
}

function GridPattern({ uid }: { uid: string }) {
  const id = `grid-${uid}`;
  return (
    <svg
      className="h-full w-full text-current"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M72 0H0V72" fill="none" stroke="currentColor" strokeWidth="1" />
          <path
            d="M36 0V72M0 36H72"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <circle cx="0" cy="0" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function TopoPattern() {
  // Concentric organic contours suggesting elevation lines.
  return (
    <svg
      className="h-full w-full text-current"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const s = 1 + i * 0.28;
        return (
          <path
            key={i}
            d="M300 180 C 400 160 470 240 460 320 C 452 400 380 470 300 460 C 210 448 150 380 160 300 C 168 232 220 196 300 180 Z"
            stroke="currentColor"
            strokeWidth={1 / s}
            transform={`translate(${300 - 300 * s} ${300 - 300 * s}) scale(${s})`}
            opacity={1 - i * 0.06}
          />
        );
      })}
    </svg>
  );
}

function TerrainPattern() {
  // Perspective wireframe mesh.
  const rows = 14;
  const cols = 18;
  const lines: React.ReactNode[] = [];
  for (let r = 0; r <= rows; r++) {
    const y = 200 + r * 22 * (0.4 + r / rows);
    lines.push(
      <line key={`h${r}`} x1="0" y1={y} x2="1000" y2={y} stroke="currentColor" strokeWidth="0.75" />,
    );
  }
  for (let c = 0; c <= cols; c++) {
    const xTop = 500 + (c - cols / 2) * 24;
    const xBot = 500 + (c - cols / 2) * 62;
    lines.push(
      <line key={`v${c}`} x1={xTop} y1="200" x2={xBot} y2="640" stroke="currentColor" strokeWidth="0.75" />,
    );
  }
  return (
    <svg
      className="h-full w-full text-current"
      viewBox="0 0 1000 640"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {lines}
    </svg>
  );
}

function SurveyPattern({ uid }: { uid: string }) {
  const id = `survey-${uid}`;
  return (
    <svg
      className="h-full w-full text-current"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} width="200" height="200" patternUnits="userSpaceOnUse">
          <circle cx="100" cy="100" r="26" stroke="currentColor" strokeWidth="1" />
          <path
            d="M100 60V140M60 100H140"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M20 20l12 0M20 20l0 12M180 20l-12 0M180 20l0 12"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
