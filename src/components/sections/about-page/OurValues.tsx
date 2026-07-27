import { useTranslations } from "next-intl";
import { Compass, Layers, Target } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { DrawOnScroll } from "@/components/motion/DrawOnScroll";

const CARDS = [
  { key: "independence", Icon: Compass },
  { key: "integration", Icon: Layers },
  { key: "vision", Icon: Target },
] as const;

/**
 * About §3 — Our Values (company profile p.2). Three oversized value cards with
 * a big icon, minimal copy, a blueprint hover, and a border that draws itself in.
 */
export function OurValues() {
  const t = useTranslations("AboutPage.values");

  return (
    <Section surface="white" id="values">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h1" className="mt-6 text-slate-900">
            {t("title")}
          </Heading>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {CARDS.map(({ key, Icon }) => (
            <DrawOnScroll key={key} duration={1.4}>
              <article className="group relative overflow-hidden rounded-card bg-white p-8 lg:p-10">
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full text-line"
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
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <TechBackground variant="grid" opacity={5} className="text-brand-500" />
                </div>

                <div className="relative flex min-h-[280px] flex-col">
                  <span className="inline-flex size-16 items-center justify-center rounded-button bg-brand-500/10 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-8" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-8 font-display text-h2 font-semibold leading-[1.05] text-slate-900">
                    {t(`cards.${key}.title`)}
                  </h3>
                  <p className="mt-4 text-body-lg text-slate-600">{t(`cards.${key}.body`)}</p>
                </div>
              </article>
            </DrawOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
