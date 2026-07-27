import { useLocale, useTranslations } from "next-intl";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/data/case-studies";
import { CASE_CATEGORY_META } from "./caseCategoryMeta";

/**
 * Editorial case-study card. Hover choreography (all CSS, reduced-motion safe):
 * slow image zoom, a blueprint border that traces itself around the frame,
 * the category badge lifting, an arrow reveal, and a soft elevation.
 */
export function CaseStudyCard({ study, className }: { study: CaseStudy; className?: string }) {
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const t = useTranslations("CaseStudiesPage");
  const tc = useTranslations("CaseStudiesPage.categories");
  const { Icon, dot } = CASE_CATEGORY_META[study.category];

  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={`/case-studies/${study.slug}`}
        className="flex h-full flex-col rounded-card outline-none ring-brand-500/40 transition-all duration-500 ease-out focus-visible:ring-2 group-hover:-translate-y-1.5"
      >
        {/* Media */}
        <div className="relative overflow-hidden rounded-image shadow-sm transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-ink-900/10">
          <div className="aspect-[16/10] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.hero}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out will-change-transform group-hover:scale-[1.06]"
              style={{ viewTransitionName: `cs-hero-${study.slug}` }}
            />
          </div>

          {/* Legibility scrim */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/5 to-transparent" />

          {/* Blueprint border trace */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect
              x="1.5"
              y="1.5"
              width="97"
              height="97"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              className="text-brand-400 [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[900ms] ease-out group-hover:[stroke-dashoffset:0]"
            />
          </svg>

          {/* Category badge */}
          <div className="absolute start-4 top-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-3 py-1.5 font-display text-[0.6875rem] uppercase tracking-[0.12em] text-mist-50 backdrop-blur-sm">
              <Icon className="size-3.5 text-brand-400" strokeWidth={2} />
              {tc(study.category)}
            </span>
          </div>

          {/* Featured tag */}
          {study.featured && (
            <span className="absolute end-4 top-4 rounded-full bg-brand-500 px-2.5 py-1 font-display text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-900">
              {t("card.featured")}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-1 pt-5">
          <span className="inline-flex items-center gap-1.5 font-display text-eyebrow uppercase tracking-[0.12em] text-slate-500">
            <MapPin className="size-3.5 text-brand-600" strokeWidth={2} />
            {study.location[lang]}
          </span>

          <h3 className="mt-3 font-display text-h3 font-semibold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-brand-600">
            {study.name[lang]}
          </h3>

          <p className="mt-2 line-clamp-2 text-body text-slate-600">{study.teaser[lang]}</p>

          <span className="mt-auto inline-flex items-center gap-2 pt-5 font-display text-body font-medium text-brand-600">
            <span className="relative">
              {t("card.view")}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-500 transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right" />
            </span>
            <ArrowRight
              className="size-4 -translate-x-1 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 rtl:rotate-180 rtl:translate-x-1 rtl:group-hover:translate-x-0"
              strokeWidth={2}
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
