import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { DrawOnScroll } from "@/components/motion/DrawOnScroll";

const STEPS = ["discovery", "design", "build", "commission"] as const;

/**
 * Services — methodology. Four steps connected by a green line that draws itself,
 * reinforcing one continuous chain of accountability.
 */
export function ServicesProcess() {
  const t = useTranslations("ServicesPage.process");

  return (
    <Section surface="ink-800" id="process" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={4} className="text-brand-400" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
          <p className="mt-6 max-w-xl text-body-lg text-mist-50/60">{t("lead")}</p>
        </Reveal>

        <DrawOnScroll className="relative mt-16 lg:mt-20" duration={1.8} stagger={0}>
          {/* Connector line (horizontal on desktop) */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-5 hidden h-2 w-full text-brand-400/50 lg:block"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <path className="draw-path" pathLength={1} d="M1 1 H99" stroke="currentColor" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
          </svg>

          <Reveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {STEPS.map((key, i) => (
              <div key={key} className="relative">
                <div className="flex items-center gap-4">
                  <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-brand-500 bg-ink-800 font-display text-small tabular-nums text-brand-400">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-h3 font-semibold text-mist-50">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-3 text-body text-mist-50/60">{t(`steps.${key}.body`)}</p>
              </div>
            ))}
          </Reveal>
        </DrawOnScroll>
      </Container>
    </Section>
  );
}
