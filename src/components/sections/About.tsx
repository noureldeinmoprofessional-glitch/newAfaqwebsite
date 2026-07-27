import { useTranslations } from "next-intl";
import { Compass, Layers, Target } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import { DrawOnScroll } from "@/components/motion/DrawOnScroll";

const VALUES = [
  { key: "independence", Icon: Compass },
  { key: "integration", Icon: Layers },
  { key: "vision", Icon: Target },
] as const;

/**
 * Section 3 — About AFAQ (brief §3). Split layout: large engineering photograph
 * against headline + lead, then three value cards that reveal independently over
 * a blueprint that draws itself.
 */
export function About() {
  const t = useTranslations("About");

  return (
    <Section surface="mist-50" id="about" className="relative overflow-hidden">
      {/* Self-drawing blueprint */}
      <DrawOnScroll className="pointer-events-none absolute inset-0" duration={2}>
        <svg
          className="h-full w-full text-brand-500/[0.08]"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path className="draw-path" pathLength={1} d="M0 220 H1440" stroke="currentColor" strokeWidth="1.5" />
          <path className="draw-path" pathLength={1} d="M980 0 V900" stroke="currentColor" strokeWidth="1.5" />
          <path className="draw-path" pathLength={1} d="M980 460 H1440" stroke="currentColor" strokeWidth="1.5" />
          <circle className="draw-path" pathLength={1} cx="980" cy="220" r="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </DrawOnScroll>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Media */}
          <div className="lg:col-span-5">
            <Reveal>
              <MediaFrame
                ratio="4/5"
                image="engineers-site"
                label={t("imageLabel")}
                className="lg:sticky lg:top-28"
              />
            </Reveal>
          </div>

          {/* Copy + values */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
              <Heading as="h2" size="h2" className="mt-6 max-w-2xl text-slate-900">
                {t("title")}
              </Heading>
              <p className="mt-6 max-w-xl text-body-lg text-slate-600">{t("lead")}</p>
            </Reveal>

            <Reveal className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-1" stagger={0.12}>
              {VALUES.map(({ key, Icon }) => (
                <div key={key} className="group bg-white p-8 transition-colors hover:bg-mist-50">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-button bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="font-display text-h3 font-semibold text-slate-900">
                        {t(`values.${key}.title`)}
                      </h3>
                      <p className="mt-2 max-w-md text-body text-slate-600">
                        {t(`values.${key}.body`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
