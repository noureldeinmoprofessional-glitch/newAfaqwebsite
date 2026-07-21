"use client";

import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeExpo, easeOut } from "@/lib/gsap/easings";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

/**
 * Reusable inner-page hero. Full-viewport (or compact) dark hero with layered
 * technical overlays, a SplitText line reveal, parallax scroll-out, and an
 * optional primary CTA. Uses `id="hero"` so the shared header keeps its
 * transparent-over-hero transition. Strings are passed in (resolved per page).
 */
export function InnerHero({
  eyebrow,
  title,
  subtitle,
  scrollLabel,
  ctaLabel,
  ctaHref,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  scrollLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  compact?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const node = root.current;
    if (!node) return;
    const q = gsap.utils.selector(node);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = new SplitText(q(".ih-title"), { type: "lines", linesClass: "ih-line" });
      gsap.set(q(".ih-line"), { yPercent: 110 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(q(".ih-eyebrow"), { opacity: 1, y: 0, duration: 0.7, ease: easeOut })
        .to(q(".ih-line"), { yPercent: 0, duration: 1.05, ease: easeExpo, stagger: 0.1 }, "-=0.3")
        .to(q(".ih-sub"), { opacity: 1, y: 0, duration: 0.8, ease: easeOut }, "-=0.5")
        .to(q(".ih-cta"), { opacity: 1, y: 0, duration: 0.7, ease: easeOut }, "-=0.5")
        .to(q(".ih-scroll"), { opacity: 1, duration: 0.6, ease: easeOut }, "-=0.3");

      gsap.to(q(".ih-contour"), {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q(".ih-content"), {
        y: -40,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });

      return () => split.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(q(".ih-eyebrow, .ih-title, .ih-sub, .ih-cta, .ih-scroll"), { opacity: 1, y: 0 });
    });
  }, root, []);

  return (
    <section
      id="hero"
      ref={root}
      className={`relative flex w-full items-center overflow-hidden bg-ink-900 ${compact ? "min-h-[62svh]" : "min-h-[85svh]"}`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink-900 to-ink-900" />
        <TechBackground variant="topo" opacity={7} className="ih-contour text-brand-400" />
        <TechBackground variant="grid" opacity={5} className="text-tech-500" />
        <TechBackground variant="survey" opacity={4} className="text-gold -right-1/4 left-auto w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <Container className="relative pt-28">
        <div className="ih-content max-w-4xl">
          <p
            className="ih-eyebrow flex items-center gap-3 font-display text-eyebrow uppercase tracking-[0.14em] text-gold opacity-0"
            style={{ transform: "translateY(20px)" }}
          >
            <span className="inline-block h-px w-8 bg-gold" aria-hidden="true" />
            {eyebrow}
          </p>

          <h1 className="ih-title mt-6 max-w-[16ch] font-display text-display font-semibold leading-[0.95] tracking-[-0.03em] text-mist-50">
            {title}
          </h1>

          <p className="ih-sub mt-8 max-w-2xl text-body-lg text-mist-50/70 opacity-0" style={{ transform: "translateY(20px)" }}>
            {subtitle}
          </p>

          {ctaLabel && ctaHref && (
            <div className="mt-10">
              <Link
                href={ctaHref}
                className="ih-cta group inline-flex h-13 items-center gap-2 rounded-button bg-brand-500 px-7 font-display font-medium text-ink-900 opacity-0 transition-colors hover:bg-brand-400"
                style={{ transform: "translateY(20px)" }}
              >
                {ctaLabel}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
              </Link>
            </div>
          )}
        </div>
      </Container>

      {scrollLabel && (
        <div className="ih-scroll absolute inset-x-0 bottom-8 flex justify-center opacity-0">
          <div className="flex flex-col items-center gap-2 text-mist-50/50">
            <span className="font-display text-[0.6875rem] uppercase tracking-[0.2em]">{scrollLabel}</span>
            <ArrowDown className="size-4 animate-bounce" strokeWidth={2} />
          </div>
        </div>
      )}
    </section>
  );
}
