import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TechBackground } from "./TechBackground";
import { imageSrc, type ImageTopic } from "@/lib/images";

/**
 * Dominant engineering imagery frame. When an `image` topic (or raw `src`) is
 * given it renders the photograph with a subtle legibility gradient and a thin
 * engineered inset border. Without one it falls back to a green gradient +
 * technical overlay placeholder labelled with the intended shot.
 *
 * Relative + overflow-hidden so callers can layer parallax / captions.
 */
type Tone = "deep" | "mid" | "steel";
type Texture = "grid" | "topo" | "terrain" | "survey";

interface MediaFrameProps {
  /** e.g. "16/9", "4/5", "3/2". */
  ratio?: string;
  tone?: Tone;
  texture?: Texture;
  /** Short descriptor of the shot — used as alt text and placeholder tag. */
  label?: string;
  className?: string;
  /** Optional overlay content (parallax layers, captions, gradients). */
  children?: ReactNode;
  /** On-brand photo topic (public/images/<topic>.jpg). */
  image?: ImageTopic;
  /** Or a raw image src. */
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
  image,
  src,
  alt,
  rounded = true,
}: MediaFrameProps) {
  const photo = src ?? (image ? imageSrc(image) : undefined);
  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden bg-ink-900",
        rounded && "rounded-image",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {photo ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt={alt ?? label ?? ""}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle deep-green legibility wash + engineered border. */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-4 border border-mist-50/10" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className={cn("absolute inset-0 bg-gradient-to-br", tones[tone])} />
          <TechBackground variant={texture} opacity={8} className="text-brand-400" />
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
