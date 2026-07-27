import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { InnerHero } from "@/components/sections/shared/InnerHero";
import { InnerCta } from "@/components/sections/shared/InnerCta";
import { CaseStudyGrid } from "@/components/sections/case-studies-page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseStudiesPage.meta" });
  return { title: t("title"), description: t("description") };
}

function CaseStudiesHero() {
  const t = useTranslations("CaseStudiesPage.hero");
  return (
    <InnerHero
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      scrollLabel={t("scroll")}
    />
  );
}

function CaseStudiesCta() {
  const t = useTranslations("CaseStudiesPage.cta");
  return (
    <InnerCta
      id="case-studies-cta"
      eyebrow={t("eyebrow")}
      title={t("title")}
      body={t("body")}
      primary={{ label: t("ctaPrimary"), href: "/projects" }}
      secondary={{ label: t("ctaSecondary"), href: "/contact" }}
    />
  );
}

export default async function CaseStudiesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <CaseStudiesHero />
      <CaseStudyGrid />
      <CaseStudiesCta />
    </main>
  );
}
