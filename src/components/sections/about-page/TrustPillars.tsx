import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { CountUpStat } from "@/components/motion/CountUpStat";

const PILLARS = ["years", "projects", "government", "private", "retention", "coverage"] as const;

/**
 * About §7 — Why Clients Trust AFAQ. Editorial grid of six statistics that count
 * into view, separated by thin gold dividers, over a blueprint grid.
 */
export function TrustPillars() {
  const t = useTranslations("AboutPage.trust");

  return (
    <Section surface="white" id="trust" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={4} className="text-slate-900" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-slate-900">
            {t("title")}
          </Heading>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border-t border-gold/40 bg-gold/20 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {PILLARS.map((key) => (
            <div key={key} className="bg-white p-8 lg:p-10">
              <CountUpStat
                value={Number(t.raw(`items.${key}.value`))}
                suffix={t(`items.${key}.suffix`)}
                label={t(`items.${key}.label`)}
                sublabel={t(`items.${key}.note`)}
                tone="brand"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
