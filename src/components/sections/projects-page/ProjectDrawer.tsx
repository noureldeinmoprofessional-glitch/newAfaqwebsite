"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X, MapPin, Building2, Calendar, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { getDirectionMultiplier, isRtl } from "@/i18n/direction";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { CATEGORY_META } from "./categoryMeta";
import { ProjectGlyph } from "./ProjectGlyph";

/**
 * Right-side (inline-end) project drawer. Slides in with GSAP; direction is
 * mirrored for RTL via getDirectionMultiplier. Stays mounted so open/close can
 * animate; content persists through the exit tween.
 */
export function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const dir = getDirectionMultiplier(locale);
  const t = useTranslations("ProjectsPage.drawer");
  const tc = useTranslations("ProjectsPage.categories");
  const te = useTranslations("ProjectsPage.entities");
  const tr = useTranslations("ProjectsPage.regions");

  const container = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  const [shown, setShown] = useState<Project | null>(null);

  // Keep the last project rendered during the exit animation.
  useEffect(() => {
    if (project) setShown(project);
  }, [project]);

  // Escape to close.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  // Open / close animation.
  useEffect(() => {
    const p = panel.current;
    const b = backdrop.current;
    const c = container.current;
    if (!p || !b || !c) return;

    const off = 100 * dir;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf([p, b]);

    // First mount: snap to hidden without animating.
    if (!didMount.current) {
      didMount.current = true;
      gsap.set(p, { xPercent: off });
      gsap.set(b, { opacity: 0 });
      c.style.pointerEvents = "none";
      return;
    }

    if (project) {
      c.style.pointerEvents = "auto";
      if (reduce) {
        gsap.set(b, { opacity: 1 });
        gsap.set(p, { xPercent: 0 });
      } else {
        gsap.to(b, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(p, { xPercent: off }, { xPercent: 0, duration: 0.5, ease: "power3.out" });
      }
    } else {
      if (reduce) {
        gsap.set(b, { opacity: 0 });
        gsap.set(p, { xPercent: off });
        c.style.pointerEvents = "none";
      } else {
        gsap.to(b, { opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(p, {
          xPercent: off,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => {
            c.style.pointerEvents = "none";
          },
        });
      }
    }
  }, [project, dir]);

  const meta = shown ? CATEGORY_META[shown.category] : null;

  return (
    <div ref={container} className="fixed inset-0 z-[60]" aria-hidden={!project}>
      <div
        ref={backdrop}
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/60 opacity-0 backdrop-blur-sm"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={shown?.name[lang]}
        className={cn(
          "absolute inset-y-0 end-0 flex w-full max-w-xl flex-col bg-white text-slate-900 shadow-2xl",
          isRtl(locale) ? "border-e border-line" : "border-s border-line",
        )}
      >
        {shown && meta && (
          <>
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="inline-flex items-center gap-2 font-display text-eyebrow uppercase tracking-[0.12em] text-slate-600">
                <span className={cn("size-2 rounded-full", meta.dot)} aria-hidden="true" />
                {tc(shown.category)}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("close")}
                className="inline-flex size-9 items-center justify-center rounded-button text-slate-600 transition-colors hover:bg-mist-100"
              >
                <X className="size-5" strokeWidth={2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ProjectGlyph category={shown.category} ratio="16/9" />

              <h2 className="mt-6 font-display text-h2 font-semibold leading-[1.1] text-slate-900">
                {shown.name[lang]}
              </h2>

              <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-line py-6 sm:grid-cols-2">
                <Meta icon={<MapPin className="size-4 text-brand-600" strokeWidth={2} />} label={t("location")}>
                  {shown.city[lang]} · {tr(shown.region)}
                </Meta>
                <Meta icon={<Building2 className="size-4 text-brand-600" strokeWidth={2} />} label={t("entity")}>
                  {te(shown.entity)}
                </Meta>
                <Meta icon={<Calendar className="size-4 text-brand-600" strokeWidth={2} />} label={t("year")}>
                  <span dir="ltr">{shown.year}</span>
                </Meta>
              </dl>

              <Block label={t("scopeLabel")}>{shown.scope[lang]}</Block>
              <Block label={t("technicalLabel")}>{shown.technical[lang]}</Block>
            </div>

            <div className="flex flex-col gap-3 border-t border-line px-6 py-5 sm:flex-row">
              <Link
                href="/case-studies"
                onClick={onClose}
                className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-button bg-brand-500 px-5 font-display font-medium text-ink-900 transition-colors hover:bg-brand-400"
              >
                {t("caseStudy")}
                <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2} />
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-button border border-line px-5 font-display font-medium text-slate-900 transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                {t("contact")}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Meta({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 font-display text-eyebrow uppercase tracking-[0.12em] text-slate-600">
        {icon}
        {label}
      </dt>
      <dd className="mt-1.5 text-body text-slate-900">{children}</dd>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="font-display text-eyebrow uppercase tracking-[0.12em] text-slate-600">{label}</p>
      <p className="mt-2 text-body-lg text-slate-600">{children}</p>
    </div>
  );
}
