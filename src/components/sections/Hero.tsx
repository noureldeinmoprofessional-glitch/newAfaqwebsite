"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeExpo, easeOut } from "@/lib/gsap/easings";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

const LAYER_KEYS = ["earth", "surface", "city", "space"] as const;

/**
 * Section 1 — full-screen immersive hero (brief §1). Layered composition reads
 * from the depths of the earth up to space technology; terrain contours drift
 * slowly, a digital grid rises, and the whole scene parallaxes out on scroll to
 * hand off to the next section.
 */
export function Hero() {
  const t = useTranslations("Hero");
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const node = root.current;
    if (!node) return;
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(node);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Intro sequence.
      const split = new SplitText(q(".hero-title"), { type: "lines", linesClass: "hero-line" });
      gsap.set(q(".hero-line"), { yPercent: 110 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(q(".hero-eyebrow"), { opacity: 1, y: 0, duration: 0.7, ease: easeOut })
        .to(q(".hero-line"), { yPercent: 0, duration: 1.1, ease: easeExpo, stagger: 0.1 }, "-=0.3")
        .to(q(".hero-sub"), { opacity: 1, y: 0, duration: 0.8, ease: easeOut }, "-=0.6")
        .to(q(".hero-cta"), { opacity: 1, y: 0, duration: 0.7, ease: easeOut, stagger: 0.1 }, "-=0.5")
        .to(q(".hero-scale > *"), { opacity: 1, x: 0, duration: 0.6, ease: easeOut, stagger: 0.08 }, "-=0.7")
        .to(q(".hero-scroll"), { opacity: 1, duration: 0.6, ease: easeOut }, "-=0.3");

      // Continuous terrain drift.
      gsap.to(q(".hero-terrain"), {
        yPercent: 6,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Scroll parallax: terrain sinks, grid rises, content lifts + fades.
      gsap.to(q(".hero-terrain"), {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q(".hero-grid"), {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q(".hero-content"), {
        y: -60,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });

      return () => split.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        q(".hero-eyebrow, .hero-title, .hero-sub, .hero-cta, .hero-scroll, .hero-scale > *"),
        { opacity: 1, x: 0, y: 0 },
      );
    });
  }, root, []);

  return (
    <section id="hero" ref={root} className="relative min-h-svh w-full overflow-hidden bg-ink-900">
      {/* Layered engineering backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink-900 to-ink-900" />
        <TechBackground variant="terrain" opacity={7} className="hero-terrain text-brand-400 top-1/3" />
        <TechBackground variant="grid" opacity={5} className="hero-grid text-tech-500" />
        <TechBackground variant="topo" opacity={6} className="text-brand-500 -right-1/4 left-auto w-2/3" />
        {/* Legibility vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <Container className="relative flex min-h-svh flex-col justify-center pb-24 pt-32">
        <div className="hero-content grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9 xl:col-span-8">
            <p className="hero-eyebrow flex items-center gap-3 font-display text-eyebrow uppercase tracking-[0.14em] text-brand-500 opacity-0" style={{ transform: "translateY(20px)" }}>
              <span className="inline-block h-px w-8 bg-brand-500" aria-hidden="true" />
              {t("eyebrow")}
            </p>

            <h1 className="hero-title mt-6 max-w-[15ch] font-display text-display font-semibold leading-[0.95] tracking-[-0.03em] text-mist-50">
              {t("title")}
            </h1>

            <p className="hero-sub mt-8 max-w-2xl text-body-lg text-mist-50/70 opacity-0" style={{ transform: "translateY(20px)" }}>
              {t("subtitle")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                className="hero-cta group inline-flex h-13 items-center gap-2 rounded-button bg-brand-500 px-7 font-display font-medium text-ink-900 opacity-0 transition-colors hover:bg-brand-400"
                style={{ transform: "translateY(20px)" }}
              >
                {t("ctaPrimary")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
              </a>
              <Link
                href="/contact"
                className="hero-cta inline-flex h-13 items-center gap-2 rounded-button border border-mist-50/25 px-7 font-display font-medium text-mist-50 opacity-0 transition-colors hover:border-brand-400 hover:text-brand-400"
                style={{ transform: "translateY(20px)" }}
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          {/* Vertical depth scale — earth → space */}
          <div className="hero-scale hidden flex-col gap-6 lg:col-span-3 lg:flex xl:col-span-4">
            {LAYER_KEYS.map((k, i) => (
              <div
                key={k}
                className="flex items-center gap-4 border-s border-line-inv ps-4 opacity-0"
                style={{ transform: "translateX(20px)" }}
              >
                <span className="font-display text-sm tabular-nums text-brand-500">
                  0{i + 1}
                </span>
                <span className="font-display text-sm uppercase tracking-[0.1em] text-mist-50/60">
                  {t(`layers.${k}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="hero-scroll absolute inset-x-0 bottom-8 flex justify-center opacity-0">
        <div className="flex flex-col items-center gap-2 text-mist-50/50">
          <span className="font-display text-[0.6875rem] uppercase tracking-[0.2em]">{t("scroll")}</span>
          <ArrowDown className="size-4 animate-bounce" strokeWidth={2} />
        </div>
      </div>
    </section>
  );
}
