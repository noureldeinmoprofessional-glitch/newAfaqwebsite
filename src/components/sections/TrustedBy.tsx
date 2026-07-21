"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { marquee } from "@/lib/gsap/animations";
import { getDirectionMultiplier } from "@/i18n/direction";
import { Container, Section } from "@/components/primitives";

/**
 * Section 2 — Trusted By (brief §2). Infinite marquee of client / partner marks.
 * Monochrome by default; each mark reveals brand color on hover. Names render as
 * text marks pending brand-approved logos (MISSING_ASSETS.md). Direction inverts
 * for RTL via getDirectionMultiplier.
 */
export function TrustedBy() {
  const t = useTranslations("Trusted");
  const locale = useLocale();
  const dir = getDirectionMultiplier(locale);
  const track = useRef<HTMLDivElement>(null);
  const logos = t.raw("logos") as string[];

  useGsapContext(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (track.current) marquee(track.current, dir, { xPercent: -50, duration: 45 });
    });
  }, track, [locale]);

  return (
    <Section surface="white" className="overflow-hidden border-y border-line py-16 md:py-20">
      <Container>
        <p className="text-center font-display text-eyebrow uppercase tracking-[0.14em] text-slate-600">
          {t("eyebrow")}
        </p>
      </Container>

      <div className="relative mt-10">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-white to-transparent rtl:bg-gradient-to-l" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-white to-transparent rtl:bg-gradient-to-r" />

        <div ref={track} className="flex w-max flex-nowrap items-center gap-12 pe-12">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 whitespace-nowrap font-display text-xl font-medium text-slate-900/35 transition-colors duration-300 hover:text-brand-600 md:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
