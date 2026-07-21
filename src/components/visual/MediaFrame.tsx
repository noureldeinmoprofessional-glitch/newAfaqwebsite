import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TechBackground } from "./TechBackground";

/**
 * Standing in for real project photography (see MISSING_ASSETS.md). Renders a
 * premium engineering surface — deep-green gradient + technical overlay — at a
 * fixed aspect ratio with a descriptive label naming the shot the client should
 * supply. When a real image URL lands, pass `src` and it renders instead.
 *
 * Large by design: imagery should dominate (brief §Photography). The frame is
 * relative + overflow-hidden so callers can layer parallax / blueprint content.
 */
type Tone = "deep" | "mid" | "steel";
type Texture = "grid" | "topo" | "terrain" | "survey";

interface MediaFrameProps {
  /** e.g. "16/9", "4/5", "3/2". */
  ratio?: string;
  tone?: Tone;
  texture?: Texture;
  /** Short descriptor of the intended photograph, shown as a placeholder tag. */
  label?: string;
  className?: string;
  /** Optional overlay content (parallax layers, captions, gradients). */
  children?: ReactNode;
  /** Real image src once available. */
  src?: string;
  alt?: string;
  rounded?: boolean;
}

const tones: Record<Tone, string> = {
  deep: "from-ink-900 via-ink-800 to-ink-700",
  mid: "from-ink-800 via-ink-700 to-brand-600/40",
  steel: "from-ink-700 via-slate-900 to-ink-900",
};

export function MediaFrame({
  ratio = "16/9",
  tone = "deep",
  texture = "grid",
  label,
  className,
  children,
  src,
  alt = "",
  rounded = true,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden bg-ink-900",
        rounded && "rounded-image",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <div className={cn("absolute inset-0 bg-gradient-to-br", tones[tone])} />
          <TechBackground variant={texture} opacity={8} className="text-brand-400" />
          {/* Corner survey ticks for engineered framing. */}
          <div className="absolute inset-4 border border-mist-50/10" aria-hidden="true" />
          {label && (
            <span className="absolute bottom-4 left-4 z-10 max-w-[70%] font-display text-[0.6875rem] uppercase tracking-[0.14em] text-mist-50/45">
              {label}
            </span>
          )}
        </>
      )}
      {children}
    </div>
  );
}
