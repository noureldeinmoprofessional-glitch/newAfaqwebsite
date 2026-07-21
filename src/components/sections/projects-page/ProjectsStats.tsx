import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { CountUpStat } from "@/components/motion/CountUpStat";

const KEYS = ["projects", "years", "regions", "government", "private"] as const;

/**
 * Projects §2 — large horizontal statistics with animated counters and thin
 * blueprint dividers.
 */
export function ProjectsStats() {
  const t = useTranslations("ProjectsPage.stats");

  return (
    <Section surface="white" className="relative overflow-hidden" flush>
      <TechBackground variant="grid" opacity={4} className="text-slate-900" />
      <Container className="relative py-16 lg:py-20">
        <Reveal
          className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5"
          stagger={0.08}
        >
          {KEYS.map((key) => (
            <div key={key} className="border-s border-line ps-5 first:border-s-0 first:ps-0">
              <CountUpStat
                value={Number(t.raw(`items.${key}.value`))}
                suffix={t(`items.${key}.suffix`)}
                label={t(`items.${key}.label`)}
                tone="ink"
              />
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
