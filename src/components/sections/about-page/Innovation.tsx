"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Map, Boxes, Cpu, Plane, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

const PILLARS = [
  { key: "gis", Icon: Map, texture: "survey" },
  { key: "twins", Icon: Boxes, texture: "grid" },
  { key: "smart", Icon: Cpu, texture: "terrain" },
  { key: "drone", Icon: Plane, texture: "topo" },
  { key: "ai", Icon: Sparkles, texture: "grid" },
] as const;

/**
 * About §6 — Leadership Through Innovation. Editorial expanding panels: each
 * innovation pillar grows on hover to reveal its media and copy, over a slowly
 * drifting digital-network grid.
 */
export function Innovation() {
  const t = useTranslations("AboutPage.innovation");
  const root = useRef<HTMLElement>(null);

  useGsapContext(() => {
    const net = root.current?.querySelector(".innov-net");
    if (!net) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(net, { backgroundPositionX: "72px", duration: 24, ease: "none", repeat: -1 });
      gsap.to(net, { xPercent: 3, yPercent: -3, duration: 20, ease: "sine.inOut", repeat: -1, yoyo: true });
    });
  }, root, []);

  return (
    <Section surface="ink-900" id="innovation" ref={root} className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={6} className="innov-net text-tech-500" />
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
        </div>

        {/* Expanding panels */}
        <div className="mt-14 flex flex-col gap-4 lg:mt-16 lg:h-[460px] lg:flex-row">
          {PILLARS.map(({ key, Icon, texture }) => (
            <article
              key={key}
              className="group relative overflow-hidden rounded-card border border-line-inv transition-all duration-500 ease-out lg:flex-[1] lg:hover:flex-[3.2]"
            >
              <TechBackground variant={texture} opacity={8} className="text-brand-400" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />

              <div className="relative flex h-full min-h-[200px] flex-col justify-end p-6 lg:p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-button bg-white/5 text-brand-400 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-ink-900">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-h3 font-semibold text-mist-50">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-2 max-w-sm text-body text-mist-50/60 opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
                  {t(`items.${key}.body`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
