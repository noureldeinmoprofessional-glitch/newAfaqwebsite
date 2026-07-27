import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { ARTICLES } from "@/data/articles";
import { InnerCta } from "@/components/sections/shared/InnerCta";
import { ArticleView, RelatedArticles } from "@/components/sections/blog-page";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ARTICLES.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  const lang = locale === "ar" ? "ar" : "en";
  return { title: `${article.title[lang]} — AFAQ Systems`, description: article.excerpt[lang] };
}

function BlogCta() {
  const t = useTranslations("BlogPage.cta");
  return (
    <InnerCta
      id="blog-cta"
      eyebrow={t("eyebrow")}
      title={t("title")}
      body={t("body")}
      primary={{ label: t("ctaPrimary"), href: "/contact" }}
      secondary={{ label: t("ctaSecondary"), href: "/services" }}
    />
  );
}

export default async function ArticleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <main id="main">
      <ArticleView article={article} />
      <RelatedArticles slug={slug} />
      <BlogCta />
    </main>
  );
}
