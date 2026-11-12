"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
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
 * Key results — the project's metrics as a stacked list that sits beside the
 * executive overview. Numeric values count up once on scroll into view
 * (reduced-motion safe); non-numeric values (e.g. "Sub-cm", "Zero") show as-is.
 */
export function CaseStudyMetrics({ metrics, title }: { metrics: Metric[]; title: string }) {
  const lang = useLocale() as "en" | "ar";
  const ref = useRef<HTMLDListElement>(null);
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
    <div className="rounded-card bg-ink-900 p-7 lg:p-8">
      <p className="font-display text-eyebrow uppercase text-brand-400">{title}</p>
      <dl ref={ref} className="mt-4 divide-y divide-mist-50/15">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-baseline justify-between gap-6 py-5 last:pb-0">
            <dt className="text-small font-semibold uppercase tracking-[0.06em] text-mist-50/85">
              {m.label[lang]}
            </dt>
            <dd
              dir="ltr"
              className="shrink-0 font-display text-stat-sm font-bold text-brand-400 tabular-nums"
            >
              <MetricValue value={m.value} play={play} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
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
