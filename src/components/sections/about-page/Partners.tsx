import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { LogoMarks } from "./LogoMarks";

/**
 * About §12 — Clients & Partners. Two categories mirroring the company profile:
 * Government & Semi-Government, and Private Sector. Names render as placeholder
 * marks pending brand-approved logos.
 */
export function Partners() {
  const t = useTranslations("AboutPage.partners");
  const government = t.raw("government") as string[];
  const priv = t.raw("private") as string[];

  return (
    <Section surface="mist-50" id="partners">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-slate-900">
            {t("title")}
          </Heading>
          <p className="mt-6 text-body-lg text-slate-600">{t("note")}</p>
        </Reveal>

        <div className="mt-14 space-y-14 lg:mt-16">
          <Group label={t("govLabel")} names={government} />
          <Group label={t("privateLabel")} names={priv} />
        </div>
      </Container>
    </Section>
  );
}

function Group({ label, names }: { label: string; names: string[] }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <h3 className="font-display text-eyebrow uppercase text-brand-600">{label}</h3>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        <span className="font-display text-eyebrow tabular-nums text-slate-400">{names.length}</span>
      </div>
      <LogoMarks names={names} variant="light" />
    </div>
  );
}
