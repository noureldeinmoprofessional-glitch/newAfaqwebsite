"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeExpo, easeOut } from "@/lib/gsap/easings";
import { Container } from "@/components/primitives";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/data/case-studies";
import { CASE_CATEGORY_META } from "./caseCategoryMeta";

/**
 * 01 — Cinematic hero. Full-bleed project photograph (kept visible — the wash
 * only darkens where text sits), a parallax scroll-out and a staggered reveal.
 * A facts strip (client · location · type · industry) closes the hero, so the
 * page needs no separate "snapshot" section. `id="hero"` keeps the header
 * transparent over it.
 */
export function CaseStudyHero({ study }: { study: CaseStudy }) {
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  const tc = useTranslations("CaseStudiesPage.categories");
  const root = useRef<HTMLElement>(null);
  const { Icon } = CASE_CATEGORY_META[study.category];
  const facts = [
    { label: t("snapshot.client"), value: study.client[lang] },
    { label: t("snapshot.location"), value: study.location[lang] },
    study.projectType && { label: t("snapshot.type"), value: study.projectType[lang] },
    study.industry && { label: t("snapshot.industry"), value: study.industry[lang] },
  ].filter(Boolean) as { label: string; value: string }[];

  useGsapContext(
    () => {
      const node = root.current;
      if (!node) return;
      const q = gsap.utils.selector(node);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.1 });
        tl.from(q(".csh-fade"), { opacity: 0, y: 24, duration: 0.8, ease: easeOut, stagger: 0.1 })
          .from(q(".csh-title"), { opacity: 0, y: 36, duration: 1, ease: easeExpo }, "-=0.5");

        gsap.to(q(".csh-media"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    root,
    [],
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative isolate flex min-h-[80svh] w-full items-end overflow-hidden bg-ink-900 pb-12 pt-32 lg:pb-16"
    >
      {/* Media */}
      <div className="csh-media absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={study.hero}
          alt=""
          className="h-full w-full object-cover"
          style={{ viewTransitionName: `cs-hero-${study.slug}` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-ink-900/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-ink-900/10 to-transparent rtl:bg-gradient-to-l" />
      </div>

      <Container className="relative">
        <Link
          href="/case-studies"
          className="csh-fade inline-flex items-center gap-2 font-display text-eyebrow uppercase text-mist-50/85 transition-colors hover:text-brand-400"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={2} />
          {t("back")}
        </Link>

        <div className="csh-fade mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-eyebrow uppercase text-brand-400">
          <span>{t("kicker")}</span>
          <span aria-hidden="true" className="text-mist-50/60">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5 text-brand-400">
            <Icon className="size-3.5" strokeWidth={2} />
            {tc(study.category)}
          </span>
        </div>

        <h1 className="csh-title mt-5 max-w-4xl font-display text-display font-semibold text-mist-50">
          {study.name[lang]}
        </h1>

        {study.tagline && (
          <p className="csh-fade mt-5 max-w-2xl text-body-lg text-mist-50/90">{study.tagline[lang]}</p>
        )}

        <dl className="csh-fade mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-mist-50/20 pt-6 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="min-w-0">
              <dt className="font-display text-small font-semibold uppercase tracking-[0.06em] text-brand-400">
                {f.label}
              </dt>
              <dd className="mt-1.5 text-body font-medium text-mist-50">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
