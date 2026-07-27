"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { Container, Section, Heading, Button } from "@/components/primitives";
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
            <Button variant="primary" size="lg" href="/contact">
              {t("ctaPrimary")}
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
