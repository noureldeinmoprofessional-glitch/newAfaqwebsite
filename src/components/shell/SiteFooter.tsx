import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/primitives";
import { AfaqLogo } from "@/components/visual/AfaqLogo";
import { TechBackground } from "@/components/visual/TechBackground";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "blog", href: "/#blog" },
  { key: "contact", href: "/contact" },
] as const;
const SERVICE_KEYS = ["survey", "civil", "its", "av"] as const;
const SOCIAL_KEYS = ["linkedin", "x", "instagram", "youtube"] as const;

/**
 * Large corporate footer (brief §12). Deep-green surface with a subtle grid
 * overlay, thin gold separators, and a Vision 2030 statement. Newsletter is
 * presentational only — no submission wired (see safety constraints).
 */
export function SiteFooter() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const ts = useTranslations("Services.items");

  return (
    <footer id="site-footer" className="relative overflow-hidden bg-ink-900 text-mist-50">
      <TechBackground variant="grid" opacity={4} className="text-brand-400" />

      <Container className="relative">
        {/* Top: brand + newsletter */}
        <div className="grid gap-12 border-b border-line-inv py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="h-10 w-auto text-mist-50">
              <AfaqLogo className="h-full" />
            </div>
            <p className="mt-6 font-display text-h3 font-medium text-mist-50">
              {t("tagline")}
            </p>
            <p className="mt-4 max-w-xl text-body text-mist-50/60">{t("summary")}</p>
          </div>

          <div className="lg:col-span-6 xl:col-span-5">
            <p className="font-display text-eyebrow uppercase text-brand-500">
              {t("newsletterHeading")}
            </p>
            <p className="mt-3 max-w-sm text-body text-mist-50/60">{t("newsletterBody")}</p>
            <form className="mt-6 flex max-w-md items-center gap-2" aria-label={t("newsletterHeading")}>
              <input
                type="email"
                placeholder={t("newsletterPlaceholder")}
                className="h-12 w-full rounded-button border border-line-inv bg-white/5 px-4 text-body text-mist-50 placeholder:text-mist-50/40 focus:border-brand-500 focus:outline-none"
                aria-label={t("newsletterPlaceholder")}
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-button bg-brand-500 px-5 font-display font-medium text-ink-900 transition-colors hover:bg-brand-400"
              >
                {t("newsletterCta")}
              </button>
            </form>
          </div>
        </div>

        {/* Middle: link columns + contact + map */}
        <div className="grid gap-12 border-b border-line-inv py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <FooterCol className="lg:col-span-2" heading={t("navHeading")}>
            {NAV_LINKS.map((item) => (
              <FooterLink key={item.key} href={item.href}>
                {tn(item.key)}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol className="lg:col-span-3" heading={t("servicesHeading")}>
            {SERVICE_KEYS.map((k) => (
              <FooterLink key={k} href="/services">
                {ts(`${k}.name`)}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol className="lg:col-span-3" heading={t("contactHeading")}>
            <ContactRow icon={<MapPin className="size-4 text-brand-500" strokeWidth={2} />}>
              {t("location")}
            </ContactRow>
            <ContactRow icon={<Mail className="size-4 text-brand-500" strokeWidth={2} />}>
              <a href={`mailto:${t("email")}`} dir="ltr" className="hover:text-brand-400">
                {t("email")}
              </a>
            </ContactRow>
            <ContactRow icon={<Phone className="size-4 text-brand-500" strokeWidth={2} />}>
              <span dir="ltr">{t("phone")}</span>
            </ContactRow>
            <div className="mt-5 flex flex-wrap gap-2">
              {SOCIAL_KEYS.map((k) => (
                <a
                  key={k}
                  href="#"
                  className="group inline-flex items-center gap-1 rounded-button border border-line-inv px-3 py-1.5 text-[0.8125rem] text-mist-50/70 transition-colors hover:border-brand-500 hover:text-brand-400"
                >
                  {t(`social.${k}`)}
                  <ArrowUpRight className="size-3" strokeWidth={2} />
                </a>
              ))}
            </div>
          </FooterCol>

          <div className="lg:col-span-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-image border border-line-inv">
              <TechBackground variant="topo" opacity={16} className="text-brand-400" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <MapPin className="mx-auto size-6 text-brand-500" strokeWidth={2} />
                  <p className="mt-2 font-display text-[0.6875rem] uppercase tracking-[0.14em] text-mist-50/50">
                    {t("mapLabel")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-8 text-[0.8125rem] text-mist-50/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {t("rights")}</p>
          <p className="font-display uppercase tracking-[0.12em] text-brand-500/80">
            {t("vision")}
          </p>
          <p className="font-display uppercase tracking-[0.12em]">{t("established")}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  heading,
  children,
  className,
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-display text-eyebrow uppercase text-brand-500">{heading}</p>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-body text-mist-50/70 transition-colors hover:text-brand-400">
        {children}
      </Link>
    </li>
  );
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-body text-mist-50/70">
      <span className="mt-1 shrink-0">{icon}</span>
      <span>{children}</span>
    </li>
  );
}
