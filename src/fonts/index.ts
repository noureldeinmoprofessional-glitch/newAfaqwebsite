import localFont from "next/font/local";

/**
 * Self-hosted fonts (woff2 checked into the repo under src/fonts).
 * No Google Fonts CDN calls at build or runtime.
 *
 * English typeface: Poppins (display + body). Arabic: IBM Plex Sans Arabic.
 *
 * CSS variables consumed by the Tailwind `@theme` font tokens in globals.css:
 *   --font-poppins     →  --font-display + --font-body
 *   --font-ibm-arabic  →  --font-arabic
 */

export const poppins = localFont({
  src: [
    { path: "./poppins-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./poppins-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
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
  // Non-preloaded so Arabic glyphs don't load on /en pages.
  preload: false,
  fallback: ["ui-sans-serif", "sans-serif"],
});

export const fontVariables = [poppins.variable, ibmPlexArabic.variable].join(" ");
