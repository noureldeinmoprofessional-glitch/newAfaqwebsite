import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { DrawOnScroll } from "@/components/motion/DrawOnScroll";

const CERTS = ["sbc", "iso", "avixa", "aisc", "esri", "aws", "ntcip"] as const;

/**
 * About §5 — Engineering Excellence. Dark-green editorial section presenting the
 * codes, standards, and platforms AFAQ engineers to, inside technical cards with
 * drawn blueprint borders, a small hover glow, and revealed specification detail.
 */
export function EngineeringExcellence() {
  const t = useTranslations("AboutPage.excellence");

  return (
    <Section surface="ink-800" id="excellence" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={5} className="text-gold" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
          <p className="mt-6 max-w-xl text-body text-mist-50/55">{t("note")}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {CERTS.map((key) => (
            <DrawOnScroll key={key} duration={1.2}>
              <article className="group relative h-full overflow-hidden rounded-card bg-ink-700/30 p-6 transition-[box-shadow,border-color] duration-500 hover:shadow-[0_0_36px_-10px_var(--color-gold)]">
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full text-line-inv transition-colors duration-500 group-hover:text-gold/70"
                  fill="none"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <rect
                    className="draw-path"
                    pathLength={1}
                    x="0.5"
                    y="0.5"
                    width="99"
                    height="99"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <div className="relative flex min-h-[130px] flex-col">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-h3 font-semibold text-mist-50">
                    {t(`items.${key}.name`)}
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-body text-mist-50/60 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {t(`items.${key}.detail`)}
                  </p>
                </div>
              </article>
            </DrawOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
