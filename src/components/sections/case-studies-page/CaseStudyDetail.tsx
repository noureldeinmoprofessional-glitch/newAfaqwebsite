import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Cpu } from "lucide-react";
import { Container, Section, Eyebrow, type Surface } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { type CaseStudy, relatedCaseStudies } from "@/data/case-studies";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyMetrics } from "./CaseStudyMetrics";
import { CaseStudyGallery } from "./CaseStudyGallery";
import { CaseStudyCard } from "./CaseStudyCard";

/**
 * The full case-study detail template. Sections render only when the data model
 * carries their content, so every project shares one layout while adapting to
 * how much the source document actually says.
 *
 * Each fact appears once: client / location / type / industry live in the hero
 * strip, results sit beside the overview, and the narrative runs challenge →
 * solution → scope → gallery. Light sections alternate white / mist so no two
 * touch; the dark Solution section breaks the rhythm.
 */
export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const t = useTranslations("CaseStudyDetail");
  const hasChallenge = !!study.challenge?.length;
  const hasSolution = !!study.solutionPhases?.length;
  const hasScope = !!study.scope?.length;
  const related = relatedCaseStudies(study.slug, 3);

  // Each photo appears once: the hero, then the next unused images go to the
  // challenge and solution, and only what is left forms the gallery.
  const pool = Array.from(new Set(study.gallery ?? [])).filter((src) => src !== study.hero);
  const challengeImg = hasChallenge ? pool.shift() : undefined;
  const solutionImg = hasSolution ? pool.shift() : undefined;
  const hasGallery = pool.length >= 2;

  // Render order of the light sections that actually appear (drives alternation).
  const lightKeys: string[] = ["overview"];
  if (hasChallenge) lightKeys.push("challenge");
  if (hasScope) lightKeys.push("scope");
  if (hasGallery) lightKeys.push("gallery");
  if (related.length) lightKeys.push("related");
  const surf = (k: string): Surface => (lightKeys.indexOf(k) % 2 === 0 ? "white" : "mist-50");

  return (
    <>
      <CaseStudyHero study={study} />
      <Overview study={study} surface={surf("overview")} />
      {hasChallenge && <Challenge study={study} img={challengeImg} surface={surf("challenge")} />}
      {hasSolution && <Solution study={study} img={solutionImg} />}
      {hasScope && <Scope study={study} surface={surf("scope")} />}
      {hasGallery && <CaseStudyGallery images={pool} title={t("galleryTitle")} surface={surf("gallery")} />}
      {related.length > 0 && <RelatedStudies studies={related} surface={surf("related")} />}
    </>
  );
}

function SectionHead({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <h2 className={cn("font-display text-h2 font-semibold", dark ? "text-mist-50" : "text-slate-900")}>
      {title}
    </h2>
  );
}

/* ── 02 · Executive Overview + key results ───────────────────────────────── */
function Overview({ study, surface }: { study: CaseStudy; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  const hasMetrics = !!study.metrics?.length;
  return (
    <Section surface={surface} id="overview">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className={hasMetrics ? "lg:col-span-7" : "lg:col-span-10"}>
            <Eyebrow tone="brand">{t("overviewTitle")}</Eyebrow>
            <p className="mt-6 font-display text-h4 font-medium leading-relaxed text-slate-800">
              {study.overview[lang]}
            </p>
          </Reveal>
          {hasMetrics && (
            <Reveal className="lg:col-span-5">
              <CaseStudyMetrics metrics={study.metrics!} title={t("resultsTitle")} />
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}

/* ── 03 · Engineering Challenge ──────────────────────────────────────────── */
function Challenge({ study, img, surface }: { study: CaseStudy; img?: string; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  return (
    <Section surface={surface} id="challenge">
      <Container>
        <div className={cn("grid items-center gap-10 lg:gap-16", img && "lg:grid-cols-2")}>
          <Reveal className={cn(!img && "max-w-3xl")}>
            <SectionHead title={t("challengeTitle")} />
            <div className="mt-6 space-y-5">
              {study.challenge!.map((p, i) => (
                <p key={i} className="text-body-lg leading-relaxed text-slate-700">
                  {p[lang]}
                </p>
              ))}
            </div>
          </Reveal>
          {img && (
            <Reveal>
              <div className="overflow-hidden rounded-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}

/* ── 04 · AFAQ Solution (photo + phases) ─────────────────────────────────── */
function Solution({ study, img }: { study: CaseStudy; img?: string }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  return (
    <Section surface="ink-900" id="solution">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead title={t("solutionTitle")} dark />
              {img && (
                <div className="mt-8 hidden overflow-hidden rounded-image lg:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <ol className="border-b border-mist-50/15 lg:col-span-7">
            {study.solutionPhases!.map((phase, i) => (
              <Reveal
                as="li"
                key={i}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-t border-mist-50/15 py-8 md:grid-cols-[4rem_minmax(0,1fr)]"
              >
                <span dir="ltr" className="font-display text-h3 font-semibold text-brand-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-h3 font-semibold text-mist-50">{phase.title[lang]}</h3>
                  <p className="mt-3 text-body-lg text-mist-50/90">{phase.body[lang]}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* ── 05 · Scope of Work (list + technologies / deliverables panel) ─────────── */
function Scope({ study, surface }: { study: CaseStudy; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  const hasPanel = !!study.technologies?.length || !!study.deliverables?.length;
  const panelBg = surface === "white" ? "bg-mist-50" : "bg-white";
  return (
    <Section surface={surface} id="scope">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={hasPanel ? "lg:col-span-7" : "lg:col-span-9"}>
            <SectionHead title={t("scopeTitle")} />
            <Reveal as="ul" className="mt-10 border-b border-line" stagger={0.05}>
              {study.scope!.map((s, i) => (
                <li
                  key={i}
                  className="grid gap-x-8 gap-y-1.5 border-t border-line py-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
                >
                  <h3 className="font-display text-h4 font-semibold text-slate-900">{s.title[lang]}</h3>
                  <p className="text-body text-slate-600 md:pt-0.5">{s.body[lang]}</p>
                </li>
              ))}
            </Reveal>
          </div>

          {hasPanel && (
            <aside className="lg:col-span-5">
              <div className={cn("space-y-10 rounded-card p-7 lg:sticky lg:top-28 lg:p-8", panelBg)}>
                {!!study.technologies?.length && (
                  <div>
                    <p className="inline-flex items-center gap-2 font-display text-eyebrow uppercase text-brand-600">
                      <Cpu className="size-4" strokeWidth={2} />
                      {t("technologiesTitle")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {study.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-line bg-white px-3.5 py-1.5 text-small font-medium text-slate-700"
                        >
                          {tech[lang]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {!!study.deliverables?.length && (
                  <div>
                    <p className="inline-flex items-center gap-2 font-display text-eyebrow uppercase text-brand-600">
                      <CheckCircle2 className="size-4" strokeWidth={2} />
                      {t("deliverablesTitle")}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {study.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-body text-slate-700">
                          <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand-600" strokeWidth={2} />
                          {d[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </Container>
    </Section>
  );
}

/* ── 07 · Interesting Case Studies────────────────────────────────────────── */
function RelatedStudies({ studies, surface }: { studies: CaseStudy[]; surface: Surface }) {
  const t = useTranslations("CaseStudyDetail");
  return (
    <Section surface={surface} id="related">
      <Container>
        <SectionHead title={t("relatedTitle")} />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((s) => (
            <CaseStudyCard key={s.slug} study={s} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
