import type { ElementType, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Optional ref forwarded to the rendered element (used to scope GSAP). */
  ref?: Ref<HTMLElement>;
  "aria-label"?: string;
}

/**
 * Centered content column. Max width 1440px with responsive page margins
 * (20 / 40 / 80px). Horizontal padding is symmetric, so it is RTL-safe.
 */
export function Container({ as: Tag = "div", className, children, ref, ...rest }: ContainerProps) {
  return (
    <Tag
      ref={ref}
      className={cn(
        "mx-auto w-full max-w-[var(--container-content)] px-5 md:px-10 lg:px-20",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
