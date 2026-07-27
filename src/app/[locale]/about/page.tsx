import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { IntegratedAdvantage, Industries } from "@/components/sections";
import {
  AboutHero,
  OurStory,
  OurValues,
  EngineeringExcellence,
  Innovation,
  TrustPillars,
  Vision2030,
  Technologies,
  Partners,
  AboutNumbers,
  AboutCta,
} from "@/components/sections/about-page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <AboutHero />
      <OurStory />
      <OurValues />
      <IntegratedAdvantage />
      <EngineeringExcellence />
      <Innovation />
      <TrustPillars />
      <Industries />
      <Vision2030 />
      <Partners />
      <Technologies />
      <AboutNumbers />
      <AboutCta />
    </main>
  );
}
