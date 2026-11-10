import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";

const LANDMARKS = ["neom", "diriyah", "qiddiya", "kafd", "metro", "swcc", "kingsaadfc"] as const;

/**
 * About §9 — Vision 2030. Dark cinematic section over a Riyadh skyline placeholder
 * with digital overlays. A vertical timeline connects glowing landmark-program
 * nodes (sector + name) representing the programs AFAQ serves, with generous
 * spacing so each node reads clearly.
 */
export function Vision2030() {
  const t = useTranslations("AboutPage.vision2030");

  return (
    <Section surface="ink-900" id="vision-2030" className="relative overflow-hidden">
      {/* Cinematic backdrop (Riyadh skyline photography drops in here) */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink-900 to-ink-900" />
        <TechBackground variant="terrain" opacity={8} className="text-brand-400 top-1/4" />
        <TechBackground variant="grid" opacity={6} className="text-tech-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/40" />
      </div>

      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
          <p className="mt-6 max-w-xl text-body-lg text-mist-50/65">{t("body")}</p>
        </Reveal>

        {/* Vertical landmark timeline */}
        <div className="relative mt-16 lg:mt-20">
          {/* Timeline rail */}
          <span
            className="absolute inset-y-2 start-[13px] w-px bg-gradient-to-b from-brand-500 via-brand-500/40 to-transparent lg:start-[15px]"
            aria-hidden="true"
          />

          <Reveal as="ol" className="flex flex-col gap-y-12 lg:gap-y-16" stagger={0.1}>
            {LANDMARKS.map((key) => (
              <li key={key} className="relative flex items-start gap-6 lg:gap-8">
                {/* Node */}
                <span className="relative mt-0.5 flex size-7 shrink-0 items-center justify-center lg:size-8">
                  <span className="absolute inline-flex size-7 animate-ping rounded-full bg-brand-500/25 lg:size-8" aria-hidden="true" />
                  <span className="relative inline-flex size-3.5 rounded-full bg-brand-500 shadow-[0_0_16px_2px_var(--color-brand-500)]" aria-hidden="true" />
                </span>

                <div className="pt-0.5">
                  <span className="font-display text-eyebrow uppercase text-brand-400">
                    {t(`landmarks.${key}.sector`)}
                  </span>
                  <h3 className="mt-1 font-display text-h2 font-semibold text-mist-50">
                    {t(`landmarks.${key}.name`)}
                  </h3>
                </div>
              </li>
            ))}
          </Reveal>

          <p className="mt-14 max-w-md text-body text-mist-50/40">{t("note")}</p>
        </div>
      </Container>
    </Section>
  );
}
