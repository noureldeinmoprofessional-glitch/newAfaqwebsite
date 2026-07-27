import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Container, Section } from "@/components/primitives";
import { InnerHero } from "@/components/sections/shared/InnerHero";
import { ContactForm } from "@/components/sections/contact-page/ContactForm";
import { ContactInfo } from "@/components/sections/contact-page/ContactInfo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage.meta" });
  return { title: t("title"), description: t("description") };
}

function ContactHero() {
  const t = useTranslations("ContactPage.hero");
  return <InnerHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} compact />;
}

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <ContactHero />
      <Section surface="mist-50" id="contact">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
