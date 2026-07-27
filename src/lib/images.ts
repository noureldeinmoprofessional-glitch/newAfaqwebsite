import type { Category } from "@/data/projects";
import type { ArticleCategory } from "@/data/articles";

/**
 * Photographic image set (public/images/*.jpg). Bright, on-brand engineering
 * imagery with emerald accents. Section placeholders reference a topic by key;
 * project/article covers resolve a topic from their category (with light
 * variety so a category isn't a single repeated photo).
 */
export const IMAGE_TOPICS = [
  "survey",
  "steel-fabrication",
  "its",
  "av-led",
  "integrated-smartcity",
  "riyadh-skyline",
  "drone-survey",
  "gis-mapping",
  "control-room",
  "water-infrastructure",
  "engineers-site",
  "digital-twin",
] as const;

export type ImageTopic = (typeof IMAGE_TOPICS)[number];

export function imageSrc(topic: ImageTopic): string {
  return `/images/${topic}.jpg`;
}

/** Deterministic small hash for stable per-item variety. */
function pick<T>(list: readonly T[], seed: string): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return list[h % list.length];
}

const PROJECT_TOPICS: Record<Category, readonly ImageTopic[]> = {
  survey: ["survey", "drone-survey", "gis-mapping"],
  civil: ["steel-fabrication", "engineers-site", "water-infrastructure"],
  its: ["its", "control-room"],
  av: ["av-led", "control-room"],
  integrated: ["integrated-smartcity", "riyadh-skyline", "digital-twin"],
};

export function projectImage(category: Category, seed: string): ImageTopic {
  return pick(PROJECT_TOPICS[category], seed);
}

const ARTICLE_TOPICS: Record<ArticleCategory, ImageTopic> = {
  geospatial: "gis-mapping",
  digital: "digital-twin",
  transport: "its",
  infrastructure: "steel-fabrication",
  vision2030: "riyadh-skyline",
};

export function articleImage(category: ArticleCategory): ImageTopic {
  return ARTICLE_TOPICS[category];
}
