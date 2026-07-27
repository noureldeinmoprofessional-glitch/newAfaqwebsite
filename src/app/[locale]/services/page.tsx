import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { IntegratedAdvantage } from "@/components/sections";
import { InnerHero } from "@/components/sections/shared/InnerHero";
import { InnerCta } from "@/components/sections/shared/InnerCta";
import { ServiceDisciplines, ServicesProcess } from "@/components/sections/services-page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage.meta" });
  return { title: t("title"), description: t("description") };
}

function ServicesCta() {
  const t = useTranslations("ServicesPage.cta");
  return (
    <InnerCta
      id="services-cta"
      eyebrow={t("eyebrow")}
      title={t("title")}
      body={t("body")}
      primary={{ label: t("ctaPrimary"), href: "/contact" }}
      secondary={{ label: t("ctaSecondary"), href: "/projects" }}
    />
  );
}

function ServicesHero() {
  const t = useTranslations("ServicesPage.hero");
  return (
    <InnerHero
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      scrollLabel={t("scroll")}
      ctaLabel={t("cta")}
      ctaHref="/contact"
    />
  );
}

export default async function ServicesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <ServicesHero />
      <ServiceDisciplines />
      <IntegratedAdvantage />
      <ServicesProcess />
      <ServicesCta />
    </main>
  );
}
