"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getDirectionMultiplier } from "@/i18n/direction";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { Link } from "@/i18n/navigation";
import { CASE_STUDIES } from "@/data/case-studies";

/** The five flagship case studies — real work spanning survey, GIS, AV and steel. */
const FEATURED = CASE_STUDIES.filter((c) => c.featured).slice(0, 5);


/**
 * Section — Selected Projects. A horizontally scrolling carousel of case-study
 * cards, moved with prev/next buttons (top right) or by swiping — never by
 * page scroll. Each card follows the company-profile layout: the photo fades
 * into a light panel so every line of text sits on white: green project name,
 * dark client name, the tagline as a green-accented lead line, readable teaser, service pills
 * and a "View Case Study" button.
 */
export function ProjectsShowcase() {
  const t = useTranslations("Projects");
  const tc = useTranslations("CaseStudiesPage.categories");
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const dir = getDirectionMultiplier(locale);
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const x = Math.abs(el.scrollLeft); // RTL scrollLeft is negative
    setAtStart(x < 4);
    setAtEnd(x + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (step: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const distance = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.85;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: step * dir * distance, behavior: reduce ? "auto" : "smooth" });
  };

  const navBtn =
    "inline-flex size-12 items-center justify-center rounded-full border border-mist-50/25 text-mist-50 transition-colors hover:border-brand-400 hover:bg-brand-500 hover:text-ink-900 disabled:pointer-events-none disabled:opacity-35";

  return (
    <Section surface="ink-800" id="projects">
      <Container>
        {/* Header — title left, navigation top right */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
            <Heading as="h2" size="h2" className="mt-6 text-mist-50">
              {t("title")}
            </Heading>
            <p className="mt-4 text-body text-mist-50/90">{t("note")}</p>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 font-display font-semibold text-brand-400 transition-colors hover:text-mist-50"
            >
              {t("viewAll")}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={atStart}
                aria-label={lang === "ar" ? "المشروع السابق" : "Previous project"}
                aria-controls="projects-track"
                className={navBtn}
              >
                <ArrowLeft className="size-5 rtl:rotate-180" strokeWidth={2.25} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={atEnd}
                aria-label={lang === "ar" ? "المشروع التالي" : "Next project"}
                aria-controls="projects-track"
                className={navBtn}
              >
                <ArrowRight className="size-5 rtl:rotate-180" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </div>

        {/* Track — native horizontal scroll with snap (buttons / swipe) */}
        <div
          ref={scroller}
          id="projects-track"
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 lg:mt-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FEATURED.map((study) => (
            <article
              key={study.slug}
              data-card
              className="grid w-[90%] shrink-0 snap-start overflow-hidden rounded-card bg-white shadow-xl shadow-ink-900/30 grid-cols-1 sm:w-[86%] lg:w-[88%] lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1fr)]"
            >
              {/* Photo — fades into the white text panel (text first on desktop: EN text-left, AR text-right) */}
              <div className="relative aspect-[16/10] lg:order-2 lg:aspect-auto lg:min-h-[520px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={study.hero} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white lg:bg-gradient-to-l lg:via-white/10 rtl:lg:bg-gradient-to-r"
                  aria-hidden="true"
                />
              </div>

              {/* Text panel — everything on white */}
              <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:order-1 lg:py-10 lg:ps-10 lg:pe-4">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-mist-100 px-3.5 py-1.5 font-display text-small font-semibold text-slate-700">
                  <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  {study.industry?.[lang] ?? tc(study.category)}
                </span>

                <h3 className="mt-5 font-display text-h2 font-bold text-brand-600">{study.name[lang]}</h3>
                <p className="mt-1 font-display text-h4 font-semibold text-slate-900">{study.client[lang]}</p>

                {study.tagline && (
                  <p className="mt-4 border-s-[3px] border-brand-500 ps-3 font-display text-body-lg font-medium leading-snug text-slate-800">
                    {study.tagline[lang]}
                  </p>
                )}

                <p className="mt-5 line-clamp-4 text-body text-slate-700">{study.teaser[lang]}</p>

                {study.services.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {study.services.slice(0, 4).map((s) => (
                      <li
                        key={s.en}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist-50 px-3 py-1 text-small font-medium text-slate-700"
                      >
                        <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                        {s[lang]}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-500 py-2.5 ps-5 pe-4 font-display text-small font-semibold text-ink-900 transition-colors hover:bg-brand-400"
                >
                  {t("cta")}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
