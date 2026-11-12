import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";

const LANDMARKS = ["neom", "diriyah", "qiddiya", "kafd", "metro", "swcc", "kingsaadfc"] as const;

/**
 * About §9 — Vision 2030. An editorial split: a photograph of the Riyadh skyline
 * beside the headline and a typographic index of the landmark programmes AFAQ
 * serves (name + sector, separated by hairlines) — restrained, photo-led, with
 * no decorative glows or iconography.
 */
export function Vision2030() {
  const t = useTranslations("AboutPage.vision2030");

  return (
    <Section surface="ink-900" id="vision-2030" className="relative overflow-hidden">
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Skyline photograph */}
          <div className="lg:col-span-5">
            <Reveal>
              <MediaFrame ratio="4/5" src="/images/about/vision-riyadh.jpg" alt="" />
            </Reveal>
          </div>

          {/* Headline + programme index */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
              <Heading as="h2" size="h2" className="mt-6 text-mist-50">
                {t("title")}
              </Heading>
              <p className="mt-6 max-w-xl text-body-lg text-mist-50/90">{t("body")}</p>
            </Reveal>

            <Reveal as="ul" className="mt-10 border-b border-line-inv" stagger={0.05}>
              {LANDMARKS.map((key) => (
                <li
                  key={key}
                  className="flex items-baseline justify-between gap-6 border-t border-line-inv py-4"
                >
                  <span className="font-display text-h4 font-semibold text-mist-50">
                    {t(`landmarks.${key}.name`)}
                  </span>
                  <span className="shrink-0 text-end font-display text-small font-semibold uppercase tracking-[0.08em] text-brand-400">
                    {t(`landmarks.${key}.sector`)}
                  </span>
                </li>
              ))}
            </Reveal>

            <p className="mt-6 text-small text-mist-50/70">{t("note")}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
