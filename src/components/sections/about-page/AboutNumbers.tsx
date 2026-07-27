import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { CountUpStat } from "@/components/motion/CountUpStat";

const KEYS = ["years", "projects", "government", "private", "regions", "retention"] as const;

/**
 * About §10 — Company in Numbers. Six clean counters over a thin engineering
 * grid; each activates once on scroll.
 */
export function AboutNumbers() {
  const t = useTranslations("AboutPage.numbers");

  return (
    <Section surface="mist-50" id="numbers" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={4} className="text-slate-900" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-slate-900">
            {t("title")}
          </Heading>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:mt-20 lg:grid-cols-6">
          {KEYS.map((key) => (
            <div key={key} className="border-t border-line pt-6">
              <CountUpStat
                value={Number(t.raw(`items.${key}.value`))}
                suffix={t(`items.${key}.suffix`)}
                label={t(`items.${key}.label`)}
                tone="brand"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
