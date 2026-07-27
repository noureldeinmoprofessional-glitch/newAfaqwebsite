"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { easeOut } from "@/lib/gsap/easings";
import { Container, Button } from "@/components/primitives";

/**
 * Homepage hero — a scroll-scrubbed engineering film on a bright white theme.
 *
 * The MP4 never plays on its own on desktop/tablet: ScrollTrigger pins the hero
 * and maps scroll progress → `video.currentTime` through a GSAP timeline with a
 * `scrub` (inertia/damping), so the page "pauses" while the user scrubs the
 * timeline, then unpins at the final frame (and re-pins / reverses on the way
 * up). Setup waits for `loadedmetadata` so we know the duration and never
 * initialise against a black frame.
 *
 * Responsive / a11y (via gsap.matchMedia):
 *   • ≥768px, motion OK … pinned scroll-scrub (the full experience).
 *   • <768px, motion OK … no pin; the clip autoplays once when it enters view.
 *   • prefers-reduced-motion … no scrub/pin; first frame shown, page scrolls.
 *
 * RTL: layout mirrors automatically (content is first in the DOM, so it sits on
 * the right under dir="rtl"), and the video itself is flipped with scaleX(-1)
 * so the drone/empty-space composition stays on-brand. One element, no dupes.
 */
export function VideoHero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useGsapContext(
    () => {
      const section = root.current;
      const video = videoRef.current;
      const content = contentRef.current;
      if (!section || !video) return;

      // Never let the element play by itself on the scrubbed breakpoints.
      video.pause();

      let mm: gsap.MatchMedia | null = null;

      /** Build all scroll behaviour once we know the video duration. */
      const build = () => {
        setReady(true);
        try {
          video.currentTime = 0;
        } catch {
          /* seeking not ready yet — harmless */
        }

        mm = gsap.matchMedia();

        // One-time, subtle content reveal (skipped under reduced motion).
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          if (!content) return;
          gsap.from(content.querySelectorAll(".vh-reveal"), {
            opacity: 0,
            y: 16,
            duration: 0.8,
            ease: easeOut,
            stagger: 0.08,
            delay: 0.05,
          });
        });

        // ── Desktop / tablet: pinned scroll-scrub ─────────────────────────
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
          const duration = video.duration || 1;
          // Scroll length tuned so scrubbing feels natural (~200px per second).
          const distance = () => Math.min(2800, Math.max(900, Math.round((video.duration || 1) * 280)));

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 1, // ~1s catch-up → damped, non-mechanical inertia
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });

          // Map the whole timeline (0→1) onto the video timeline (0→duration).
          tl.to(video, { currentTime: duration, ease: "none" }, 0);
          // Very subtle content drift so focus stays on the film.
          if (content) tl.to(content, { opacity: 0.72, y: -18, ease: "none" }, 0);

          return () => tl.scrollTrigger?.kill();
        });

        // ── Mobile: elegant fallback — autoplay once on enter ─────────────
        mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
          const st = ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            once: true,
            onEnter: () => {
              video.muted = true;
              video.play().catch(() => {
                /* autoplay blocked — first frame remains, still premium */
              });
            },
          });
          return () => st.kill();
        });

        // Positions depend on the (async) pin spacer we just created.
        ScrollTrigger.refresh();
      };

      // Init only after metadata is available (duration + first frame known).
      const onMeta = () => build();
      if (video.readyState >= 1 /* HAVE_METADATA */) {
        build();
      } else {
        video.addEventListener("loadedmetadata", onMeta, { once: true });
      }

      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
        mm?.revert();
      };
    },
    root,
    [locale], // rebuild on locale flip so RTL geometry re-measures
  );

  return (
    <section
      ref={root}
      id="video-hero"
      className="relative w-full overflow-hidden bg-white"
      aria-label={t("title")}
    >
      {/* ── Full-bleed scroll-controlled film. object-contain keeps the whole
          composition (never cropped/distorted) at full size; RTL simply mirrors
          it horizontally — still full size, never shrunk to a side. ── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-contain opacity-0 transition-opacity duration-700 [transform:translateZ(0)] [backface-visibility:hidden] data-[ready=true]:opacity-100 rtl:[transform:scaleX(-1)_translateZ(0)]"
          data-ready={ready}
          src="/media/hero.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Elegant loading state (white theme, no black frame). */}
      {!ready && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="size-8 animate-spin rounded-full border-2 border-brand-500/25 border-t-brand-500" />
        </div>
      )}

      {/* ── Marketing content, overlaid on the empty side of the film.
          Sits at the inline-start (left in LTR, right in RTL) automatically. ── */}
      <Container className="pointer-events-none relative z-10">
        <div
          ref={contentRef}
          className="flex min-h-[100svh] flex-col justify-center pt-24 pb-12 lg:pt-0 lg:pb-0"
        >
          <div className="pointer-events-auto max-w-xl">
            <p className="vh-reveal flex items-center gap-3 font-display text-eyebrow uppercase tracking-[0.14em] text-brand-600">
              <span className="inline-block h-px w-8 bg-brand-500" aria-hidden="true" />
              {t("eyebrow")}
            </p>

            <h1 className="vh-reveal mt-6 font-display text-display font-semibold leading-[0.98] tracking-[-0.03em] text-brand-600">
              {t("title")}
            </h1>

            <p className="vh-reveal mt-7 max-w-lg text-body-lg text-slate-600">{t("subtitle")}</p>

            <div className="vh-reveal mt-10 flex flex-wrap gap-4">
              {/* Primary CTA — in-page anchor, so a plain <a> (not a locale route). */}
              <a
                href="#services"
                className="group/btn inline-flex items-center gap-3 rounded-full bg-brand-500 py-2 ps-7 pe-2 font-display text-base font-medium text-ink-900 transition-colors hover:bg-brand-400"
              >
                <span>{t("ctaPrimary")}</span>
                <span
                  className="inline-flex size-10 items-center justify-center rounded-full bg-ink-900 text-brand-400 transition-transform duration-300 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5"
                  aria-hidden="true"
                >
                  <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2.5} />
                </span>
              </a>

              <Button variant="outline-dark" size="lg" href="/contact">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
