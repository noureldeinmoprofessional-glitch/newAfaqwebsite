import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Container, Button } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/data/services";
import { serviceIcon } from "./serviceIcons";

/**
 * 01 — Service hero. Bright, spacious, two-column: title / tagline / intro / CTAs
 * on one side, a dominant engineering image on the other. White theme, so the
 * shared header stays solid over it (no id="hero").
 */
export function ServiceHero({ service }: { service: Service }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail");
  const Icon = serviceIcon(service.icon);

  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Container>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 font-display text-eyebrow uppercase text-slate-500 transition-colors hover:text-brand-600"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={2} />
          {t("back")}
        </Link>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal stagger={0.08}>
            <span className="inline-flex size-14 items-center justify-center rounded-button bg-brand-500/10 text-brand-600">
              <Icon className="size-7" strokeWidth={1.75} />
            </span>
            <p className="mt-6 font-display text-eyebrow uppercase text-brand-600">
              {service.tagline[lang]}
            </p>
            <h1 className="mt-3 font-display text-display font-semibold text-slate-900">
              {service.name[lang]}
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-slate-600">{service.intro[lang]}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">
                {t("requestConsultation")}
              </Button>
              <Button variant="outline-dark" size="lg" href="/projects">
                {t("viewProjects")}
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative overflow-hidden rounded-card shadow-xl shadow-ink-900/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.hero}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-ink-900/5" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
