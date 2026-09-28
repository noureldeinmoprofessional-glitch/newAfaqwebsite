"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";
import { cn } from "@/lib/utils";

const LAYERS = [
  { key: "survey", image: "survey" },
  { key: "civil", image: "steel-fabrication" },
  { key: "its", image: "its" },
  { key: "av", image: "av-led" },
] as const;

/**
 * Section 4 — The Integrated Advantage (brief §4). A continuous vertical line
 * connects four engineering layers; scrolling activates each layer, fills the
 * line, and crossfades the sticky media. Reinforces "One Partner. Every Layer."
 */
export function IntegratedAdvantage() {
  const t = useTranslations("Integrated");
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGsapContext(() => {
    const node = root.current;
    if (!node) return;
    const blocks = gsap.utils.toArray<HTMLElement>(node.querySelectorAll("[data-layer]"));

    // Fill the connecting line across the whole scroll of the layer column.
    const fill = node.querySelector(".line-fill");
    const column = node.querySelector(".layer-column");
    if (fill && column) {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: column,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    }

    // Activate each layer as it reaches center.
    blocks.forEach((block, i) => {
      ScrollTrigger.create({
        trigger: block,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });
  }, root, []);

  return (
    <Section surface="ink-900" id="integrated" className="relative overflow-hidden">
      <Container ref={root} className="relative">
        <div className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
          <p className="mt-6 max-w-xl text-body-lg text-mist-50/60">{t("lead")}</p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Sticky crossfading media */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full">
                {LAYERS.map((layer, i) => (
                  <MediaFrame
                    key={layer.key}
                    ratio="4/5"
                    image={layer.image}
                    label={t(`layers.${layer.key}.imageLabel`)}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <span className="absolute right-4 top-4 font-display text-small tabular-nums text-brand-400 rtl:left-4 rtl:right-auto">
                      {t(`layers.${layer.key}.index`)}
                    </span>
                  </MediaFrame>
                ))}
              </div>
            </div>
          </div>

          {/* Layer column with connecting line */}
          <div className="layer-column relative ps-8 lg:ps-12">
            {/* Connecting line track + fill */}
            <div className="absolute inset-y-0 start-0 w-px bg-line-inv" aria-hidden="true">
              <div className="line-fill absolute inset-x-0 top-0 h-full origin-top bg-brand-500" style={{ transform: "scaleY(0)" }} />
            </div>

            <div className="flex flex-col">
              {LAYERS.map((layer, i) => (
                <div
                  key={layer.key}
                  data-layer
                  className="relative py-12 lg:min-h-[70svh] lg:py-0 lg:flex lg:flex-col lg:justify-center"
                >
                  {/* Node marker */}
                  <span
                    className={cn(
                      "absolute -start-8 top-14 size-4 -translate-x-1/2 rounded-full border-2 transition-colors duration-500 rtl:translate-x-1/2 lg:-start-12 lg:top-1/2 lg:-translate-y-1/2",
                      active === i
                        ? "border-brand-400 bg-brand-500"
                        : "border-line-inv bg-ink-900",
                    )}
                    aria-hidden="true"
                  />
                  <div
                    className={cn(
                      "transition-opacity duration-500",
                      active === i ? "opacity-100" : "lg:opacity-40",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-display text-small tabular-nums text-brand-500">
                        {t(`layers.${layer.key}.index`)}
                      </span>
                      <span className="font-display text-eyebrow uppercase text-mist-50/50">
                        {t(`layers.${layer.key}.depth`)}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-h3 font-semibold text-mist-50">
                      {t(`layers.${layer.key}.name`)}
                    </h3>
                    <p className="mt-5 max-w-md text-body-lg text-mist-50/60">
                      {t(`layers.${layer.key}.body`)}
                    </p>

                    {/* Mobile media */}
                    <div className="mt-8 lg:hidden">
                      <MediaFrame
                        ratio="16/10"
                        image={layer.image}
                        label={t(`layers.${layer.key}.imageLabel`)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-16 border-t border-line-inv pt-10 text-center font-display text-h3 font-medium text-brand-400">
          {t("tagline")}
        </p>
      </Container>
    </Section>
  );
}
