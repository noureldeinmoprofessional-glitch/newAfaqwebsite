import { Radar, Building2, Route, MonitorPlay, Layers, type LucideIcon } from "lucide-react";
import type { Category } from "@/data/projects";

/**
 * Per-category visual language for the Projects archive. Colour coding is
 * deliberately subtle (brief): a thin inline-start accent + a small icon, no
 * bright fills. `texture` selects the abstract engineering illustration used in
 * place of photography.
 */
interface CategoryMeta {
  Icon: LucideIcon;
  /** Inline-start accent colour (RTL-safe). */
  borderColor: string;
  dot: string;
  /** Soft icon tint. */
  iconClass: string;
  texture: "survey" | "terrain" | "grid" | "topo";
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  survey: {
    Icon: Radar,
    borderColor: "border-s-brand-600",
    dot: "bg-brand-600",
    iconClass: "text-brand-600",
    texture: "survey",
  },
  civil: {
    Icon: Building2,
    borderColor: "border-s-slate-500",
    dot: "bg-slate-500",
    iconClass: "text-slate-500",
    texture: "terrain",
  },
  its: {
    Icon: Route,
    borderColor: "border-s-tech-500",
    dot: "bg-tech-500",
    iconClass: "text-tech-500",
    texture: "grid",
  },
  av: {
    Icon: MonitorPlay,
    borderColor: "border-s-slate-300",
    dot: "bg-slate-400",
    iconClass: "text-slate-400",
    texture: "grid",
  },
  integrated: {
    Icon: Layers,
    borderColor: "border-s-brand-500",
    dot: "bg-brand-500",
    iconClass: "text-brand-500",
    texture: "survey",
  },
};
