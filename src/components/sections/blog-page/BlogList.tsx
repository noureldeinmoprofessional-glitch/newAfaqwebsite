"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Clock } from "lucide-react";
import { Container, Section } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ARTICLES, ARTICLE_CATEGORY_KEYS, type Article, type ArticleCategory } from "@/data/articles";
import { BLOG_CATEGORY_META } from "./blogCategoryMeta";
import { ArticleCover } from "./ArticleCover";

const SORTED = [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));

/** Localized short date. */
function fmtDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(
    new Date(iso),
  );
}

/**
 * Insights index — category filter pills, a featured (latest) article, and a
 * grid of the rest. Filtering is instant and client-side.
 */
export function BlogList() {
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const t = useTranslations("BlogPage.list");
  const tc = useTranslations("BlogPage.categories");
  const [category, setCategory] = useState<ArticleCategory | "all">("all");

  const filtered = useMemo(
    () => (category === "all" ? SORTED : SORTED.filter((a) => a.category === category)),
    [category],
  );

  const showFeatured = category === "all";
  const featured = showFeatured ? filtered[0] : undefined;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  return (
    <Section surface="white" id="insights" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={3} className="text-slate-900" />
      <Container className="relative">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <Pill active={category === "all"} onClick={() => setCategory("all")}>
            {t("allCategories")}
          </Pill>
          {ARTICLE_CATEGORY_KEYS.map((k) => (
            <Pill key={k} active={category === k} onClick={() => setCategory(k)}>
              <span className={cn("size-1.5 rounded-full", BLOG_CATEGORY_META[k].dot)} aria-hidden="true" />
              {tc(k)}
            </Pill>
          ))}
        </div>

        {/* Featured */}
        {featured && (
          <Reveal className="mt-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid items-center gap-8 rounded-card border border-line p-3 transition-colors hover:border-brand-500/40 lg:grid-cols-2 lg:gap-12 lg:p-4"
            >
              <ArticleCover article={featured} ratio="16/10" />
              <div className="px-3 pb-4 lg:px-6">
                <Meta article={featured} locale={locale} t={t} tc={tc} featuredLabel={t("featured")} />
                <h2 className="mt-4 font-display text-h1 font-semibold leading-[1.05] text-slate-900 transition-colors group-hover:text-brand-600">
                  {featured.title[lang]}
                </h2>
                <p className="mt-4 max-w-xl text-body-lg text-slate-600">{featured.excerpt[lang]}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display font-medium text-brand-600">
                  {t("readMore")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Grid */}
        {rest.length > 0 ? (
          <Reveal className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3" stagger={0.06}>
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} locale={locale} lang={lang} t={t} tc={tc} />
            ))}
          </Reveal>
        ) : (
          !featured && <p className="mt-16 text-body-lg text-slate-500">{t("empty")}</p>
        )}
      </Container>
    </Section>
  );
}

function ArticleCard({
  article,
  locale,
  lang,
  t,
  tc,
}: {
  article: Article;
  locale: string;
  lang: "en" | "ar";
  t: (k: string, v?: Record<string, string | number | Date>) => string;
  tc: (k: string) => string;
}) {
  return (
    <article className="group">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="overflow-hidden rounded-image">
          <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <ArticleCover article={article} ratio="16/10" className="rounded-none" />
          </div>
        </div>
        <Meta article={article} locale={locale} t={t} tc={tc} className="mt-5" />
        <h3 className="mt-3 font-display text-h3 font-semibold leading-tight text-slate-900 transition-colors group-hover:text-brand-600">
          {article.title[lang]}
        </h3>
        <p className="mt-2 line-clamp-2 text-body text-slate-600">{article.excerpt[lang]}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-body font-medium text-brand-600 opacity-0 transition-all duration-500 group-hover:opacity-100">
          {t("readMore")}
          <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2} />
        </span>
      </Link>
    </article>
  );
}

function Meta({
  article,
  locale,
  t,
  tc,
  className,
  featuredLabel,
}: {
  article: Article;
  locale: string;
  t: (k: string, v?: Record<string, string | number | Date>) => string;
  tc: (k: string) => string;
  className?: string;
  featuredLabel?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-eyebrow uppercase tracking-[0.12em] text-slate-500", className)}>
      {featuredLabel && <span className="text-brand-600">{featuredLabel}</span>}
      <span className="inline-flex items-center gap-1.5 text-brand-600">
        <span className={cn("size-1.5 rounded-full", BLOG_CATEGORY_META[article.category].dot)} aria-hidden="true" />
        {tc(article.category)}
      </span>
      <span aria-hidden="true">·</span>
      <span dir="ltr">{fmtDate(article.date, locale)}</span>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3" strokeWidth={2} />
        {t("readingTime", { min: article.readingMinutes })}
      </span>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-colors",
        active
          ? "border-brand-500 bg-brand-500/10 text-brand-600"
          : "border-line text-slate-600 hover:border-slate-300",
      )}
    >
      {children}
    </button>
  );
}
