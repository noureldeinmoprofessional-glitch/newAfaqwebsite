"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { countUp } from "@/lib/gsap/animations";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

const KEYS = ["years", "projects", "government", "private"] as const;

/**
 * Section 9 — Company in Numbers (brief §9). Restrained, high-contrast counters
 * on white over a thin blueprint grid. Each counter animates once on scroll;
 * reduced motion shows the final value immediately.
 */
export function Numbers() {
  const t = useTranslations("Numbers");
  const root = useRef<HTMLElement>(null);

  useGsapContext(() => {
    const node = root.current;
    if (!node) return;
    const counters = gsap.utils.toArray<HTMLElement>(node.querySelectorAll("[data-count]"));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      counters.forEach((el) => {
        const value = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => countUp(el, value, { suffix }),
        });
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      counters.forEach((el) => {
        el.textContent = `${el.dataset.count}${el.dataset.suffix ?? ""}`;
      });
    });
  }, root, []);

  return (
    <Section surface="white" id="numbers" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={4} className="text-slate-900" />
      <Container ref={root} className="relative">
        <div className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-slate-900">
            {t("title")}
          </Heading>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:mt-20 lg:grid-cols-4">
          {KEYS.map((key) => (
            <div key={key} className="border-t border-line pt-5 sm:pt-6">
              <dt className="sr-only">{t(`items.${key}.label`)}</dt>
              <dd>
                <span
                  data-count={String(t.raw(`items.${key}.value`))}
                  data-suffix={t(`items.${key}.suffix`)}
                  dir="ltr"
                  className="block font-display text-stat font-bold leading-none tracking-[-0.03em] text-brand-600 tabular-nums"
                >
                  {String(t.raw(`items.${key}.value`))}
                  {t(`items.${key}.suffix`)}
                </span>
                <span className="mt-3 block text-eyebrow uppercase tracking-[0.12em] text-slate-600 sm:mt-4">
                  {t(`items.${key}.label`)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
