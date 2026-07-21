import { defineRouting } from "next-intl/routing";

/**
 * Central i18n routing definition.
 * `localePrefix: "always"` guarantees `/` redirects to `/en` and every
 * route is namespaced under `/en/...` or `/ar/...`.
 */
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
