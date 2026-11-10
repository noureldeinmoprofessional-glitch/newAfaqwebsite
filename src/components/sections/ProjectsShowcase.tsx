import { useLocale, useTranslations } from "next-intl";
import { MapPin, ArrowRight, Factory } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { CASE_STUDIES } from "@/data/case-studies";

/** The three flagship case studies — real work spanning survey, GIS, AV and steel. */
const FEATURED = CASE_STUDIES.filter((c) => c.featured).slice(0, 3);

/**
 * Section — Selected Projects. High-contrast card grid of real AFAQ projects:
 * photo + a solid category chip, then the title, a readable teaser and a real
 * "View" button on a white card body (so details never sit over the image).
 * Three cards are visible at once instead of a one-at-a-time pinned carousel.
 */
export function ProjectsShowcase() {
  const t = useTranslations("Projects");
  const lang = useLocale() as "en" | "ar";

  return (
    <Section surface="ink-900" id="projects">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
            <Heading as="h2" size="h2" className="mt-6 text-mist-50">
              {t("title")}
            </Heading>
          </div>
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
        </div>

        <Reveal className="mt-14 grid gap-7 md:grid-cols-2 lg:mt-16 lg:grid-cols-3" stagger={0.1}>
          {FEATURED.map((study) => (
            <article key={study.slug} className="group h-full">
              <Link
                href={`/case-studies/${study.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-lg shadow-ink-900/30 outline-none ring-brand-500/40 transition-all duration-500 ease-out hover:-translate-y-1.5 focus-visible:ring-2"
              >
                {/* Media + solid category chip */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[16/10] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={study.hero}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  {study.industry && (
                    <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 font-display text-eyebrow uppercase text-ink-900 shadow-sm">
                      <Factory className="size-3.5" strokeWidth={2.5} />
                      {study.industry[lang]}
                    </span>
                  )}
                </div>

                {/* Body — on white, so details stay readable */}
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex items-center gap-1.5 font-display text-eyebrow uppercase text-slate-500">
                    <MapPin className="size-3.5 shrink-0 text-brand-600" strokeWidth={2} />
                    {study.location[lang]}
                  </span>

                  <h3 className="mt-3 font-display text-h3 font-semibold text-slate-900 transition-colors duration-300 group-hover:text-brand-600">
                    {study.name[lang]}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-body text-slate-700">{study.teaser[lang]}</p>

                  {/* Actual button (visual) — green pill with arrow */}
                  <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-500 py-2.5 ps-5 pe-4 font-display text-small font-semibold text-ink-900 transition-colors duration-300 group-hover:bg-brand-400">
                    {t("cta")}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
