import { useTranslations } from "next-intl";
import { Radar, Building2, Route, MonitorPlay, ArrowRight } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";

const SERVICES = [
  { key: "survey", Icon: Radar, tone: "deep", texture: "survey" },
  { key: "civil", Icon: Building2, tone: "steel", texture: "terrain" },
  { key: "its", Icon: Route, tone: "mid", texture: "grid" },
  { key: "av", Icon: MonitorPlay, tone: "steel", texture: "survey" },
] as const;

/**
 * Section 5 — Services (brief §5). Four large horizontal panels. Each has a
 * dominant image that zooms on hover, a blueprint overlay, a large icon, minimal
 * copy, and an "Explore" CTA that appears on hover (CSS group-hover).
 */
export function Services() {
  const t = useTranslations("Services");

  return (
    <Section surface="white" id="services">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-slate-900">
            {t("title")}
          </Heading>
        </Reveal>
      </Container>

      <div className="mt-14 flex flex-col border-t border-line lg:mt-20">
        {SERVICES.map(({ key, Icon, tone, texture }, i) => (
          <Reveal key={key} as="article" once className="group relative border-b border-line">
            <a href="#projects" className="block">
              <Container className="grid items-center gap-8 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
                {/* Copy */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-5">
                    <span className="font-display text-h2 font-semibold tabular-nums text-line">
                      0{i + 1}
                    </span>
                    <span className="inline-flex size-14 items-center justify-center rounded-button bg-brand-500/10 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="size-6" strokeWidth={2} />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-h1 font-semibold leading-[1.02] text-slate-900 transition-colors group-hover:text-brand-600">
                    {t(`items.${key}.name`)}
                  </h3>
                  <p className="mt-5 max-w-md text-body-lg text-slate-600">
                    {t(`items.${key}.summary`)}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 font-display font-medium text-brand-600 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {t("explore")}
                    <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2} />
                  </span>
                </div>

                {/* Media */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative overflow-hidden rounded-image">
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                      <MediaFrame ratio="16/9" tone={tone} texture={texture} label={t(`items.${key}.imageLabel`)} rounded={false} />
                    </div>
                    {/* Blueprint overlay revealed on hover */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <TechBackground variant="grid" opacity={22} className="text-tech-500" />
                      <div className="absolute inset-4 border border-brand-400/40" />
                    </div>
                  </div>
                </div>
              </Container>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
