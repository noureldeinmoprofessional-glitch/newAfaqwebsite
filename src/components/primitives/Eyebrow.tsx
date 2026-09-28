import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Optional leading index marker, e.g. "01". */
  index?: string;
  tone?: "brand" | "muted";
}

/**
 * Uppercase technical label. Poppins, tracking 0.12em, weight 600 (from the
 * `--text-eyebrow` token). Used for section labels and eyebrows.
 */
export function Eyebrow({ children, className, index, tone = "brand" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-display text-eyebrow uppercase",
        tone === "brand" ? "text-brand-500" : "text-slate-600",
        className,
      )}
    >
      {index && (
        <span className="tabular-nums text-current/60" aria-hidden="true">
          {index}
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}
