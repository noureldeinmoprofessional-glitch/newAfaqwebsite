"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Minimal locale switcher — swaps the active locale while preserving the
 * current pathname. Uses the locale-aware navigation helpers.
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="inline-flex items-center gap-1 text-eyebrow uppercase">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-current/30" aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={loc === locale ? "true" : undefined}
            className={cn(
              "font-display transition-colors duration-[400ms]",
              loc === locale
                ? "text-brand-500"
                : "text-current/50 hover:text-current",
            )}
          >
            {loc === "ar" ? "العربية" : "EN"}
          </button>
        </span>
      ))}
    </div>
  );
}
