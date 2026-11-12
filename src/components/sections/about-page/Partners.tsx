import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow, Heading } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";

const ROWS_PER_GROUP = 3;
/** Seconds per tile — keeps every row moving at the same visual speed. */
const SECONDS_PER_TILE = 3.2;

/**
 * About §12 — Clients & Partners. Two categories mirroring the company profile
 * (Government & Semi-Government, Private Sector), each shown as three
 * auto-scrolling rows of logo tiles; neighbouring rows run in opposite
 * directions and a row pauses on hover. Names render as placeholder marks
 * pending brand-approved logos — swap the tile's <span> for an <img> then.
 */
export function Partners() {
  const t = useTranslations("AboutPage.partners");
  const government = t.raw("government") as string[];
  const priv = t.raw("private") as string[];

  return (
    <Section surface="mist-50" id="partners" className="overflow-hidden">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="brand">{t("eyebrow")}</Eyebrow>
          <Heading as="h2" size="h2" className="mt-6 text-slate-900">
            {t("title")}
          </Heading>
          <p className="mt-6 text-body-lg text-slate-600">{t("note")}</p>
        </Reveal>
      </Container>

      <div className="mt-14 space-y-14 lg:mt-16">
        <Group label={t("govLabel")} names={government} />
        <Group label={t("privateLabel")} names={priv} />
      </div>
    </Section>
  );
}

/** Split a list into `n` contiguous, near-equal rows. */
function toRows(names: string[], n: number): string[][] {
  const size = Math.ceil(names.length / n);
  return Array.from({ length: n }, (_, i) => names.slice(i * size, (i + 1) * size)).filter(
    (row) => row.length > 0,
  );
}

function Group({ label, names }: { label: string; names: string[] }) {
  const rows = toRows(names, ROWS_PER_GROUP);
  return (
    <div>
      <Container>
        <div className="mb-6 flex items-center gap-4">
          <h3 className="font-display text-eyebrow uppercase text-brand-600">{label}</h3>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>
      </Container>

      <div className="space-y-3">
        {rows.map((row, i) => (
          <MarqueeRow key={i} names={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

function MarqueeRow({ names, reverse }: { names: string[]; reverse: boolean }) {
  // Short rows are repeated so one copy is always wider than the viewport.
  const base = names.length < 12 ? [...names, ...names] : names;
  return (
    <div className="logo-marquee relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-mist-50 to-transparent sm:w-32 rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-mist-50 to-transparent sm:w-32 rtl:bg-gradient-to-r" />

      <ul
        className="logo-marquee-track flex w-max"
        data-reverse={reverse}
        style={{ "--marquee-duration": `${base.length * SECONDS_PER_TILE}s` } as React.CSSProperties}
      >
        {base.map((name, i) => (
          <Tile key={`a-${i}`} name={name} hidden={i >= names.length} />
        ))}
        {base.map((name, i) => (
          <Tile key={`b-${i}`} name={name} hidden />
        ))}
      </ul>
    </div>
  );
}

function Tile({ name, hidden = false }: { name: string; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden || undefined} className="shrink-0 pe-3">
      <div className="group/mark flex h-20 w-48 items-center justify-center rounded-card border border-line bg-white px-4 text-center transition-colors duration-300 hover:border-brand-500/40 sm:w-56">
        <span className="font-display text-small font-medium leading-tight text-slate-900/45 transition-colors duration-300 group-hover/mark:text-brand-600 md:text-body">
          {name}
        </span>
      </div>
    </li>
  );
}
