import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import { InnerCta } from "@/components/sections/shared/InnerCta";
import { CaseStudyDetail } from "@/components/sections/case-studies-page";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => CASE_STUDIES.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const lang = locale === "ar" ? "ar" : "en";
  return {
    title: `${study.name[lang]} — AFAQ Systems`,
    description: study.teaser[lang],
  };
}

function CaseStudyCta() {
  const t = useTranslations("CaseStudyDetail.cta");
  return (
    <InnerCta
      id="case-study-cta"
      eyebrow={t("eyebrow")}
      title={t("title")}
      body={t("body")}
      primary={{ label: t("ctaPrimary"), href: "/contact" }}
      secondary={{ label: t("ctaSecondary"), href: "/services" }}
    />
  );
}

export default async function CaseStudyRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main id="main">
      <CaseStudyDetail study={study} />
      <CaseStudyCta />
    </main>
  );
}
