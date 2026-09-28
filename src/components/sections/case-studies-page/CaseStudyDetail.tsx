import { useLocale, useTranslations } from "next-intl";
import {
  Building,
  MapPin,
  Layers,
  Briefcase,
  Factory,
  ArrowRight,
  Gauge,
  Zap,
  ShieldCheck,
  Target,
  CheckCircle2,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { Container, Section, type Surface } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { type CaseStudy, relatedCaseStudies } from "@/data/case-studies";
import type { Category } from "@/data/projects";
import { CASE_CATEGORY_META } from "./caseCategoryMeta";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyMetrics } from "./CaseStudyMetrics";
import { CaseStudyGallery } from "./CaseStudyGallery";
import { CaseStudyCard } from "./CaseStudyCard";

const HIGHLIGHT_ICONS: LucideIcon[] = [Gauge, Zap, ShieldCheck, Target, CheckCircle2, Layers];

/**
 * The full case-study detail template. Sections render only when the data model
 * carries their content, so every project shares one layout while adapting to
 * how much the source document actually says. Numbering is sequential over the
 * sections that appear; light sections alternate white / mist so no two touch.
 */
export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const t = useTranslations("CaseStudyDetail");
  const hasChallenge = !!study.challenge?.length;
  const hasSolution = !!study.solutionPhases?.length;
  const hasScope = !!study.scope?.length;
  const hasHighlights = !!study.highlights?.length;
  const hasMetrics = !!study.metrics?.length;
  const hasGallery = !!study.gallery && study.gallery.length >= 2;
  const hasServices = !!study.relatedServiceKeys?.length;
  const related = relatedCaseStudies(study.slug, 3);

  // Sequential section numbers over what actually renders.
  const order: string[] = ["overview", "snapshot"];
  if (hasChallenge) order.push("challenge");
  if (hasSolution) order.push("solution");
  if (hasScope) order.push("scope");
  if (hasHighlights) order.push("highlights");
  if (hasMetrics) order.push("metrics");
  if (hasGallery) order.push("gallery");
  if (hasServices) order.push("services");
  if (related.length) order.push("related");
  const num = (k: string) => String(order.indexOf(k) + 1).padStart(2, "0");

  // Alternating surfaces for the light sections (dark ones don't participate).
  const lightKeys = order.filter((k) => k !== "solution" && k !== "metrics");
  const surf = (k: string): Surface => (lightKeys.indexOf(k) % 2 === 0 ? "white" : "mist-50");

  return (
    <>
      <CaseStudyHero study={study} />
      <Overview study={study} num={num("overview")} surface={surf("overview")} />
      <Snapshot study={study} num={num("snapshot")} surface={surf("snapshot")} />
      {hasChallenge && <Challenge study={study} num={num("challenge")} surface={surf("challenge")} />}
      {hasSolution && <Solution study={study} num={num("solution")} />}
      {hasScope && <Scope study={study} num={num("scope")} surface={surf("scope")} />}
      {hasHighlights && <Highlights study={study} num={num("highlights")} surface={surf("highlights")} />}
      {hasMetrics && <CaseStudyMetrics metrics={study.metrics!} />}
      {hasGallery && <CaseStudyGallery images={study.gallery!} title={t("galleryTitle")} surface={surf("gallery")} />}
      {hasServices && <RelatedServices study={study} num={num("services")} surface={surf("services")} />}
      {related.length > 0 && <RelatedStudies studies={related} num={num("related")} surface={surf("related")} />}
    </>
  );
}

function SectionHead({ num, title, dark = false }: { num: string; title: string; dark?: boolean }) {
  return (
    <>
      <p className={cn("font-display text-eyebrow uppercase", dark ? "text-brand-400" : "text-brand-600")}>
        {num}
      </p>
      <h2 className={cn("mt-3 font-display text-h2 font-semibold", dark ? "text-mist-50" : "text-slate-900")}>
        {title}
      </h2>
    </>
  );
}

/* ── 02 · Executive Overview ─────────────────────────────────────────────── */
function Overview({ study, num, surface }: { study: CaseStudy; num: string; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  return (
    <Section surface={surface} id="overview">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead num={num} title={t("overviewTitle")} />
          </div>
          <div className="lg:col-span-8">
            <p className="text-body-lg font-medium text-slate-800">
              {study.overview[lang]}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {study.services.map((s, i) => (
                <span
                  key={i}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-small font-medium text-slate-600"
                >
                  {s[lang]}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 03 · Project Snapshot ───────────────────────────────────────────────── */
function Snapshot({ study, num, surface }: { study: CaseStudy; num: string; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Building, label: t("snapshot.client"), value: study.client[lang] },
    { icon: MapPin, label: t("snapshot.location"), value: study.location[lang] },
  ];
  if (study.projectType) facts.push({ icon: Layers, label: t("snapshot.type"), value: study.projectType[lang] });
  facts.push({ icon: Briefcase, label: t("snapshot.services"), value: study.services.map((s) => s[lang]).join(" · ") });
  if (study.industry) facts.push({ icon: Factory, label: t("snapshot.industry"), value: study.industry[lang] });

  return (
    <Section surface={surface} id="snapshot">
      <Container>
        <SectionHead num={num} title={t("snapshotTitle")} />
        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {facts.map((f, i) => (
            <div key={i} className="rounded-card border border-line bg-white p-6">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                <f.icon className="size-5" strokeWidth={2} />
              </span>
              <p className="mt-4 font-display text-eyebrow uppercase text-slate-500">{f.label}</p>
              <p className="mt-1.5 text-body font-medium text-slate-900">{f.value}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 04 · Engineering Challenge ──────────────────────────────────────────── */
function Challenge({ study, num, surface }: { study: CaseStudy; num: string; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  const img = study.gallery?.[1] ?? study.hero;
  return (
    <Section surface={surface} id="challenge">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHead num={num} title={t("challengeTitle")} />
            <div className="mt-6 space-y-5">
              {study.challenge!.map((p, i) => (
                <p key={i} className="text-body-lg leading-relaxed text-slate-700">
                  {p[lang]}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── 05 · The AFAQ Solution (blueprint timeline) ─────────────────────────── */
function Solution({ study, num }: { study: CaseStudy; num: string }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  return (
    <Section surface="ink-900" id="solution" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={6} className="text-brand-400" />
      <Container className="relative">
        <SectionHead num={num} title={t("solutionTitle")} dark />
        <ol className="mt-12 space-y-0">
          {study.solutionPhases!.map((phase, i, arr) => (
            <Reveal as="li" key={i} className="relative grid grid-cols-[auto_1fr] gap-x-6">
              {/* Node + connecting blueprint line */}
              <div className="relative flex flex-col items-center">
                <span className="z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-400/40 bg-ink-800 font-display text-body font-semibold text-brand-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < arr.length - 1 && (
                  <span className="w-px flex-1 bg-gradient-to-b from-brand-400/50 to-brand-400/10 [background-image:repeating-linear-gradient(to_bottom,theme(colors.brand.400/40%)_0_6px,transparent_6px_12px)]" />
                )}
              </div>
              <div className={cn("pb-12", i === arr.length - 1 && "pb-0")}>
                <h3 className="font-display text-h3 font-semibold text-mist-50">{phase.title[lang]}</h3>
                <p className="mt-2 max-w-2xl text-body leading-relaxed text-mist-50/70">{phase.body[lang]}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ── 06 · Scope of Work ──────────────────────────────────────────────────── */
function Scope({ study, num, surface }: { study: CaseStudy; num: string; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  return (
    <Section surface={surface} id="scope">
      <Container>
        <SectionHead num={num} title={t("scopeTitle")} />
        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {study.scope!.map((s, i) => (
            <div key={i} className="rounded-card border border-line bg-white p-6">
              <p className="font-display text-body-lg font-semibold text-slate-900">{s.title[lang]}</p>
              <p className="mt-2 text-body text-slate-600">{s.body[lang]}</p>
            </div>
          ))}
        </Reveal>

        {(study.technologies?.length || study.deliverables?.length) && (
          <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
            {!!study.technologies?.length && (
              <div>
                <p className="inline-flex items-center gap-2 font-display text-eyebrow uppercase text-brand-600">
                  <Cpu className="size-4" strokeWidth={2} />
                  {t("technologiesTitle")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.technologies.map((tech, i) => (
                    <span key={i} className="rounded-full bg-brand-500/10 px-3.5 py-1.5 text-small font-medium text-brand-600">
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
                <ul className="mt-4 space-y-2.5">
                  {study.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-body text-slate-700">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" strokeWidth={2} />
                      {d[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}

/* ── 07 · Project Highlights ─────────────────────────────────────────────── */
function Highlights({ study, num, surface }: { study: CaseStudy; num: string; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  return (
    <Section surface={surface} id="highlights">
      <Container>
        <SectionHead num={num} title={t("highlightsTitle")} />
        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {study.highlights!.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
            return (
              <div
                key={i}
                className="group rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg hover:shadow-ink-900/5"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-ink-900">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <p className="mt-4 font-display text-body-lg font-semibold leading-snug text-slate-900">{h.title[lang]}</p>
                {h.body && <p className="mt-2 text-body text-slate-600">{h.body[lang]}</p>}
              </div>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 10 · Related Engineering Services ───────────────────────────────────── */
function RelatedServices({ study, num, surface }: { study: CaseStudy; num: string; surface: Surface }) {
  const t = useTranslations("CaseStudyDetail");
  const ts = useTranslations("CaseStudyDetail.services");
  const keys = Array.from(new Set(study.relatedServiceKeys)) as Category[];
  return (
    <Section surface={surface} id="related-services">
      <Container>
        <SectionHead num={num} title={t("relatedServicesTitle")} />
        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {keys.map((k) => {
            const { Icon } = CASE_CATEGORY_META[k];
            return (
              <Link
                key={k}
                href="/services"
                className="group flex items-center gap-4 rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg hover:shadow-ink-900/5"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-ink-900">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <span className="flex-1 font-display text-body-lg font-semibold text-slate-900">{ts(k)}</span>
                <ArrowRight
                  className="size-4 -translate-x-1 text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 rtl:rotate-180 rtl:translate-x-1 rtl:group-hover:translate-x-0"
                  strokeWidth={2}
                />
              </Link>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 11 · Related Case Studies ───────────────────────────────────────────── */
function RelatedStudies({ studies, num, surface }: { studies: CaseStudy[]; num: string; surface: Surface }) {
  const t = useTranslations("CaseStudyDetail");
  return (
    <Section surface={surface} id="related">
      <Container>
        <SectionHead num={num} title={t("relatedTitle")} />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((s) => (
            <CaseStudyCard key={s.slug} study={s} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
