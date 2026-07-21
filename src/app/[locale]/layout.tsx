import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getDirection } from "@/i18n/direction";
import { fontVariables } from "@/fonts";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import "../globals.css";

/** Pre-render both locales at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this request.
  setRequestLocale(locale);

  const dir = getDirection(locale);
  const tc = await getTranslations({ locale, namespace: "Common" });

  return (
    <html
      lang={locale}
      dir={dir}
      data-locale={locale}
      className={`${fontVariables} no-js`}
      suppressHydrationWarning
    >
      <head>
        {/* Flip `no-js` → `js` before paint so non-JS users keep final state. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body className="min-h-svh bg-ink-900 text-mist-50 antialiased">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-button focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-display focus:text-ink-900"
          >
            {tc("skipToContent")}
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
