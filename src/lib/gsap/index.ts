"use client";

/**
 * Single registration point for GSAP + all plugins.
 * Import gsap and plugins from THIS module only — never register elsewhere.
 *
 * All plugins below ship free under GSAP's standard no-charge license
 * (verified in node_modules/gsap/package.json — "Standard 'no charge' license").
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

let registered = false;

export function registerGsap(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip);
  registered = true;
}

// Register eagerly on the client the moment this module is imported.
registerGsap();

// Dev convenience: expose gsap for debugging/inspection in the browser console.
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  const w = window as unknown as { gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger };
  w.gsap = gsap;
  w.ScrollTrigger = ScrollTrigger;
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip };
