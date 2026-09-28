import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { LogoMarks } from "./LogoMarks";

/**
 * About §11 — Technologies. The AV, display, control and network platforms AFAQ
 * is certified across. Dark band; brands render as placeholder marks.
 */
export function Technologies() {
  const t = useTranslations("AboutPage.technologies");
  const brands = t.raw("brands") as string[];

  return (
    <Section surface="ink-900" id="technologies" className="relative overflow-hidden">
      <TechBackground variant="grid" opacity={5} className="text-brand-400" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-mist-50">
            {t("title")}
          </Heading>
          <p className="mt-6 text-body-lg text-mist-50/70">{t("note")}</p>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <LogoMarks names={brands} variant="dark" />
        </div>
      </Container>
    </Section>
  );
}
