import { cn } from "@/lib/utils";

interface StatBlockProps {
  /** The headline value, e.g. "500+", "±2mm", "100%". */
  value: string;
  /** Supporting label beneath the value. */
  label: string;
  className?: string;
  align?: "start" | "center";
}

/**
 * A statistic rendered as a visual element, not inline text.
 * Poppins 700, negative tracking, sized by the shared `--text-stat` token.
 * Western Arabic digits are kept in both locales (engineering data).
 */
export function StatBlock({ value, label, className, align = "start" }: StatBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      <span
        dir="ltr"
        className="font-display text-stat font-bold text-brand-500 tabular-nums"
      >
        {value}
      </span>
      <span className="text-eyebrow uppercase text-current/70">{label}</span>
    </div>
  );
}
