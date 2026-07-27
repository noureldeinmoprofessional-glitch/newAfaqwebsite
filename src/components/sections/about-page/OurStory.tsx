"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeOut, timing } from "@/lib/gsap/easings";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";

const MILESTONES = ["founded", "survey", "civil", "its", "av", "integrated"] as const;

/**
 * About §2 — Our Story. Split layout: sticky immersive photography on one side,
 * an editorial vertical timeline on the other. A thin green connection line fills
 * as the section scrolls, and each milestone rises into view.
 */
export function OurStory() {
  const t = useTranslations("AboutPage.story");
  const root = useRef<HTMLElement>(null);

  useGsapContext(() => {
    const node = root.current;
    if (!node) return;
    const mm = gsap.matchMedia();

    const fill = node.querySelector(".story-fill");
    const column = node.querySelector(".story-column");
    const items = gsap.utils.toArray<HTMLElement>(node.querySelectorAll("[data-milestone]"));

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (fill && column) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: column, start: "top center", end: "bottom center", scrub: true },
          },
        );
      }
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: timing.reveal,
            ease: easeOut,
            scrollTrigger: { trigger: item, start: "top 82%", once: true },
          },
        );
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(items, { opacity: 1, y: 0 });
      if (fill) gsap.set(fill, { scaleY: 1 });
    });
  }, root, []);

  return (
    <Section surface="ink-900" id="story" as="section">
      <Container ref={root}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Media */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
              <Heading as="h2" size="h1" className="mt-6 text-mist-50">
                {t("title")}
              </Heading>
              <p className="mt-6 max-w-md text-body-lg text-mist-50/60">{t("lead")}</p>
              <MediaFrame
                ratio="4/5"
                image="riyadh-skyline"
                label={t("imageLabel")}
                className="mt-10"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="story-column relative ps-8 lg:col-span-6 lg:col-start-7 lg:ps-12">
            <div className="absolute inset-y-2 start-0 w-px bg-line-inv" aria-hidden="true">
              <div className="story-fill absolute inset-x-0 top-0 h-full origin-top bg-brand-500" style={{ transform: "scaleY(0)" }} />
            </div>

            <ol className="flex flex-col">
              {MILESTONES.map((key, i) => (
                <li key={key} data-milestone className="relative py-8 first:pt-0 last:pb-0">
                  <span
                    className="absolute -start-8 top-9 size-3 -translate-x-1/2 rounded-full border-2 border-brand-500 bg-ink-900 first:top-1 rtl:translate-x-1/2 lg:-start-12"
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-eyebrow uppercase tracking-[0.14em] text-brand-400">
                      {t(`milestones.${key}.tag`)}
                    </span>
                    <span className="font-display text-sm tabular-nums text-mist-50/30">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-h3 font-semibold text-mist-50">
                    {t(`milestones.${key}.title`)}
                  </h3>
                  <p className="mt-2 max-w-md text-body text-mist-50/55">
                    {t(`milestones.${key}.body`)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
