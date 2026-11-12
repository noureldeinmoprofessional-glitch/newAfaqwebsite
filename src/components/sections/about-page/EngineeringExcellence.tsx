import { useLocale, useTranslations } from "next-intl";
import {
  Building2,
  BadgeCheck,
  Factory,
  Map,
  MonitorPlay,
  Cloud,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { MediaFrame } from "@/components/visual/MediaFrame";

/**
 * About §5 — Engineering Excellence. A bright credentials panel: an intro with a
 * credential highlight beside a grid of the codes, standards and platforms AFAQ
 * engineers to. Each standard shows its discipline, name and description
 * (always visible — no hover-hidden detail), with a discipline icon.
 */
const CERTS = [
  { key: "sbc", Icon: Building2, en: "Structural & Civil", ar: "إنشائي ومدني" },
  { key: "iso", Icon: BadgeCheck, en: "Quality Management", ar: "إدارة الجودة" },
  { key: "aisc", Icon: Factory, en: "Structural Steel", ar: "الحديد الإنشائي" },
  { key: "esri", Icon: Map, en: "Geospatial & GIS", ar: "جيومكاني ونظم معلومات" },
  { key: "avixa", Icon: MonitorPlay, en: "Audio-Visual", ar: "الصوت والصورة" },
  { key: "aws", Icon: Cloud, en: "Cloud & Digital", ar: "السحابة والرقمنة" },
  { key: "ntcip", Icon: Route, en: "Intelligent Transport", ar: "النقل الذكي" },
] as const;

export function EngineeringExcellence() {
  const t = useTranslations("AboutPage.excellence");
  const isAr = useLocale() === "ar";

  return (
    <Section surface="mist-50" id="excellence" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={3} className="text-brand-500" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro + credential highlight */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
              <Heading as="h2" size="h2" className="mt-6 text-slate-900">
                {t("title")}
              </Heading>
              <p className="mt-6 max-w-md text-body-lg text-slate-600">{t("note")}</p>

              <div className="mt-8 flex items-center gap-4 rounded-card border border-line bg-white p-5">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-button bg-brand-500/10 text-brand-600">
                  <ShieldCheck className="size-6" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-display text-h4 font-semibold text-slate-900">
                    {isAr ? "٧ معايير عالمية" : "7 global standards"}
                  </p>
                  <p className="text-small text-slate-600">
                    {isAr ? "عبر كل تخصص هندسي نقدّمه" : "Across every engineering discipline we deliver"}
                  </p>
                </div>
              </div>
              <MediaFrame ratio="4/3" src="/images/about/excellence-gnss.jpg" alt="" className="mt-8" />
            </Reveal>
          </div>

          {/* Standards grid — descriptions always visible */}
          <div className="lg:col-span-7">
            <Reveal className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {CERTS.map(({ key, Icon, en, ar }) => (
                <article
                  key={key}
                  className="group flex flex-col rounded-card border border-line bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-500/50 hover:shadow-md hover:shadow-ink-900/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-button bg-brand-500/10 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <span className="font-display text-eyebrow uppercase text-brand-600">
                      {isAr ? ar : en}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-h4 font-semibold text-slate-900">
                    {t(`items.${key}.name`)}
                  </h3>
                  <p className="mt-2 text-small text-slate-600">{t(`items.${key}.detail`)}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
