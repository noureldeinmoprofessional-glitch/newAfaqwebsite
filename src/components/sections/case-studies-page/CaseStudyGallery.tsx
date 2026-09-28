"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section, type Surface } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * 09 — Project Gallery. A premium masonry-style grid with a fullscreen lightbox
 * (keyboard + arrow navigation), subtle zoom on hover, and lazy loading.
 */
export function CaseStudyGallery({
  images,
  title,
  surface = "mist-50",
}: {
  images: string[];
  title: string;
  surface?: Surface;
}) {
  const t = useTranslations("CaseStudyDetail");
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <Section surface={surface} id="gallery">
      <Container>
        <p className="font-display text-eyebrow uppercase text-brand-600">09</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-h2 font-semibold text-slate-900">{title}</h2>
          <p className="text-body text-slate-500">{t("galleryHint")}</p>
        </div>

        <Reveal className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5" stagger={0.05}>
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-image outline-none ring-brand-500/40 focus-visible:ring-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="lazy"
                className={cn(
                  "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]",
                  i % 3 === 0 ? "aspect-[4/3]" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-square",
                )}
              />
            </button>
          ))}
        </Reveal>
      </Container>

      {/* Lightbox */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            aria-label={t("lightboxClose")}
            onClick={close}
            className="absolute end-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-mist-50 transition-colors hover:bg-white/20"
          >
            <X className="size-5" strokeWidth={2} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label={t("lightboxPrev")}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute start-4 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-mist-50 transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="size-6 rtl:rotate-180" strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label={t("lightboxNext")}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute end-4 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-mist-50 transition-colors hover:bg-white/20"
              >
                <ChevronRight className="size-6 rtl:rotate-180" strokeWidth={2} />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88svh] max-w-[92vw] rounded-image object-contain shadow-2xl"
          />
        </div>
      )}
    </Section>
  );
}
