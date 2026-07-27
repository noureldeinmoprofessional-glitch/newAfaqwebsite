import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { SERVICES, getService } from "@/data/services";
import { InnerCta } from "@/components/sections/shared/InnerCta";
import { ServiceDetail } from "@/components/sections/service-detail";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const lang = locale === "ar" ? "ar" : "en";
  return {
    title: `${service.name[lang]} — AFAQ Systems`,
    description: service.intro[lang],
  };
}

function ServiceCta() {
  const t = useTranslations("ServiceDetail.cta");
  return (
    <InnerCta
      id="service-cta"
      eyebrow={t("eyebrow")}
      title={t("title")}
      body={t("body")}
      primary={{ label: t("ctaPrimary"), href: "/contact" }}
      secondary={{ label: t("ctaSecondary"), href: "/contact" }}
    />
  );
}

export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getService(slug);
  if (!service) notFound();

  return (
    <main id="main">
      <ServiceDetail service={service} />
      <ServiceCta />
    </main>
  );
}
