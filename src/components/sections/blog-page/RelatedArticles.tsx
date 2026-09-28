import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading } from "@/components/primitives";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ARTICLES } from "@/data/articles";
import { BLOG_CATEGORY_META } from "./blogCategoryMeta";
import { ArticleCover } from "./ArticleCover";

/** Up to three related articles — same category first, then the latest others. */
export function RelatedArticles({ slug }: { slug: string }) {
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const t = useTranslations("BlogPage.article");
  const tl = useTranslations("BlogPage.list");
  const tc = useTranslations("BlogPage.categories");

  const current = ARTICLES.find((a) => a.slug === slug);
  if (!current) return null;

  const others = ARTICLES.filter((a) => a.slug !== slug);
  const sameCat = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category).sort((a, b) => (a.date < b.date ? 1 : -1));
  const related = [...sameCat, ...rest].slice(0, 3);

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(new Date(iso));

  return (
    <Section surface="mist-50" id="related">
      <Container>
        <Heading as="h2" size="h3" className="text-slate-900">
          {t("related")}
        </Heading>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <article key={a.slug} className="group">
              <Link href={`/blog/${a.slug}`} className="block">
                <div className="overflow-hidden rounded-image">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <ArticleCover article={a} ratio="16/10" className="rounded-none" />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-eyebrow uppercase text-slate-500">
                  <span className="inline-flex items-center gap-1.5 text-brand-600">
                    <span className={cn("size-1.5 rounded-full", BLOG_CATEGORY_META[a.category].dot)} aria-hidden="true" />
                    {tc(a.category)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span dir="ltr">{fmt(a.date)}</span>
                </div>
                <h3 className="mt-2 font-display text-h3 font-semibold leading-tight text-slate-900 transition-colors group-hover:text-brand-600">
                  {a.title[lang]}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-body font-medium text-brand-600 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {tl("readMore")}
                  <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={2} />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
