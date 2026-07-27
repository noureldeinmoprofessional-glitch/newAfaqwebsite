import { Radar, Building2, Route, MonitorPlay, Boxes, type LucideIcon } from "lucide-react";
import type { Category } from "@/data/projects";

/** Per-discipline icon + accent dot for case-study cards and badges. */
interface CaseCatMeta {
  Icon: LucideIcon;
  dot: string;
}

export const CASE_CATEGORY_META: Record<Category, CaseCatMeta> = {
  survey: { Icon: Radar, dot: "bg-brand-600" },
  civil: { Icon: Building2, dot: "bg-slate-500" },
  its: { Icon: Route, dot: "bg-brand-500" },
  av: { Icon: MonitorPlay, dot: "bg-tech-500" },
  integrated: { Icon: Boxes, dot: "bg-brand-500" },
};
