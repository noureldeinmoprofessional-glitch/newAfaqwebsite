import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Landmark, TramFront, Ticket, Network, ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";

const INDUSTRIES = [
  { key: "defense", Icon: ShieldCheck, texture: "grid" },
  { key: "energy", Icon: Zap, texture: "terrain" },
  { key: "government", Icon: Landmark, texture: "survey" },
  { key: "transport", Icon: TramFront, texture: "grid" },
  { key: "entertainment", Icon: Ticket, texture: "topo" },
  { key: "smartcities", Icon: Network, texture: "survey" },
] as const;

/**
 * Section 6 — Industries (brief §6). Grid of large cards with technical
 * linework, an animated border on hover, and micro-interactions. Categories
 * reflect the sectors AFAQ serves.
 */
export function Industries() {
  const t = useTranslations("Industries");

  return (
    <Section surface="ink-800" id="industries" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={4} className="text-brand-400" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
        </Reveal>

        <Reveal className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3" stagger={0.08}>
          {INDUSTRIES.map(({ key, Icon, texture }) => (
            <article
              key={key}
              className="group relative overflow-hidden rounded-card border border-line-inv bg-ink-700/40 p-8 transition-colors duration-500 hover:border-brand-500/60"
            >
              {/* Linework backdrop */}
              <TechBackground
                variant={texture}
                opacity={6}
                className="text-brand-400 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
              />
              {/* Animated corner accents */}
              <span className="pointer-events-none absolute end-0 top-0 h-10 w-10 border-e-2 border-t-2 border-brand-500/0 transition-colors duration-500 group-hover:border-brand-500/70" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-0 start-0 h-10 w-10 border-b-2 border-s-2 border-brand-500/0 transition-colors duration-500 group-hover:border-brand-500/70" aria-hidden="true" />

              <div className="relative flex min-h-[200px] flex-col">
                <span className="inline-flex size-12 items-center justify-center rounded-button bg-white/5 text-brand-400 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-ink-900">
                  <Icon className="size-6" strokeWidth={2} />
                </span>
                <h3 className="mt-6 font-display text-h3 font-semibold text-mist-50">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-3 flex-1 text-body text-mist-50/60">
                  {t(`items.${key}.body`)}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.14em] text-brand-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {t(`items.${key}.name`)}
                  <ArrowUpRight className="size-4" strokeWidth={2} />
                </span>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
