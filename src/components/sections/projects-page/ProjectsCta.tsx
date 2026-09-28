"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { Container, Section, Heading, Button } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

/**
 * Projects §CTA — deep emerald, minimal, with contour lines drifting behind the
 * headline.
 */
export function ProjectsCta() {
  const t = useTranslations("ProjectsPage.cta");
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const layers = root.current?.querySelectorAll(".pc-contour");
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
    <Section surface="ink-900" id="projects-cta" className="relative overflow-hidden">
      <div ref={root} className="absolute inset-0">
        <TechBackground variant="topo" opacity={7} className="pc-contour text-brand-400" />
        <TechBackground variant="grid" opacity={5} className="pc-contour text-brand-400 scale-125" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-eyebrow uppercase text-brand-400">{t("eyebrow")}</p>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
          <p className="mx-auto mt-8 max-w-2xl text-body-lg text-mist-50/70">{t("body")}</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href="/case-studies">
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
