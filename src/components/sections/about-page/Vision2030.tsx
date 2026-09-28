import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { DrawOnScroll } from "@/components/motion/DrawOnScroll";

const LANDMARKS = ["neom", "diriyah", "qiddiya", "kafd", "metro", "swcc"] as const;

/**
 * About §9 — Vision 2030. Dark cinematic section over a Riyadh skyline placeholder
 * with digital overlays. A drawn green line connects glowing landmark-program
 * nodes representing the sectors AFAQ serves.
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

        {/* Landmark constellation */}
        <DrawOnScroll className="relative mt-16 lg:mt-24" duration={2} stagger={0}>
          {/* Connecting line (horizontal on desktop) */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-3 hidden h-2 w-full text-brand-400 lg:block"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <path className="draw-path" pathLength={1} d="M1 1 H99" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          </svg>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {LANDMARKS.map((key) => (
              <li key={key} className="flex flex-col items-center text-center lg:items-start lg:text-start">
                <span className="relative mb-4 flex size-6 items-center justify-center">
                  <span className="absolute inline-flex size-6 animate-ping rounded-full bg-brand-500/30" aria-hidden="true" />
                  <span className="relative inline-flex size-3 rounded-full bg-brand-500 shadow-[0_0_16px_2px_var(--color-brand-500)]" aria-hidden="true" />
                </span>
                <span className="font-display text-h3 font-semibold text-mist-50">
                  {t(`landmarks.${key}`)}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-md text-body text-mist-50/40">{t("note")}</p>
        </DrawOnScroll>
      </Container>
    </Section>
  );
}
