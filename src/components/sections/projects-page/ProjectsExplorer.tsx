"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search, List, LayoutGrid, Map, ArrowRight, X, ChevronRight } from "lucide-react";
import { Container, Section } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import {
  PROJECTS,
  CATEGORY_KEYS,
  REGION_KEYS,
  ENTITY_KEYS,
  type Project,
  type Category,
  type RegionKey,
  type EntityKey,
} from "@/data/projects";
import { CATEGORY_META } from "./categoryMeta";
import { ProjectGlyph } from "./ProjectGlyph";
import { ProjectDrawer } from "./ProjectDrawer";

const PAGE_SIZE = 9;
const YEARS = Array.from(new Set(PROJECTS.map((p) => p.year))).sort((a, b) => b - a);

type Sort = "newest" | "oldest" | "az";
type View = "list" | "grid" | "map";
type Facet<T extends string | number> = T | "all";

/**
 * Projects §3–4 — the interactive engineering archive. Sticky glass filter bar,
 * instant search with match highlighting, sort, list / grid views, load-more,
 * and a slide-in detail drawer. All filtering is client-side and instant.
 */
export function ProjectsExplorer() {
  const locale = useLocale();
  const lang = locale as "en" | "ar";
  const t = useTranslations("ProjectsPage.explorer");
  const tCat = useTranslations("ProjectsPage.categories");
  const tReg = useTranslations("ProjectsPage.regions");
  const tEnt = useTranslations("ProjectsPage.entities");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Facet<Category>>("all");
  const [region, setRegion] = useState<Facet<RegionKey>>("all");
  const [entity, setEntity] = useState<Facet<EntityKey>>("all");
  const [year, setYear] = useState<Facet<number>>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [view, setView] = useState<View>("list");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [active, setActive] = useState<Project | null>(null);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = PROJECTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (region !== "all" && p.region !== region) return false;
      if (entity !== "all" && p.entity !== entity) return false;
      if (year !== "all" && p.year !== year) return false;
      if (q) {
        const hay = [
          p.name[lang],
          p.scope[lang],
          p.city[lang],
          tCat(p.category),
          tReg(p.region),
          tEnt(p.entity),
          String(p.year),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      if (sort === "az") return a.name[lang].localeCompare(b.name[lang], locale);
      if (sort === "oldest") return a.year - b.year;
      return b.year - a.year;
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, region, entity, year, sort, q, lang, locale]);

  // Reset pagination whenever the result set changes.
  useEffect(() => setVisible(PAGE_SIZE), [category, region, entity, year, sort, q]);

  const shown = filtered.slice(0, visible);
  const hasFilters = query || category !== "all" || region !== "all" || entity !== "all" || year !== "all";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setRegion("all");
    setEntity("all");
    setYear("all");
  };

  return (
    <Section surface="white" id="projects" className="relative overflow-hidden" flush>
      <TechBackground variant="grid" opacity={3} className="text-slate-900" />
      <Container className="relative py-16 lg:py-20">
        <p className="max-w-2xl text-body text-slate-500">{t("note")}</p>

        {/* Sticky filter bar */}
        <div className="sticky top-14 z-30 -mx-5 mt-8 border-y border-line bg-white/85 px-5 py-4 backdrop-blur-md md:-mx-10 md:px-10 lg:top-16">
          <div className="flex flex-col gap-3">
            {/* Search + view toggle */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative flex-1">
                <span className="sr-only">{t("searchLabel")}</span>
                <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" strokeWidth={2} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="h-11 w-full rounded-button border border-line bg-mist-50 ps-10 pe-4 text-body text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none"
                />
              </label>

              <div className="inline-flex items-center gap-1 rounded-button border border-line p-1">
                <ViewButton active={view === "list"} onClick={() => setView("list")} label={t("view.list")}>
                  <List className="size-4" strokeWidth={2} />
                </ViewButton>
                <ViewButton active={view === "grid"} onClick={() => setView("grid")} label={t("view.grid")}>
                  <LayoutGrid className="size-4" strokeWidth={2} />
                </ViewButton>
                <ViewButton active={view === "map"} onClick={() => setView("map")} label={t("view.map")}>
                  <Map className="size-4" strokeWidth={2} />
                </ViewButton>
              </div>
            </div>

            {/* Facet selects */}
            <div className="flex flex-wrap items-center gap-2">
              <FacetSelect value={category} onChange={(v) => setCategory(v as Facet<Category>)} label={t("filters.category")}>
                <option value="all">{t("filters.allCategories")}</option>
                {CATEGORY_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {tCat(k)}
                  </option>
                ))}
              </FacetSelect>

              <FacetSelect value={region} onChange={(v) => setRegion(v as Facet<RegionKey>)} label={t("filters.region")}>
                <option value="all">{t("filters.allRegions")}</option>
                {REGION_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {tReg(k)}
                  </option>
                ))}
              </FacetSelect>

              <FacetSelect value={entity} onChange={(v) => setEntity(v as Facet<EntityKey>)} label={t("filters.entity")}>
                <option value="all">{t("filters.allEntities")}</option>
                {ENTITY_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {tEnt(k)}
                  </option>
                ))}
              </FacetSelect>

              <FacetSelect
                value={String(year)}
                onChange={(v) => setYear(v === "all" ? "all" : Number(v))}
                label={t("filters.year")}
              >
                <option value="all">{t("filters.allYears")}</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </FacetSelect>

              <FacetSelect value={sort} onChange={(v) => setSort(v as Sort)} label={t("filters.sort")}>
                <option value="newest">{t("sort.newest")}</option>
                <option value="oldest">{t("sort.oldest")}</option>
                <option value="az">{t("sort.az")}</option>
              </FacetSelect>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-button px-3 py-2 text-small font-medium text-brand-600 transition-colors hover:bg-brand-500/10"
                >
                  <X className="size-3.5" strokeWidth={2} />
                  {t("filters.clear")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Result count */}
        <p className="mt-6 font-display text-eyebrow uppercase text-slate-500">
          {t("showing", { shown: shown.length, total: filtered.length })}
        </p>

        {/* Results */}
        {view === "map" ? (
          <MapPlaceholder message={t("view.mapSoon")} />
        ) : filtered.length === 0 ? (
          <Empty message={t("empty")} action={t("emptyAction")} onClear={clearFilters} />
        ) : view === "list" ? (
          <Ledger
            projects={shown}
            lang={lang}
            query={q}
            onOpen={setActive}
            labels={{ tCat, tReg, tEnt, columns: t }}
          />
        ) : (
          <Grid projects={shown} lang={lang} query={q} onOpen={setActive} labels={{ tCat, tReg, tEnt }} />
        )}

        {/* Load more */}
        {view !== "map" && visible < filtered.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="group inline-flex h-12 items-center gap-2 rounded-button border border-line px-7 font-display font-medium text-slate-900 transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              {t("loadMore")}
              <ChevronRight className="size-4 rotate-90" strokeWidth={2} />
            </button>
          </div>
        )}
      </Container>

      <ProjectDrawer project={active} onClose={() => setActive(null)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ Ledger */

type LabelFns = {
  tCat: (k: string) => string;
  tReg: (k: string) => string;
  tEnt: (k: string) => string;
};

function Ledger({
  projects,
  lang,
  query,
  onOpen,
  labels,
}: {
  projects: Project[];
  lang: "en" | "ar";
  query: string;
  onOpen: (p: Project) => void;
  labels: LabelFns & { columns: (k: string) => string };
}) {
  const { tCat, tReg, tEnt, columns } = labels;
  return (
    <Reveal className="mt-6 flex flex-col" stagger={0.04} y={16}>
      {/* Column header (desktop) */}
      <div className="hidden grid-cols-[minmax(0,2.6fr)_1fr_1.1fr_1.2fr_auto] gap-4 border-b border-line px-4 pb-3 font-display text-eyebrow uppercase text-slate-400 lg:grid">
        <span>{columns("columns.project")}</span>
        <span>{columns("columns.category")}</span>
        <span>{columns("columns.location")}</span>
        <span>{columns("columns.entity")}</span>
        <span className="text-end">{columns("columns.year")}</span>
      </div>

      {projects.map((p) => {
        const meta = CATEGORY_META[p.category];
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onOpen(p)}
            className={cn(
              "group grid grid-cols-1 items-center gap-x-4 gap-y-2 border-s-2 border-b border-b-line bg-white px-4 py-5 text-start transition-colors hover:bg-mist-50 lg:grid-cols-[minmax(0,2.6fr)_1fr_1.1fr_1.2fr_auto]",
              meta.borderColor,
            )}
          >
            <div className="min-w-0">
              <h3 className="font-display text-h3 font-semibold leading-tight text-slate-900 transition-colors group-hover:text-brand-600">
                <Highlight text={p.name[lang]} query={query} />
              </h3>
              <p className="mt-1 line-clamp-2 max-w-xl text-body text-slate-500">
                <Highlight text={p.scope[lang]} query={query} />
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-small font-medium text-slate-600">
              <span className={cn("size-1.5 rounded-full", meta.dot)} aria-hidden="true" />
              {tCat(p.category)}
            </span>

            <span className="text-body text-slate-600">
              <Highlight text={`${p.city[lang]} · ${tReg(p.region)}`} query={query} />
            </span>

            <span className="text-body text-slate-600">
              <Highlight text={tEnt(p.entity)} query={query} />
            </span>

            <span className="flex items-center justify-between gap-3 lg:justify-end">
              <span dir="ltr" className="font-display tabular-nums text-slate-500">{p.year}</span>
              <ArrowRight className="size-4 text-brand-500 opacity-0 transition-all duration-300 group-hover:opacity-100 rtl:rotate-180" strokeWidth={2} />
            </span>
          </button>
        );
      })}
    </Reveal>
  );
}

/* -------------------------------------------------------------------- Grid */

function Grid({
  projects,
  lang,
  query,
  onOpen,
  labels,
}: {
  projects: Project[];
  lang: "en" | "ar";
  query: string;
  onOpen: (p: Project) => void;
  labels: LabelFns;
}) {
  const { tCat, tReg, tEnt } = labels;
  return (
    <Reveal className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
      {projects.map((p) => {
        const meta = CATEGORY_META[p.category];
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onOpen(p)}
            className={cn(
              "group flex flex-col overflow-hidden rounded-card border border-line border-s-2 bg-white text-start transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40",
              meta.borderColor,
            )}
          >
            <div className="p-3 pb-0">
              <ProjectGlyph category={p.category} seed={p.id} ratio="16/10" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-small font-medium text-slate-600">
                <span className={cn("size-1.5 rounded-full", meta.dot)} aria-hidden="true" />
                {tCat(p.category)}
              </span>
              <h3 className="mt-4 font-display text-h3 font-semibold leading-tight text-slate-900 transition-colors group-hover:text-brand-600">
                <Highlight text={p.name[lang]} query={query} />
              </h3>
              <p className="mt-1 text-small text-slate-500">
                {p.city[lang]} · {tReg(p.region)}
              </p>
              <p className="mt-3 line-clamp-2 flex-1 text-body text-slate-500">
                <Highlight text={p.scope[lang]} query={query} />
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-small text-slate-600">{tEnt(p.entity)}</span>
                <ArrowRight className="size-4 text-brand-500 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />
              </div>
            </div>
          </button>
        );
      })}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ pieces */

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-[6px] transition-colors",
        active ? "bg-brand-500 text-ink-900" : "text-slate-500 hover:bg-mist-100",
      )}
    >
      {children}
    </button>
  );
}

function FacetSelect({
  value,
  onChange,
  label,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-10 cursor-pointer rounded-button border border-line bg-white px-3 pe-8 text-small text-slate-700 transition-colors hover:border-slate-300 focus:border-brand-500 focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

function MapPlaceholder({ message }: { message: string }) {
  return (
    <div className="relative mt-6 grid min-h-[360px] place-items-center overflow-hidden rounded-card border border-line bg-mist-50">
      <TechBackground variant="topo" opacity={10} className="text-brand-500" />
      <div className="relative max-w-sm px-6 text-center">
        <Map className="mx-auto size-8 text-brand-500" strokeWidth={1.5} />
        <p className="mt-4 text-body text-slate-600">{message}</p>
      </div>
    </div>
  );
}

function Empty({ message, action, onClear }: { message: string; action: string; onClear: () => void }) {
  return (
    <div className="mt-10 rounded-card border border-dashed border-line py-16 text-center">
      <p className="text-body-lg text-slate-500">{message}</p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center gap-1.5 font-display font-medium text-brand-600 hover:text-brand-500"
      >
        {action}
      </button>
    </div>
  );
}

/** Highlights case-insensitive matches of `query` within `text`. */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded-[2px] bg-brand-500/25 text-inherit">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
