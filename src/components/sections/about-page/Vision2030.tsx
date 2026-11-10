import { useTranslations } from "next-intl";
import { Network, Landmark, Ticket, Building2, TramFront, Droplets, Trophy, Sparkles } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";

/** Landmark programs + a sector icon each. */
const LANDMARKS = [
  { key: "neom", Icon: Network },
  { key: "diriyah", Icon: Landmark },
  { key: "qiddiya", Icon: Ticket },
  { key: "kafd", Icon: Building2 },
  { key: "metro", Icon: TramFront },
  { key: "swcc", Icon: Droplets },
  { key: "kingsaadfc", Icon: Trophy },
] as const;

/**
 * About §9 — Vision 2030. Dark cinematic section over a Riyadh skyline placeholder.
 * A full-width grid of landmark-program tiles (sector + name + icon), with a note
 * tile completing the grid so the layout stays balanced with no empty space.
 */
export function Vision2030() {
  const t = useTranslations("AboutPage.vision2030");

  return (
    <Section surface="ink-900" id="vision-2030" className="relative overflow-hidden">
      {/* Cinematic backdrop (Riyadh skyline photography drops in here) */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink-900 to-ink-900" />
        <TechBackground variant="terrain" opacity={8} className="text-brand-400 top-1/4" />
        <TechBackground variant="grid" opacity={6} className="text-tech-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/40" />
      </div>

      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
          <p className="mt-6 max-w-xl text-body-lg text-mist-50/65">{t("body")}</p>
        </Reveal>

        {/* Landmark programs — full-width balanced grid (7 tiles + 1 note = 2×4) */}
        <Reveal className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4" stagger={0.07}>
          {LANDMARKS.map(({ key, Icon }) => (
            <article
              key={key}
              className="group relative flex min-h-[176px] flex-col justify-between overflow-hidden rounded-card border border-line-inv bg-white/[0.04] p-5 transition-colors duration-300 hover:border-brand-500/50 hover:bg-white/[0.06]"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-button bg-brand-500/15 text-brand-400 shadow-[0_0_22px_-6px_var(--color-brand-500)] transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-ink-900">
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <div>
                <span className="font-display text-eyebrow uppercase text-brand-400">
                  {t(`landmarks.${key}.sector`)}
                </span>
                <h3 className="mt-1 font-display text-h3 font-semibold text-mist-50">
                  {t(`landmarks.${key}.name`)}
                </h3>
              </div>
            </article>
          ))}

          {/* Note tile completes the grid */}
          <div className="flex min-h-[176px] flex-col justify-center rounded-card border border-brand-500/30 bg-brand-500/[0.08] p-5">
            <Sparkles className="size-5 text-brand-400" strokeWidth={2} aria-hidden="true" />
            <p className="mt-3 text-small leading-relaxed text-mist-50/75">{t("note")}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
