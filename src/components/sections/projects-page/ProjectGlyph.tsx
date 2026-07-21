import { cn } from "@/lib/utils";
import { TechBackground } from "@/components/visual/TechBackground";
import type { Category } from "@/data/projects";
import { CATEGORY_META } from "./categoryMeta";

/**
 * Abstract engineering illustration standing in for project photography — each
 * category gets its own technical visual language (survey markers, terrain
 * wireframe, coordinate grid). No generic placeholder imagery.
 */
export function ProjectGlyph({
  category,
  ratio = "16/10",
  className,
}: {
  category: Category;
  ratio?: string;
  className?: string;
}) {
  const meta = CATEGORY_META[category];
  return (
    <div
      className={cn("relative isolate w-full overflow-hidden rounded-image bg-ink-900", className)}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-700" />
      <TechBackground variant={meta.texture} opacity={12} className="text-brand-400" />
      <div className="absolute inset-3 border border-mist-50/10" />
      <div className="absolute inset-0 grid place-items-center">
        <meta.Icon className="size-8 text-mist-50/45" strokeWidth={1.5} />
      </div>
    </div>
  );
}
