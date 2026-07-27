import { cn } from "@/lib/utils";
import { imageSrc, projectImage } from "@/lib/images";
import type { Category } from "@/data/projects";

/**
 * Project cover photo, resolved from the project's category (with light variety
 * via the seed). Falls back gracefully if the image is unavailable.
 */
export function ProjectGlyph({
  category,
  seed = category,
  ratio = "16/10",
  className,
}: {
  category: Category;
  seed?: string;
  ratio?: string;
  className?: string;
}) {
  const src = imageSrc(projectImage(category, seed));
  return (
    <div
      className={cn("relative isolate w-full overflow-hidden rounded-image bg-ink-900", className)}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent" />
    </div>
  );
}
