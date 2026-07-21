"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { Link } from "@/i18n/navigation";
import { Container, Section, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

/**
 * Section 10 — CTA Banner (brief §10). Deep green, massive type, minimal copy,
 * with subtle contour lines drifting behind the headline.
 */
export function CtaBanner() {
  const t = useTranslations("CtaBanner");
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const layers = root.current?.querySelectorAll(".cta-contour");
    if (!layers?.length) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          xPercent: i % 2 === 0 ? 6 : -6,
          yPercent: i % 2 === 0 ? -4 : 4,
          duration: 18 + i * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    });
  }, root, []);

  return (
    <Section surface="ink-900" id="cta" className="relative overflow-hidden">
      <div ref={root} className="absolute inset-0">
        <TechBackground variant="topo" opacity={7} className="cta-contour text-brand-400" />
        <TechBackground variant="topo" opacity={5} className="cta-contour text-tech-500 scale-125" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-eyebrow uppercase tracking-[0.14em] text-brand-500">
            {t("eyebrow")}
          </p>
          <Heading as="h2" size="display" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
          <p className="mx-auto mt-8 max-w-2xl text-body-lg text-mist-50/70">{t("body")}</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex h-13 items-center gap-2 rounded-button bg-brand-500 px-8 font-display font-medium text-ink-900 transition-colors hover:bg-brand-400"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-button border border-mist-50/25 px-8 font-display font-medium text-mist-50 transition-colors hover:border-brand-400 hover:text-brand-400"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
