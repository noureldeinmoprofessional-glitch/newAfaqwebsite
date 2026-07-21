import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { MediaFrame } from "@/components/visual/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";

const POSTS = [
  { key: "digitaltwin", tone: "steel", texture: "grid" },
  { key: "vision2030", tone: "deep", texture: "terrain" },
  { key: "gnss", tone: "mid", texture: "survey" },
] as const;

/**
 * Section 11 — Blog (brief §11). Three large editorial cards, photography-first.
 * On hover the image zooms and the title slides upward.
 */
export function Blog() {
  const t = useTranslations("Blog");

  return (
    <Section surface="mist-50" id="blog">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
            <Heading as="h2" size="h2" className="mt-6 text-slate-900">
              {t("title")}
            </Heading>
          </Reveal>
        </div>

        <Reveal className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3" stagger={0.1}>
          {POSTS.map(({ key, tone, texture }) => (
            <article key={key} className="group">
              <a href="#blog" className="block">
                <div className="overflow-hidden rounded-image">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                    <MediaFrame ratio="4/3" tone={tone} texture={texture} label={t(`items.${key}.imageLabel`)} rounded={false} />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 font-display text-eyebrow uppercase tracking-[0.12em] text-slate-600">
                  <span className="text-brand-600">{t(`items.${key}.category`)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t(`items.${key}.date`)}</span>
                </div>

                <h3 className="mt-3 font-display text-h3 font-semibold leading-[1.15] text-slate-900 transition-colors group-hover:text-brand-600">
                  {t(`items.${key}.title`)}
                </h3>

                <span className="mt-4 inline-flex items-center gap-2 text-body font-medium text-brand-600 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {t("readMore")}
                  <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2} />
                </span>
              </a>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
