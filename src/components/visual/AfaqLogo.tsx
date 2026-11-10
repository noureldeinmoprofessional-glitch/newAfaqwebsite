import { cn } from "@/lib/utils";

/**
 * AFAQ horizontal wordmark — the brand-approved green logo, served as an SVG
 * asset from /public so its gradients/compositing render exactly as supplied.
 * The parent controls the rendered height (e.g. `h-7` / `h-9` in the header);
 * `h-full w-auto` keeps the fixed aspect ratio. Decorative name is exposed to
 * assistive tech via `alt`.
 */
interface AfaqLogoProps {
  className?: string;
  title?: string;
}

export function AfaqLogo({ className, title = "AFAQ Systems" }: AfaqLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/afaq-logo-horizontal.svg"
      alt={title}
      className={cn("h-full w-auto select-none", className)}
      draggable={false}
    />
  );
}
