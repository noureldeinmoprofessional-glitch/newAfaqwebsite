import { Radar, Boxes, Route, Building2, Target, type LucideIcon } from "lucide-react";
import type { ArticleCategory } from "@/data/articles";

/** Per-category icon + accent for the Insights blog. Subtle, technical. */
interface BlogCatMeta {
  Icon: LucideIcon;
  dot: string;
}

export const BLOG_CATEGORY_META: Record<ArticleCategory, BlogCatMeta> = {
  geospatial: { Icon: Radar, dot: "bg-brand-600" },
  digital: { Icon: Boxes, dot: "bg-tech-500" },
  transport: { Icon: Route, dot: "bg-brand-500" },
  infrastructure: { Icon: Building2, dot: "bg-slate-500" },
  vision2030: { Icon: Target, dot: "bg-brand-500" },
};
