"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, MapPin, Building, Layers } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeExpo, easeOut } from "@/lib/gsap/easings";
import { Container } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/data/case-studies";
import { CASE_CATEGORY_META } from "./caseCategoryMeta";

/**
 * 01 — Cinematic hero. Full-bleed project photograph under a deep-green wash
 * with blueprint grids and contour overlays, a parallax scroll-out, and a
 * staggered content reveal. `id="hero"` keeps the header transparent over it.
 */
export function CaseStudyHero({ study }: { study: CaseStudy }) {
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const t = useTranslations("CaseStudyDetail");
  const tc = useTranslations("CaseStudiesPage.categories");
  const root = useRef<HTMLElement>(null);
  const { Icon } = CASE_CATEGORY_META[study.category];

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
      className="relative flex min-h-[80svh] w-full items-end overflow-hidden bg-ink-900 pb-16 pt-32 lg:pb-24"
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-ink-900/20 to-transparent rtl:bg-gradient-to-l" />
        <TechBackground variant="topo" opacity={8} className="text-brand-400" />
        <TechBackground variant="grid" opacity={5} className="text-tech-500" />
      </div>

      <Container className="relative">
        <Link
          href="/case-studies"
          className="csh-fade inline-flex items-center gap-2 font-display text-eyebrow uppercase text-mist-50/60 transition-colors hover:text-brand-400"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={2} />
          {t("back")}
        </Link>

        <div className="csh-fade mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-eyebrow uppercase text-brand-400">
          <span>{t("kicker")}</span>
          <span aria-hidden="true" className="text-mist-50/40">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5 text-brand-400">
            <Icon className="size-3.5" strokeWidth={2} />
            {tc(study.category)}
          </span>
        </div>

        <h1 className="csh-title mt-5 max-w-4xl font-display text-display font-semibold leading-[0.98] tracking-[-0.03em] text-mist-50">
          {study.name[lang]}
        </h1>

        {study.tagline && (
          <p className="csh-fade mt-5 max-w-2xl text-body-lg text-mist-50/75">{study.tagline[lang]}</p>
        )}

        <div className="csh-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-body text-mist-50/70">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-brand-400" strokeWidth={2} />
            {study.location[lang]}
          </span>
          <span className="inline-flex items-center gap-2">
            <Building className="size-4 text-brand-400" strokeWidth={2} />
            {study.client[lang]}
          </span>
          {study.projectType && (
            <span className="inline-flex items-center gap-2">
              <Layers className="size-4 text-brand-400" strokeWidth={2} />
              {study.projectType[lang]}
            </span>
          )}
        </div>
      </Container>
    </section>
  );
}
