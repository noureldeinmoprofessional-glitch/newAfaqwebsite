import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const CASES = [
  { key: "survey", tone: "deep", texture: "survey" },
  { key: "integrated", tone: "steel", texture: "terrain" },
] as const;

/**
 * Section 8 — Featured Case Studies (brief §8). Magazine-style alternating
 * layout with Challenge / Solution / Results and highlighted metrics that
 * reveal progressively on scroll.
 */
export function CaseStudies() {
  const t = useTranslations("CaseStudies");

  return (
    <Section surface="white" id="case-studies">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-slate-900">
            {t("title")}
          </Heading>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-32">
          {CASES.map(({ key, tone, texture }, i) => {
            const flipped = i % 2 === 1;
            return (
              <article key={key} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Media */}
                <div className={cn("lg:col-span-6", flipped && "lg:order-2")}>
                  <Reveal>
                    <MediaFrame ratio="4/3" tone={tone} texture={texture} label={t(`items.${key}.imageLabel`)} />
                  </Reveal>
                </div>

                {/* Copy */}
                <div className={cn("lg:col-span-6", flipped && "lg:order-1")}>
                  <Reveal stagger={0.1}>
                    <p className="font-display text-eyebrow uppercase tracking-[0.14em] text-brand-600">
                      {t(`items.${key}.category`)}
                    </p>
                    <h3 className="mt-4 font-display text-h2 font-semibold leading-[1.08] text-slate-900">
                      {t(`items.${key}.name`)}
                    </h3>

                    <div className="mt-8 space-y-6">
                      <Field label={t("challengeLabel")} body={t(`items.${key}.challenge`)} />
                      <Field label={t("solutionLabel")} body={t(`items.${key}.solution`)} />
                    </div>

                    {/* Results metrics */}
                    <div className="mt-8 border-t border-line pt-8">
                      <p className="font-display text-eyebrow uppercase tracking-[0.14em] text-slate-600">
                        {t("resultsLabel")}
                      </p>
                      <div className="mt-5 grid grid-cols-2 gap-8">
                        <Metric value={t(`items.${key}.metricA`)} label={t(`items.${key}.metricALabel`)} />
                        <Metric value={t(`items.${key}.metricB`)} label={t(`items.${key}.metricBLabel`)} />
                      </div>
                    </div>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid gap-1 md:grid-cols-[7rem_1fr] md:gap-4">
      <p className="font-display text-eyebrow uppercase tracking-[0.14em] text-brand-600">{label}</p>
      <p className="text-body text-slate-600">{body}</p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span dir="ltr" className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.03em] text-brand-600 tabular-nums">
        {value}
      </span>
      <span className="text-eyebrow uppercase tracking-[0.12em] text-slate-600">{label}</span>
    </div>
  );
}
