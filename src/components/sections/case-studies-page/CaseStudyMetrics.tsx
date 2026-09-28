"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container, Section } from "@/components/primitives";
import type { Metric } from "@/data/case-studies";

/** Split "1,080+" → {prefix:"", num:1080, decimals:0, suffix:"+"}. */
function parse(value: string): { prefix: string; num: number; decimals: number; suffix: string } | null {
  const m = value.match(/^\s*([<>~]?)\s*(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const raw = m[2].replace(/,/g, "");
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return { prefix: m[1], num: parseFloat(raw), decimals, suffix: m[3] };
}

/**
 * 08 — Project Metrics. Numeric values count up once on scroll into view
 * (reduced-motion safe); non-numeric values (e.g. "Sub-cm", "Zero") show as-is.
 */
export function CaseStudyMetrics({ metrics }: { metrics: Metric[] }) {
  const t = useTranslations("CaseStudyDetail");
  const lang = useLocale() as "en" | "ar";
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Section surface="ink-900" id="metrics">
      <Container>
        <p className="font-display text-eyebrow uppercase text-brand-400">08</p>
        <h2 className="mt-3 font-display text-h2 font-semibold text-mist-50">{t("metricsTitle")}</h2>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
        >
          {metrics.map((m, i) => (
            <div key={i} className="border-t border-mist-50/15 pt-5">
              <span
                dir="ltr"
                className="block font-display text-stat font-bold text-brand-400 tabular-nums"
              >
                <MetricValue value={m.value} play={play} />
              </span>
              <span className="mt-3 block text-eyebrow uppercase text-mist-50/60">
                {m.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MetricValue({ value, play }: { value: string; play: boolean }) {
  const parsed = useMemo(() => parse(value), [value]);
  const [display, setDisplay] = useState(() => (parsed ? `${parsed.prefix}0${parsed.suffix}` : value));

  useEffect(() => {
    if (!parsed || !play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const fmt = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: parsed.decimals,
      maximumFractionDigits: parsed.decimals,
    });
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = parsed.num * eased;
      setDisplay(`${parsed.prefix}${fmt.format(current)}${parsed.suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value, parsed]);

  if (!parsed) return <>{value}</>;
  return <>{display}</>;
}
