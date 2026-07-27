"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { getDirectionMultiplier } from "@/i18n/direction";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";

const PROJECTS = [
  { key: "geospatial", image: "gis-mapping" },
  { key: "water", image: "water-infrastructure" },
  { key: "control", image: "control-room" },
  { key: "facade", image: "av-led" },
  { key: "stadium", image: "steel-fabrication" },
] as const;

/**
 * Section 7 — Featured Projects (brief §7). Pinned horizontal scroll on desktop,
 * translating a track as the section is pinned; degrades to a native snap
 * carousel on small screens / reduced motion. Horizontal direction consumes
 * getDirectionMultiplier so RTL mirrors correctly.
 */
export function ProjectsShowcase() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const dir = getDirectionMultiplier(locale);
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const node = root.current;
    if (!node) return;
    const viewport = node.querySelector<HTMLElement>(".pin-viewport");
    const track = node.querySelector<HTMLElement>(".pin-track");
    if (!viewport || !track) return;

    const mm = gsap.matchMedia();

    // Desktop pinned horizontal scroll.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      viewport.classList.remove("overflow-x-auto", "snap-x");
      viewport.classList.add("overflow-hidden");

      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      gsap.to(track, {
        x: () => getDistance() * -dir,
        ease: "none",
        scrollTrigger: {
          trigger: node,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
  }, root, [locale]);

  return (
    <Section surface="ink-900" id="projects" flush className="relative py-section" as="section">
      <div ref={root}>
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
              <Heading as="h2" size="h2" className="mt-6 text-mist-50">
                {t("title")}
              </Heading>
            </div>
            <p className="max-w-xs text-body text-mist-50/50">{t("note")}</p>
          </div>
        </Container>

        {/* Viewport (native scroll on mobile; pinned on desktop) */}
        <div className="pin-viewport mt-14 w-full snap-x overflow-x-auto lg:mt-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="pin-track flex w-max gap-6 px-5 md:px-10 lg:px-20">
            {PROJECTS.map(({ key, image }, i) => (
              <article
                key={key}
                className="group relative w-[85vw] shrink-0 snap-start sm:w-[70vw] lg:w-[62vw] xl:w-[54vw]"
              >
                <MediaFrame ratio="16/10" image={image} label={t(`items.${key}.imageLabel`)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                  <span className="absolute start-5 top-5 font-display text-sm tabular-nums text-brand-400">
                    {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-display text-eyebrow uppercase tracking-[0.12em] text-mist-50/70">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-brand-400" strokeWidth={2} />
                        {t(`items.${key}.location`)}
                      </span>
                      <span className="text-brand-400">{t(`items.${key}.category`)}</span>
                      <span>{t(`items.${key}.year`)}</span>
                    </div>
                    <h3 className="max-w-xl font-display text-h1 font-semibold leading-[1.02] text-mist-50">
                      {t(`items.${key}.name`)}
                    </h3>
                    <span className="inline-flex items-center gap-2 font-display font-medium text-mist-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {t("cta")}
                      <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2} />
                    </span>
                  </div>
                </MediaFrame>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
