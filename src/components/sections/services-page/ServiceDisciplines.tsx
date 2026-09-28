import { useTranslations } from "next-intl";
import { Radar, Building2, Route, MonitorPlay, Check, ArrowRight } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const DISCIPLINES = [
  { key: "survey", Icon: Radar, image: "survey" },
  { key: "civil", Icon: Building2, image: "steel-fabrication" },
  { key: "its", Icon: Route, image: "its" },
  { key: "av", Icon: MonitorPlay, image: "av-led" },
] as const;

const CAP_KEYS = ["c1", "c2", "c3", "c4", "c5"] as const;
const DEL_KEYS = ["d1", "d2", "d3"] as const;

/**
 * Services — the four disciplines, each an alternating editorial block with an
 * overview, capability list, deliverable chips, and dominant media.
 */
export function ServiceDisciplines() {
  const t = useTranslations("ServicesPage.disciplines");
  const tc = useTranslations("Common");

  return (
    <Section surface="white" id="services" className="relative">
      <Container>
        <div className="flex flex-col gap-20 lg:gap-32">
          {DISCIPLINES.map(({ key, Icon, image }, i) => {
            const flipped = i % 2 === 1;
            return (
              <article
                key={key}
                id={`service-${key}`}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                {/* Media */}
                <div className={cn("lg:col-span-6", flipped && "lg:order-2")}>
                  <Reveal>
                    <MediaFrame ratio="4/3" image={image} label={t(`${key}.imageLabel`)} />
                  </Reveal>
                </div>

                {/* Copy */}
                <div className={cn("lg:col-span-6", flipped && "lg:order-1")}>
                  <Reveal stagger={0.08}>
                    <span className="inline-flex size-14 items-center justify-center rounded-button bg-brand-500/10 text-brand-600">
                      <Icon className="size-6" strokeWidth={2} />
                    </span>
                    <p className="mt-6 font-display text-eyebrow uppercase text-brand-600">
                      {t(`${key}.tagline`)}
                    </p>
                    <Heading as="h2" size="h2" className="mt-3 text-slate-900">
                      {t(`${key}.name`)}
                    </Heading>
                    <p className="mt-5 max-w-xl text-body-lg text-slate-600">{t(`${key}.overview`)}</p>

                    <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                      {CAP_KEYS.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-body text-slate-700">
                          <Check className="mt-1 size-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                          {t(`${key}.capabilities.${c}`)}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                      {DEL_KEYS.map((d) => (
                        <span
                          key={d}
                          className="inline-flex items-center rounded-full border border-line px-3 py-1.5 text-small text-slate-600"
                        >
                          {t(`${key}.deliverables.${d}`)}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/services/${key}`}
                      className="group/link mt-8 inline-flex items-center gap-2 font-display font-medium text-brand-600 transition-colors hover:text-brand-500"
                    >
                      {tc("learnMore")}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1"
                        strokeWidth={2}
                      />
                    </Link>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
