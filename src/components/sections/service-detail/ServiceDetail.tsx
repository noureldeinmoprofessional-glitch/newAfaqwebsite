import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, MapPin, Check, Sparkles } from "lucide-react";
import { Container, Section, Eyebrow, Heading, Button, type Surface } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  type Service,
  relatedWorkForService,
  featuredCaseStudyForService,
  type WorkCard,
} from "@/data/services";
import type { CaseStudy } from "@/data/case-studies";
import { serviceIcon } from "./serviceIcons";
import { ServiceHero } from "./ServiceHero";
import { ServiceFaqs } from "./ServiceFaqs";

/** Brand strengths for the "Why AFAQ" section (localized inline). */
const STRENGTHS = [
  { en: "Vision 2030 Aligned", ar: "متوائم مع رؤية 2030" },
  { en: "Integrated Engineering", ar: "هندسة متكاملة" },
  { en: "One Partner, Every Layer", ar: "شريك واحد، كل طبقة" },
  { en: "Saudi Standards Compliant", ar: "متوافق مع المعايير السعودية" },
];

export function ServiceDetail({ service }: { service: Service }) {
  const work = relatedWorkForService(service.category);
  const featured = featuredCaseStudyForService(service.category);
  // Don't repeat the featured study inside the related grid.
  const related = featured ? work.filter((w) => w.href !== `/case-studies/${featured.slug}`) : work;

  return (
    <>
      <ServiceHero service={service} />
      <Overview service={service} surface="mist-50" />
      <Capabilities service={service} surface="white" />
      <Technologies service={service} surface="mist-50" />
      <Industries service={service} surface="white" />
      <Process service={service} surface="mist-50" />
      <Why service={service} surface="white" />
      {related.length > 0 && <RelatedProjects items={related} surface="mist-50" />}
      {featured && <FeaturedCase study={featured} surface="white" />}
      <ServiceFaqs faqs={service.faqs} />
    </>
  );
}

/* ── 02 · Overview ───────────────────────────────────────────────────────── */
function Overview({ service, surface }: { service: Service; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail.overview");
  return (
    <Section surface={surface} id="overview">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} />
        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {service.overview.map((o, i) => {
            const Icon = serviceIcon(o.icon);
            return (
              <div key={i} className="rounded-card border border-line bg-white p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-display text-body-lg font-semibold text-slate-900">{o.title[lang]}</h3>
                <p className="mt-2 text-body text-slate-600">{o.body[lang]}</p>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 03 · Key Capabilities ───────────────────────────────────────────────── */
function Capabilities({ service, surface }: { service: Service; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail.capabilities");
  return (
    <Section surface={surface} id="capabilities">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} />
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {service.capabilities.map((c, i) => {
            const Icon = serviceIcon(c.icon);
            return (
              <div
                key={i}
                className="group rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg hover:shadow-ink-900/5"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-ink-900">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-display text-body-lg font-semibold text-slate-900">{c.title[lang]}</h3>
                <p className="mt-1.5 text-body text-slate-600">{c.desc[lang]}</p>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 04 · Technologies & Standards ───────────────────────────────────────── */
function Technologies({ service, surface }: { service: Service; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail.technologies");
  return (
    <Section surface={surface} id="technologies">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-10 space-y-8">
          {service.techGroups.map((g, i) => (
            <Reveal key={i} className="grid gap-4 border-t border-line pt-6 md:grid-cols-[14rem_1fr] md:gap-8">
              <p className="font-display text-eyebrow uppercase tracking-[0.12em] text-brand-600">{g.label[lang]}</p>
              <div className="flex flex-wrap gap-2.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-line bg-white px-4 py-2 font-display text-[0.875rem] font-medium text-slate-700 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── 05 · Industries We Serve ────────────────────────────────────────────── */
function Industries({ service, surface }: { service: Service; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail");
  return (
    <Section surface={surface} id="industries">
      <Container>
        <SectionHead eyebrow={t("industries.eyebrow")} title={t("industries.title")} />
        <Reveal className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" stagger={0.04}>
          {service.industries.map((ind, i) => {
            const Icon = serviceIcon(ind.icon);
            return (
              <Link
                key={i}
                href="/projects"
                className="group flex flex-col items-center gap-3 rounded-card border border-line bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg hover:shadow-ink-900/5"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-ink-900">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <span className="font-display text-[0.9375rem] font-medium text-slate-900">{ind.label[lang]}</span>
              </Link>
            );
          })}
        </Reveal>
        <p className="mt-6 text-body text-slate-500">{t("industriesCta")} →</p>
      </Container>
    </Section>
  );
}

/* ── 06 · Our Process (horizontal timeline) ──────────────────────────────── */
function Process({ service, surface }: { service: Service; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail.process");
  return (
    <Section surface={surface} id="process">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} />
        <div className="relative mt-12">
          <div className="absolute inset-x-0 top-6 hidden h-px bg-line lg:block" aria-hidden="true" />
          <Reveal
            className="flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-7 lg:gap-3 lg:overflow-visible lg:pb-0"
            stagger={0.05}
          >
            {service.process.map((step, i) => {
              const Icon = serviceIcon(step.icon);
              return (
                <div key={i} className="relative min-w-[220px] snap-start lg:min-w-0">
                  <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border border-brand-500/30 bg-white font-display text-body font-semibold text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 flex items-center gap-2 text-slate-900">
                    <Icon className="size-4 text-brand-600" strokeWidth={2} />
                    <h3 className="font-display text-body font-semibold">{step.title[lang]}</h3>
                  </div>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-slate-500">{step.desc[lang]}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── 07 · Why Choose AFAQ ─────────────────────────────────────────────────── */
function Why({ service, surface }: { service: Service; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail.why");
  return (
    <Section surface={surface} id="why">
      <Container>
        <div className="max-w-2xl">
          <SectionHead eyebrow={t("eyebrow")} title={t("title")} />
          <p className="mt-5 text-body-lg text-slate-600">{t("note")}</p>
        </div>

        <Reveal className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-6" stagger={0.05}>
          {service.stats.map((s, i) => (
            <div key={i} className="rounded-card border border-line bg-white p-6">
              <span
                dir="ltr"
                className="block font-display text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-brand-600 tabular-nums"
              >
                {s.value}
              </span>
              <span className="mt-2.5 block text-eyebrow uppercase tracking-[0.1em] text-slate-500">
                {s.label[lang]}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.05}>
          {STRENGTHS.map((st, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-card border border-brand-500/20 bg-brand-500/[0.04] p-5"
            >
              <Sparkles className="size-5 shrink-0 text-brand-600" strokeWidth={2} />
              <span className="font-display text-[0.9375rem] font-semibold text-slate-900">{st[lang]}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 08 · Related Projects ───────────────────────────────────────────────── */
function RelatedProjects({ items, surface }: { items: WorkCard[]; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail.related");
  return (
    <Section surface={surface} id="related-projects">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} note={t("note")} />
        <Reveal className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {items.map((w, i) => (
            <article key={i} className="group">
              <Link href={w.href} className="block">
                <div className="overflow-hidden rounded-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-eyebrow uppercase tracking-[0.12em] text-slate-500">
                  {w.industry[lang] && <span className="text-brand-600">{w.industry[lang]}</span>}
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" strokeWidth={2} />
                    {w.location[lang]}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-h3 font-semibold leading-tight text-slate-900 transition-colors group-hover:text-brand-600">
                  {w.title[lang]}
                </h3>
                <p className="mt-2 line-clamp-2 text-body text-slate-600">{w.teaser[lang]}</p>
                {w.tech.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {w.tech.map((tech) => (
                      <span key={tech} className="rounded-full bg-brand-500/10 px-2.5 py-1 text-[0.75rem] font-medium text-brand-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 09 · Featured Case Study ────────────────────────────────────────────── */
function FeaturedCase({ study, surface }: { study: CaseStudy; surface: Surface }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail.featured");
  const tRoot = useTranslations("ServiceDetail");

  return (
    <Section surface={surface} id="featured-case">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} />
        <Reveal className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-card shadow-xl shadow-ink-900/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={study.hero} alt="" className="aspect-[4/3] w-full object-cover" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-eyebrow uppercase tracking-[0.12em] text-brand-600">
              <span>{study.projectType?.[lang] ?? study.location[lang]}</span>
            </div>
            <h3 className="mt-3 font-display text-h2 font-semibold leading-[1.1] text-slate-900">
              {study.name[lang]}
            </h3>
            <p className="mt-4 text-body-lg text-slate-600">{study.overview[lang]}</p>

            {study.challenge?.length ? (
              <Block label={t("challengeLabel")} body={study.challenge[0][lang]} />
            ) : null}
            {study.solutionPhases?.length ? (
              <Block
                label={t("solutionLabel")}
                body={study.solutionPhases.map((p) => p.title[lang]).join(" → ")}
              />
            ) : null}

            {study.metrics?.length ? (
              <div className="mt-6 border-t border-line pt-6">
                <p className="font-display text-eyebrow uppercase tracking-[0.12em] text-slate-600">
                  {t("resultsLabel")}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-6">
                  {study.metrics.slice(0, 3).map((m, i) => (
                    <div key={i}>
                      <span dir="ltr" className="block font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-none text-brand-600 tabular-nums">
                        {m.value}
                      </span>
                      <span className="mt-1.5 block text-[0.75rem] uppercase tracking-[0.1em] text-slate-500">
                        {m.label[lang]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-8">
              <Button variant="primary" href={`/case-studies/${study.slug}`}>
                {tRoot("readFullCase")}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-6">
      <p className="inline-flex items-center gap-2 font-display text-eyebrow uppercase tracking-[0.12em] text-brand-600">
        <Check className="size-4" strokeWidth={2.5} />
        {label}
      </p>
      <p className="mt-2 text-body text-slate-600">{body}</p>
    </div>
  );
}

/* ── shared header ───────────────────────────────────────────────────────── */
function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <Eyebrow tone="brand">{eyebrow}</Eyebrow>
      <Heading as="h2" size="h2" className="mt-4 text-slate-900">
        {title}
      </Heading>
      {note && <p className="mt-4 text-body-lg text-slate-600">{note}</p>}
    </Reveal>
  );
}
