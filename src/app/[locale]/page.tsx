import { setRequestLocale } from "next-intl/server";
import {
  HeroSlider,
  TrustedBy,
  About,
  IntegratedAdvantage,
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
      <HeroSlider />
      <TrustedBy />
      <About />
      <IntegratedAdvantage />
      <ProjectsShowcase />
      <Numbers />
      <Blog />
      <CtaBanner />
    </main>
  );
}
