import { setRequestLocale } from "next-intl/server";
import {
  Hero,
  TrustedBy,
  About,
  IntegratedAdvantage,
  Services,
  Industries,
  ProjectsShowcase,
  CaseStudies,
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
      <Hero />
      <TrustedBy />
      <About />
      <IntegratedAdvantage />
      <Services />
      <Industries />
      <ProjectsShowcase />
      <CaseStudies />
      <Numbers />
      <CtaBanner />
      <Blog />
    </main>
  );
}
