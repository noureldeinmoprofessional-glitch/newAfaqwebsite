"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeExpo, easeOut } from "@/lib/gsap/easings";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

/**
 * About §1 — full-viewport cinematic hero. Uses `id="hero"` so the shared header
 * keeps its transparent-over-hero → solid transition. Multiple engineering
 * disciplines are implied through layered technical overlays; the scroll cue is
 * an animated blueprint line that draws down into the next section.
 */
export function AboutHero() {
  const t = useTranslations("AboutPage.hero");
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const node = root.current;
    if (!node) return;
    const q = gsap.utils.selector(node);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = new SplitText(q(".ah-title"), { type: "lines", linesClass: "ah-line" });
      gsap.set(q(".ah-line"), { yPercent: 110 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(q(".ah-eyebrow"), { opacity: 1, y: 0, duration: 0.7, ease: easeOut })
        .to(q(".ah-line"), { yPercent: 0, duration: 1.1, ease: easeExpo, stagger: 0.1 }, "-=0.3")
        .to(q(".ah-sub"), { opacity: 1, y: 0, duration: 0.8, ease: easeOut }, "-=0.6")
        .to(q(".ah-cta"), { opacity: 1, y: 0, duration: 0.7, ease: easeOut }, "-=0.5")
        .fromTo(q(".ah-scroll-line"), { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: easeOut }, "-=0.2");

      // Parallax layers on scroll-out.
      gsap.to(q(".ah-topo"), {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q(".ah-content"), {
        y: -50,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });

      return () => split.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(q(".ah-eyebrow, .ah-title, .ah-sub, .ah-cta"), { opacity: 1, y: 0 });
      gsap.set(q(".ah-scroll-line"), { scaleY: 1 });
    });
  }, root, []);

  return (
    <section id="hero" ref={root} className="relative min-h-svh w-full overflow-hidden bg-ink-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink-900 to-ink-900" />
        <TechBackground variant="topo" opacity={7} className="ah-topo text-brand-400" />
        <TechBackground variant="grid" opacity={5} className="text-tech-500" />
        <TechBackground variant="survey" opacity={5} className="text-brand-400 -right-1/4 left-auto w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <Container className="relative flex min-h-svh flex-col justify-center pb-24 pt-32">
        <div className="ah-content max-w-4xl">
          <p
            className="ah-eyebrow flex items-center gap-3 font-display text-eyebrow uppercase tracking-[0.14em] text-brand-400 opacity-0"
            style={{ transform: "translateY(20px)" }}
          >
            <span className="inline-block h-px w-8 bg-brand-500" aria-hidden="true" />
            {t("eyebrow")}
          </p>

          <h1 className="ah-title mt-6 max-w-[16ch] font-display text-display font-semibold leading-[0.95] tracking-[-0.03em] text-mist-50">
            {t("title")}
          </h1>

          <p
            className="ah-sub mt-8 max-w-2xl text-body-lg text-mist-50/70 opacity-0"
            style={{ transform: "translateY(20px)" }}
          >
            {t("subtitle")}
          </p>

          <div className="mt-10">
            <Link
              href="/services"
              className="ah-cta group inline-flex h-13 items-center gap-2 rounded-button bg-brand-500 px-7 font-display font-medium text-ink-900 opacity-0 transition-colors hover:bg-brand-400"
              style={{ transform: "translateY(20px)" }}
            >
              {t("cta")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </Container>

      {/* Blueprint scroll indicator */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-8">
        <span className="font-display text-[0.6875rem] uppercase tracking-[0.2em] text-mist-50/50">
          {t("scroll")}
        </span>
        <span className="ah-scroll-line block h-16 w-px origin-top bg-gradient-to-b from-brand-500 to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
