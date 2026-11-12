import { useTranslations } from "next-intl";
import { Map, Boxes, Cpu, Plane, Sparkles } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";

const PILLARS = [
  { key: "gis", Icon: Map },
  { key: "twins", Icon: Boxes },
  { key: "smart", Icon: Cpu },
  { key: "drone", Icon: Plane },
  { key: "ai", Icon: Sparkles },
] as const;

/**
 * About §6 — Leadership Through Innovation. Five innovation pillars as aligned
 * cards: a photo for each pillar, then icon, title and description on a fixed
 * vertical rhythm (title area reserves two lines) so every card lines up and
 * all copy is visible without hovering.
 */
export function Innovation() {
  const t = useTranslations("AboutPage.innovation");

  return (
    <Section surface="ink-900" id="innovation" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={4} className="text-tech-500" />
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
        </div>

        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5" stagger={0.08}>
          {PILLARS.map(({ key, Icon }) => (
            <article
              key={key}
              className="group flex flex-col overflow-hidden rounded-card border border-line-inv bg-ink-800 transition-colors duration-300 hover:border-brand-500/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/about/innovation-${key}.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-button bg-brand-500/15 text-brand-400 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-ink-900">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 flex min-h-[2.7em] items-start font-display text-h4 font-semibold text-mist-50">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-2 text-small text-mist-50/90">{t(`items.${key}.body`)}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
