"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { CASE_STUDIES, CASE_CATEGORY_KEYS } from "@/data/case-studies";
import type { Category } from "@/data/projects";
import { CASE_CATEGORY_META } from "./caseCategoryMeta";
import { CaseStudyCard } from "./CaseStudyCard";

/** Featured engagements lead the grid, then the wider portfolio. */
const ORDERED = [...CASE_STUDIES].sort((a, b) => Number(b.featured) - Number(a.featured));

/** Only offer filters for disciplines that actually appear. */
const PRESENT: Category[] = CASE_CATEGORY_KEYS.filter((k) => CASE_STUDIES.some((c) => c.category === k));

/**
 * Case Studies index — a premium editorial grid of every project in the
 * company profile, with an instant client-side discipline filter.
 */
export function CaseStudyGrid() {
  const t = useTranslations("CaseStudiesPage");
  const tc = useTranslations("CaseStudiesPage.categories");
  const [category, setCategory] = useState<Category | "all">("all");

  const filtered = useMemo(
    () => (category === "all" ? ORDERED : ORDERED.filter((c) => c.category === category)),
    [category],
  );

  return (
    <Section surface="white" id="case-studies" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={3} className="text-slate-900" />
      <Container className="relative">
        <p className="max-w-2xl text-body-lg text-slate-600">{t("note")}</p>

        {/* Discipline filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          <Pill active={category === "all"} onClick={() => setCategory("all")}>
            {t("all")}
          </Pill>
          {PRESENT.map((k) => (
            <Pill key={k} active={category === k} onClick={() => setCategory(k)}>
              <span className={cn("size-1.5 rounded-full", CASE_CATEGORY_META[k].dot)} aria-hidden="true" />
              {tc(k)}
            </Pill>
          ))}
        </div>

        {/* Grid — keyed by category so cards re-reveal on filter change */}
        <Reveal
          key={category}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          stagger={0.06}
        >
          {filtered.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-small font-medium transition-colors",
        active
          ? "border-brand-500 bg-brand-500/10 text-brand-600"
          : "border-line text-slate-600 hover:border-slate-300",
      )}
    >
      {children}
    </button>
  );
}
