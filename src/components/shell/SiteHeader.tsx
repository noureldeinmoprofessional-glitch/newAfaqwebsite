"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/primitives";
import { AfaqLogo } from "@/components/visual/AfaqLogo";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { cn } from "@/lib/utils";

/**
 * Real routes for full pages; homepage section anchors (`/#…`) for sections that
 * live on the home page. next-intl's Link keeps the active locale prefix.
 */
const NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

/** A nav item is "active" only for full-page routes (not section anchors). */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const root = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Toggle solid state once the hero has scrolled past. Falls back to solid
  // immediately on pages without a #hero. Driven by GSAP ScrollTrigger inside a
  // scoped context so it is reverted cleanly on unmount.
  useGsapContext(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setScrolled(true);
      return;
    }
    ScrollTrigger.create({
      trigger: hero,
      start: "bottom top+=88",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
  }, root, []);

  const linkColor = scrolled
    ? "text-slate-900/80 hover:text-brand-600"
    : "text-mist-50/85 hover:text-brand-400";

  return (
    <header
      ref={root}
      id="top"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-[450ms] ease-out",
        scrolled
          ? "border-b border-brand-500/50 bg-white/95 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container
        as="nav"
        aria-label={t("menu")}
        className={cn(
          "flex items-center justify-between transition-[padding] duration-[450ms] ease-out",
          scrolled ? "py-3" : "py-5",
        )}
      >
        {/* Logo — color driven by text color for a smooth white→green tween. */}
        <Link
          href="/"
          aria-label="AFAQ Systems"
          className={cn(
            "block shrink-0 transition-[color,height] duration-[450ms] ease-out",
            scrolled ? "h-7 text-brand-500" : "h-9 text-mist-50",
          )}
        >
          <AfaqLogo className="h-full" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative font-display text-[0.9375rem] font-medium tracking-tight transition-colors duration-300",
                      active ? (scrolled ? "text-slate-900" : "text-mist-50") : linkColor,
                    )}
                  >
                    {t(item.key)}
                    {active && (
                      <span
                        className="absolute -bottom-1.5 inset-x-0 mx-auto h-px w-4 bg-brand-500"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span
            className={cn(
              "h-5 w-px transition-colors duration-300",
              scrolled ? "bg-line" : "bg-line-inv",
            )}
            aria-hidden="true"
          />
          <div className={cn("transition-colors duration-300", scrolled ? "text-slate-900" : "text-mist-50")}>
            <LocaleSwitcher />
          </div>
          <Link
            href="/contact"
            className={cn(
              "group/btn inline-flex items-center gap-2.5 rounded-full py-1 ps-4 pe-1 font-display text-[0.9375rem] font-medium transition-colors duration-[450ms]",
              scrolled
                ? "bg-brand-500 text-ink-900 hover:bg-brand-400"
                : "border border-mist-50/30 text-mist-50 hover:border-brand-400 hover:text-brand-400",
            )}
          >
            <span>{t("cta")}</span>
            <span
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-full transition-transform duration-300 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5",
                scrolled ? "bg-ink-900 text-brand-400" : "bg-brand-500 text-ink-900",
              )}
              aria-hidden="true"
            >
              <ArrowRight className="size-3.5 rtl:rotate-180" strokeWidth={2.5} />
            </span>
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("openMenu")}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-button transition-colors lg:hidden",
            scrolled ? "text-slate-900 hover:bg-mist-100" : "text-mist-50 hover:bg-white/10",
          )}
        >
          <Menu className="size-6" strokeWidth={2} />
        </button>
      </Container>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const items = panel.current?.querySelectorAll<HTMLElement>("[data-menu-item]");
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        panel.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06, delay: 0.05 },
        );
      }
    });
  }, panel, []);

  return (
    <div
      ref={panel}
      className="fixed inset-0 z-50 flex flex-col bg-ink-900 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <Container className="flex items-center justify-between py-5">
        <span className="block h-9 text-mist-50">
          <AfaqLogo className="h-full" />
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("closeMenu")}
          className="inline-flex size-10 items-center justify-center rounded-button text-mist-50 hover:bg-white/10"
        >
          <X className="size-6" strokeWidth={2} />
        </button>
      </Container>

      <Container className="flex flex-1 flex-col justify-center gap-1 py-10">
        {NAV.map((item, i) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              data-menu-item
              className={cn(
                "group flex items-baseline gap-4 border-b border-line-inv py-4 font-display text-3xl font-semibold transition-colors hover:text-brand-400",
                active ? "text-brand-400" : "text-mist-50",
              )}
            >
              <span className={cn("font-body text-sm tabular-nums", active ? "text-brand-400" : "text-brand-500")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {t(item.key)}
            </Link>
          );
        })}
      </Container>

      <Container className="flex items-center justify-between border-t border-line-inv py-6">
        <LocaleSwitcher />
        <Link
          href="/contact"
          onClick={onClose}
          className="group/btn inline-flex items-center gap-2.5 rounded-full bg-brand-500 py-1 ps-4 pe-1 font-display font-medium text-ink-900"
        >
          <span>{t("cta")}</span>
          <span
            className="inline-flex size-7 items-center justify-center rounded-full bg-ink-900 text-brand-400 transition-transform duration-300 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5"
            aria-hidden="true"
          >
            <ArrowRight className="size-3.5 rtl:rotate-180" strokeWidth={2.5} />
          </span>
        </Link>
      </Container>
    </div>
  );
}
