"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { Faq } from "@/data/services";

/**
 * 10 — FAQs. Accessible accordion (one open at a time). The Q&A text is
 * SEO-friendly service copy grounded in the company profile.
 */
export function ServiceFaqs({ faqs }: { faqs: Faq[] }) {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("ServiceDetail.faqs");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section surface="mist-50" id="faqs">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-4 text-slate-900">
            {t("title")}
          </Heading>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start transition-colors hover:bg-mist-50"
                >
                  <span className="font-display text-body-lg font-medium text-slate-900">{f.q[lang]}</span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-brand-600 transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-body leading-relaxed text-slate-600">{f.a[lang]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
