import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { InnerHero } from "@/components/sections/shared/InnerHero";
import { InnerCta } from "@/components/sections/shared/InnerCta";
import { BlogList } from "@/components/sections/blog-page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage.meta" });
  return { title: t("title"), description: t("description") };
}

function BlogHero() {
  const t = useTranslations("BlogPage.hero");
  return (
    <InnerHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} scrollLabel={t("scroll")} compact />
  );
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

export default async function BlogRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <BlogHero />
      <BlogList />
      <BlogCta />
    </main>
  );
}
