"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECTS = ["general", "survey", "civil", "its", "av", "integrated"] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Contact form — presentational. Validates client-side and shows a success
 * state; wire the submit handler to a backend / email service / CRM to receive
 * submissions (no data is sent anywhere as-is).
 */
export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [values, setValues] = useState({ name: "", email: "", company: "", subject: "general", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = t("required");
    if (!values.email.trim()) next.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t("invalidEmail");
    if (!values.message.trim()) next.message = t("required");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: POST `values` to your backend / email service / CRM here.
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-card border border-line bg-mist-50 p-10 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-500/15 text-brand-600">
          <Check className="size-7" strokeWidth={2} />
        </span>
        <h2 className="mt-6 font-display text-h2 font-semibold text-slate-900">{t("successTitle")}</h2>
        <p className="mt-3 max-w-md text-body text-slate-600">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setValues({ name: "", email: "", company: "", subject: "general", message: "" });
          }}
          className="mt-8 inline-flex h-11 items-center rounded-button border border-line px-6 font-display font-medium text-slate-900 transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          {t("reset")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-card border border-line bg-white p-6 lg:p-8">
      <h2 className="font-display text-h2 font-semibold text-slate-900">{t("heading")}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} error={errors.name} className="sm:col-span-1">
          <input
            type="text"
            value={values.name}
            onChange={set("name")}
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label={t("email")} error={errors.email} className="sm:col-span-1">
          <input
            type="email"
            dir="ltr"
            value={values.email}
            onChange={set("email")}
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            className={inputCls(!!errors.email)}
          />
        </Field>
        <Field label={t("company")} className="sm:col-span-1">
          <input
            type="text"
            value={values.company}
            onChange={set("company")}
            placeholder={t("companyPlaceholder")}
            className={inputCls(false)}
          />
        </Field>
        <Field label={t("subject")} className="sm:col-span-1">
          <select value={values.subject} onChange={set("subject")} className={cn(inputCls(false), "cursor-pointer")}>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {t(`subjects.${s}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("message")} error={errors.message} className="sm:col-span-2">
          <textarea
            rows={5}
            value={values.message}
            onChange={set("message")}
            placeholder={t("messagePlaceholder")}
            aria-invalid={!!errors.message}
            className={cn(inputCls(!!errors.message, true), "resize-y")}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-small text-slate-400">{t("note")}</p>
        <button
          type="submit"
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-button bg-brand-500 px-7 font-display font-medium text-ink-900 transition-colors hover:bg-brand-400"
        >
          {t("submit")}
          <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100" strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}

function inputCls(invalid: boolean, multiline = false): string {
  return cn(
    "w-full rounded-button border bg-mist-50 px-4 text-body text-slate-900 placeholder:text-slate-400 transition-colors focus:bg-white focus:outline-none",
    multiline ? "py-3" : "h-11",
    invalid ? "border-red-400 focus:border-red-500" : "border-line focus:border-brand-500",
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 flex items-center justify-between font-display text-eyebrow uppercase text-slate-600">
        {label}
        {error && <span className="font-body text-small normal-case tracking-normal text-red-500">{error}</span>}
      </span>
      {children}
    </label>
  );
}
