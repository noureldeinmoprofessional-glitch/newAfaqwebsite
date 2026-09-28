"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeExpo, easeOut } from "@/lib/gsap/easings";
import { Container } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

/**
 * Projects §1 — minimal full-width hero over dark emerald engineering imagery
 * (placeholder overlays until aerial photography lands). Uses `id="hero"` for
 * the shared header transition. Project count is interpolated dynamically.
 */
export function ProjectsHero({ count }: { count: number }) {
  const t = useTranslations("ProjectsPage.hero");
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const node = root.current;
    if (!node) return;
    const q = gsap.utils.selector(node);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = new SplitText(q(".ph-title"), { type: "lines", linesClass: "ph-line" });
      gsap.set(q(".ph-line"), { yPercent: 110 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(q(".ph-eyebrow"), { opacity: 1, y: 0, duration: 0.7, ease: easeOut })
        .to(q(".ph-line"), { yPercent: 0, duration: 1.05, ease: easeExpo, stagger: 0.1 }, "-=0.3")
        .to(q(".ph-sub"), { opacity: 1, y: 0, duration: 0.8, ease: easeOut }, "-=0.5")
        .to(q(".ph-scroll"), { opacity: 1, duration: 0.6, ease: easeOut }, "-=0.3");

      gsap.to(q(".ph-contour"), {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q(".ph-content"), {
        y: -40,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });

      return () => split.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(q(".ph-eyebrow, .ph-title, .ph-sub, .ph-scroll"), { opacity: 1, y: 0 });
    });
  }, root, []);

  return (
    <section id="hero" ref={root} className="relative flex min-h-[85svh] w-full items-center overflow-hidden bg-ink-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink-900 to-ink-900" />
        <TechBackground variant="topo" opacity={7} className="ph-contour text-brand-400" />
        <TechBackground variant="grid" opacity={5} className="text-tech-500" />
        <TechBackground variant="survey" opacity={4} className="text-brand-400 -right-1/4 left-auto w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <Container className="relative pt-24">
        <div className="ph-content max-w-4xl">
          <p
            className="ph-eyebrow flex items-center gap-3 font-display text-eyebrow uppercase text-brand-400 opacity-0"
            style={{ transform: "translateY(20px)" }}
          >
            <span className="inline-block h-px w-8 bg-brand-500" aria-hidden="true" />
            {t("eyebrow")}
          </p>

          <h1 className="ph-title mt-6 max-w-[16ch] font-display text-display font-semibold text-mist-50">
            {t("title")}
          </h1>

          <p
            className="ph-sub mt-8 max-w-2xl text-body-lg text-mist-50/70 opacity-0"
            style={{ transform: "translateY(20px)" }}
          >
            {t("subtitle", { count })}
          </p>
        </div>
      </Container>

      <div className="ph-scroll absolute inset-x-0 bottom-8 flex justify-center opacity-0">
        <div className="flex flex-col items-center gap-2 text-mist-50/50">
          <span className="font-display text-eyebrow uppercase">{t("scroll")}</span>
          <ArrowDown className="size-4 animate-bounce" strokeWidth={2} />
        </div>
      </div>
    </section>
  );
}
