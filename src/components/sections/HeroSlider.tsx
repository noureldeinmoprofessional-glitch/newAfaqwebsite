"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Container, Button } from "@/components/primitives";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const SLIDES = ["/images/hero/drone-survey.jpg", "/images/hero/av-facade.jpg"] as const;
/** Time each slide stays on screen before cross-fading to the next. */
const SLIDE_MS = 6000;

/**
 * Homepage hero — a timed, cross-fading image slider on a bright white theme.
 *
 * Both images keep their subject on one side and fade to white on the other,
 * so the headline and CTAs sit over the empty side (mirrored for RTL, where
 * the images are flipped so the subject stays opposite the copy).
 *
 * Timing is driven by the active dot's progress-bar CSS animation: when it
 * ends, the next slide shows. Pausing just pauses that animation, so the bar
 * and the timer can never drift apart. Controls: previous / next, pause /
 * play, and one dot per slide. Under prefers-reduced-motion the slider starts
 * paused and never auto-advances; manual controls still work.
 */
export function HeroSlider() {
  const t = useTranslations("Hero");
  const alts = t.raw("slider.slides") as string[];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    if (mq.matches) setPaused(true);
  }, []);

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + SLIDES.length) % SLIDES.length),
    [],
  );

  const onProgressEnd = () => {
    if (!reducedMotion.current && !paused) go(1);
  };

  return (
    <section
      id="home-hero"
      className="relative flex w-full flex-col overflow-hidden bg-white lg:block"
      aria-roledescription="carousel"
      aria-label={t("title")}
    >
      {/* ── Slides. Desktop: full-bleed behind the copy. Mobile: a band below it. ── */}
      <div className="relative order-2 h-[40svh] w-full lg:absolute lg:inset-0 lg:order-none lg:h-auto">
        {SLIDES.map((src, i) => {
          const active = i === index;
          return (
            <div
              key={src}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-out",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              <div
                className={cn(
                  "h-full w-full transition-transform ease-out",
                  active ? "scale-100 duration-[7000ms]" : "scale-105 duration-1000",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alts[i] ?? ""}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover object-[75%_100%] lg:object-right rtl:-scale-x-100"
                />
              </div>
            </div>
          );
        })}
        {/* Mobile: soft fade so the band melts into the copy above it. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent lg:hidden" />
        {/* Desktop: keep the copy side clean whatever the image does. */}
        <div className="pointer-events-none absolute inset-y-0 start-0 hidden w-[58%] bg-gradient-to-r from-white from-40% via-white/75 to-transparent lg:block rtl:bg-gradient-to-l" />
      </div>

      {/* ── Copy ── */}
      <Container className="pointer-events-none relative z-10 order-1">
        <div className="flex flex-col justify-start pt-28 pb-8 lg:min-h-[100svh] lg:justify-center lg:pt-0 lg:pb-0">
          <div className="pointer-events-auto max-w-xl">
            <h1 className="font-display text-display font-semibold text-brand-600">{t("title")}</h1>
            <p className="mt-5 max-w-lg text-body-lg text-slate-600 lg:mt-7">{t("subtitle")}</p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 lg:mt-10">
              <Link
                href="/services"
                className="group/btn inline-flex items-center gap-3 rounded-full bg-brand-500 py-2 ps-7 pe-2 font-display text-body font-medium text-ink-900 transition-colors hover:bg-brand-400"
              >
                <span>{t("ctaPrimary")}</span>
                <span
                  className="inline-flex size-10 items-center justify-center rounded-full bg-ink-900 text-brand-400 transition-transform duration-300 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5"
                  aria-hidden="true"
                >
                  <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2.5} />
                </span>
              </Link>
              <Button variant="outline-dark" size="lg" href="/contact">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Controls ── */}
      <div className="absolute inset-x-0 bottom-6 z-20 lg:bottom-10">
        <Container className="flex justify-end">
          <div className="flex items-center gap-1 rounded-full border border-line bg-white/85 p-1.5 shadow-lg shadow-ink-900/5 backdrop-blur">
            <ControlButton label={t("slider.prev")} onClick={() => go(-1)}>
              <ChevronLeft className="size-5 rtl:rotate-180" strokeWidth={2} />
            </ControlButton>

            <div className="flex items-center gap-2 px-2">
              {SLIDES.map((_, i) => {
                const active = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={t("slider.goTo", { n: i + 1 })}
                    aria-current={active || undefined}
                    className={cn(
                      "relative h-2 overflow-hidden rounded-full transition-all duration-300",
                      active ? "w-10 bg-brand-500/20" : "w-2 bg-slate-900/20 hover:bg-slate-900/40",
                    )}
                  >
                    {active && (
                      <span
                        key={index}
                        onAnimationEnd={onProgressEnd}
                        className="hero-progress absolute inset-0 rounded-full bg-brand-500"
                        style={{
                          animationDuration: `${SLIDE_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <ControlButton
              label={paused ? t("slider.play") : t("slider.pause")}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <Play className="size-4" strokeWidth={2} /> : <Pause className="size-4" strokeWidth={2} />}
            </ControlButton>

            <ControlButton label={t("slider.next")} onClick={() => go(1)}>
              <ChevronRight className="size-5 rtl:rotate-180" strokeWidth={2} />
            </ControlButton>
          </div>
        </Container>
      </div>
    </section>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-brand-500 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
    >
      {children}
    </button>
  );
}
