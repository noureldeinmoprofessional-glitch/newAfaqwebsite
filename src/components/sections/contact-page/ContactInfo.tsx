import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { TechBackground } from "@/components/visual/TechBackground";

/**
 * Contact — direct contact details and a map placeholder (Riyadh HQ imagery /
 * embed drops in later).
 */
export function ContactInfo() {
  const t = useTranslations("ContactPage.info");

  const rows = [
    { icon: MapPin, label: t("locationLabel"), value: t("location"), href: undefined, ltr: false },
    { icon: Mail, label: t("emailLabel"), value: t("email"), href: `mailto:${t("email")}`, ltr: true },
    { icon: Phone, label: t("phoneLabel"), value: t("phone"), href: `tel:${t("phone").replace(/\s/g, "")}`, ltr: true },
    { icon: Clock, label: t("hoursLabel"), value: t("hours"), href: undefined, ltr: false },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-display text-h3 font-semibold text-slate-900">{t("heading")}</h3>
        <ul className="mt-6 flex flex-col divide-y divide-line">
          {rows.map(({ icon: Icon, label, value, href, ltr }) => (
            <li key={label} className="flex items-start gap-4 py-4 first:pt-0">
              <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-button bg-brand-500/10 text-brand-600">
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <div>
                <p className="font-display text-eyebrow uppercase tracking-[0.1em] text-slate-500">{label}</p>
                {href ? (
                  <a
                    href={href}
                    dir={ltr ? "ltr" : undefined}
                    className="mt-0.5 block text-body-lg text-slate-900 transition-colors hover:text-brand-600"
                  >
                    {value}
                  </a>
                ) : (
                  <p dir={ltr ? "ltr" : undefined} className="mt-0.5 text-body-lg text-slate-900">
                    {value}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Map placeholder */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-image border border-line bg-mist-50">
        <TechBackground variant="topo" opacity={12} className="text-brand-500" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <MapPin className="mx-auto size-7 text-brand-500" strokeWidth={2} />
            <p className="mt-2 font-display text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500">
              {t("mapLabel")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
