import localFont from "next/font/local";

/**
 * Self-hosted fonts (woff2 checked into the repo under src/fonts).
 * No Google Fonts CDN calls at build or runtime.
 *
 * CSS variables consumed by the Tailwind `@theme` font tokens in globals.css:
 *   --font-space-grotesk  →  --font-display
 *   --font-inter          →  --font-body
 *   --font-ibm-arabic     →  --font-arabic
 */

export const spaceGrotesk = localFont({
  src: "./space-grotesk-latin-wght.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const inter = localFont({
  src: "./inter-latin-wght.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const ibmPlexArabic = localFont({
  src: [
    { path: "./ibm-plex-sans-arabic-400.woff2", weight: "400", style: "normal" },
    { path: "./ibm-plex-sans-arabic-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-ibm-arabic",
  display: "swap",
  // Preloaded only when Arabic is the active locale is not possible per-route
  // here; keep it non-preloaded to avoid loading Arabic glyphs on /en pages.
  preload: false,
  fallback: ["ui-sans-serif", "sans-serif"],
});

export const fontVariables = [
  spaceGrotesk.variable,
  inter.variable,
  ibmPlexArabic.variable,
].join(" ");
