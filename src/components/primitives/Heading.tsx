import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3";
type HeadingSize = "display" | "h1" | "h2" | "h3";

const sizeClasses: Record<HeadingSize, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

interface HeadingProps {
  children: ReactNode;
  /** Semantic tag. */
  as?: HeadingLevel;
  /** Visual size token — defaults to match `as`. */
  size?: HeadingSize;
  className?: string;
  balance?: boolean;
}

/**
 * Display / heading type. Space Grotesk on Latin, IBM Plex Sans Arabic on RTL
 * (handled globally in globals.css). Semantic level and visual size are
 * decoupled so hierarchy and scale can differ.
 */
export function Heading({
  children,
  as: Tag = "h2",
  size,
  className,
  balance = true,
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        sizeClasses[size ?? Tag],
        "font-display font-semibold text-current",
        balance && "text-balance",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
