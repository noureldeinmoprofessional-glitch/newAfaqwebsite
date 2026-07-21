import type { Locale } from "./routing";

export type Direction = "ltr" | "rtl";
export type DirectionMultiplier = 1 | -1;

const RTL_LOCALES: readonly string[] = ["ar"];

export function isRtl(locale: string): boolean {
  return RTL_LOCALES.includes(locale);
}

export function getDirection(locale: string): Direction {
  return isRtl(locale) ? "rtl" : "ltr";
}

/**
 * The single source of truth for horizontal motion direction.
 * Multiply every `x`, `xPercent`, transform-origin sign, and clip-path
 * inset direction by this value so RTL mirrors correctly.
 */
export function getDirectionMultiplier(locale: string): DirectionMultiplier {
  return isRtl(locale) ? -1 : 1;
}

export type { Locale };
