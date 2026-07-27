import { setRequestLocale } from "next-intl/server";
import {
  VideoHero,
  TrustedBy,
  About,
  IntegratedAdvantage,
  Services,
  Industries,
  ProjectsShowcase,
  Numbers,
  CtaBanner,
  Blog,
} from "@/components/sections";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <VideoHero />
      <TrustedBy />
      <About />
      <IntegratedAdvantage />
      <Services />
      <Industries />
      <ProjectsShowcase />
      <Numbers />
      <CtaBanner />
      <Blog />
    </main>
  );
}
