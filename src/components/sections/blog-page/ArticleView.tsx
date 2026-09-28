import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, Clock } from "lucide-react";
import { Container, Section } from "@/components/primitives";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Article } from "@/data/articles";
import { BLOG_CATEGORY_META } from "./blogCategoryMeta";
import { ArticleCover } from "./ArticleCover";

/**
 * Single-article layout: a dark editorial header (id="hero" so the header stays
 * transparent over it), a dominant cover, and a readable prose column with a
 * pull quote. Related articles + CTA live on the page.
 */
export function ArticleView({ article }: { article: Article }) {
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const t = useTranslations("BlogPage.article");
  const tc = useTranslations("BlogPage.categories");
  const author = useTranslations("BlogPage")("author");
  const { Icon, dot } = BLOG_CATEGORY_META[article.category];
  const date = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(article.date),
  );

  return (
    <>
      {/* Header */}
      <section id="hero" className="relative overflow-hidden bg-ink-900 pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ink-800 to-ink-900" />
        </div>
        <Container className="relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-display text-eyebrow uppercase text-mist-50/60 transition-colors hover:text-brand-400"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={2} />
            {t("back")}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-eyebrow uppercase text-mist-50/60">
            <span className="inline-flex items-center gap-1.5 text-brand-400">
              <span className={cn("size-1.5 rounded-full", dot)} aria-hidden="true" />
              {tc(article.category)}
            </span>
            <span aria-hidden="true">·</span>
            <span dir="ltr">{date}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" strokeWidth={2} />
              {t("readingTime", { min: article.readingMinutes })}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-h1 font-semibold leading-[1.03] tracking-[-0.02em] text-mist-50">
            {article.title[lang]}
          </h1>

          <div className="mt-8 flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/5 text-brand-400">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <span className="text-body text-mist-50/70">
              {t("by")} <span className="text-mist-50">{author}</span>
            </span>
          </div>
        </Container>
      </section>

      {/* Body */}
      <Section surface="white" flush className="pb-section">
        <Container>
          <div className="-mt-10 lg:-mt-14">
            <ArticleCover article={article} ratio="21/9" />
          </div>

          <div className="mx-auto mt-14 max-w-[44rem] lg:mt-20">
            {article.sections.map((s, i) => (
              <div key={i}>
                <h2 className="mt-12 font-display text-h3 font-semibold text-slate-900 first:mt-0">
                  {s.heading[lang]}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-4 text-body-lg leading-relaxed text-slate-700">
                    {p[lang]}
                  </p>
                ))}

                {i === 0 && (
                  <blockquote className="my-12 border-s-2 border-brand-500 ps-6">
                    <p className="font-display text-h3 font-medium leading-snug text-slate-900">
                      “{article.quote[lang]}”
                    </p>
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
