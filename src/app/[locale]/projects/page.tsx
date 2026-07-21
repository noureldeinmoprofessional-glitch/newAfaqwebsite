import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  ProjectsHero,
  ProjectsStats,
  ProjectsExplorer,
  ProjectsCta,
} from "@/components/sections/projects-page";

/** Brand-level portfolio scale used in the hero copy. */
const PROJECT_COUNT = 500;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <ProjectsHero count={PROJECT_COUNT} />
      <ProjectsStats />
      <ProjectsExplorer />
      <ProjectsCta />
    </main>
  );
}
