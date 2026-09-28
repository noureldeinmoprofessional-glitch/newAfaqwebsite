"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, ArrowRight, Factory } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { getDirectionMultiplier } from "@/i18n/direction";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { Link } from "@/i18n/navigation";
import { CASE_STUDIES } from "@/data/case-studies";

/** The five flagship case studies — real work spanning survey, GIS, AV and steel. */
const FEATURED = CASE_STUDIES.filter((c) => c.featured).slice(0, 5);

/**
 * Section — Selected Projects. A curated portfolio highlight of real AFAQ case
 * studies. Pinned horizontal scroll on desktop; native snap carousel on small
 * screens / reduced motion. Each card links through to its case-study page.
 */
export function ProjectsShowcase() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const dir = getDirectionMultiplier(locale);
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      const node = root.current;
      if (!node) return;
      const viewport = node.querySelector<HTMLElement>(".pin-viewport");
      const track = node.querySelector<HTMLElement>(".pin-track");
      if (!viewport || !track) return;

      const mm = gsap.matchMedia();

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
    },
    root,
    [locale],
  );

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
            <div className="flex max-w-xs flex-col gap-4">
              <p className="text-body text-mist-50/50">{t("note")}</p>
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-2 font-display font-medium text-brand-400 transition-colors hover:text-mist-50"
              >
                {t("viewAll")}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </Container>

        {/* Viewport (native scroll on mobile; pinned on desktop) */}
        <div className="pin-viewport mt-14 w-full snap-x overflow-x-auto lg:mt-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="pin-track flex w-max gap-6 px-5 md:px-10 lg:px-20">
            {FEATURED.map((study, i) => (
              <article
                key={study.slug}
                className="group relative w-[85vw] shrink-0 snap-start sm:w-[70vw] lg:w-[60vw] xl:w-[52vw]"
              >
                <Link href={`/case-studies/${study.slug}`} className="block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-image bg-ink-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={study.hero}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />

                    <span className="absolute start-5 top-5 font-display text-small tabular-nums text-brand-400">
                      {String(i + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
                    </span>

                    <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-display text-eyebrow uppercase text-mist-50/70">
                        {study.industry && (
                          <span className="inline-flex items-center gap-1.5 text-brand-400">
                            <Factory className="size-3.5" strokeWidth={2} />
                            {study.industry[lang]}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5" strokeWidth={2} />
                          {study.location[lang]}
                        </span>
                      </div>

                      <h3 className="max-w-xl font-display text-h2 font-semibold leading-[1.05] text-mist-50">
                        {study.name[lang]}
                      </h3>

                      <p className="max-w-lg text-body text-mist-50/70 line-clamp-2">{study.teaser[lang]}</p>

                      <span className="mt-1 inline-flex items-center gap-2 font-display font-medium text-mist-50 transition-colors group-hover:text-brand-400">
                        {t("cta")}
                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
