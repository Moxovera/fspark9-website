import { formatShortDate } from "@/lib/format";
import type {
  Locale,
  PageSeoCopy,
  RadarBody,
  RadarCalcFormat,
  RadarData,
  RadarIssue,
  RadarSignal,
  RadarText,
  RadarValues,
  SparkEpisodeEntry,
  SparkRadarEpisode,
} from "@/types/content";

// On the Radar yardımcıları. Sunucu ve istemci aynı kodu kullanır: format
// sayfasındaki şekiller, bölümün panosu ve tam resim aynı kurala bakar.

/** Radarın eksenleri: başlangıç üstte, saat yönünde. Eşitlikte bu sıra kazanır. */
export const RADAR_SIGNALS: readonly RadarSignal[] = ["gelir", "urun", "dagitim", "insan", "teknoloji"];

/** Radardaki üç halka. */
export const RADAR_RINGS = [0.33, 0.66, 1] as const;

const round2 = (value: number) => Math.round(value * 100) / 100;

function emptyValues(): RadarValues {
  return { gelir: 0, urun: 0, dagitim: 0, insan: 0, teknoloji: 0 };
}

/**
 * Sinyal başına: kutuların `weight` toplamı artı hamlelerin `bonus`'u, en çok 1.
 * `filled` ve `answered` verilmezse hepsi sayılır (tam resim ve format
 * sayfası); verilirse sadece dolmuş kutular ve cevaplanmış hamleler (pano).
 */
export function radarValues(
  data: Pick<RadarData, "blocks" | "moves">,
  filled?: ReadonlySet<string>,
  answered?: ReadonlySet<string>,
): RadarValues {
  const values = emptyValues();
  for (const block of data.blocks) if (!filled || filled.has(block.id)) values[block.signal] += block.weight;
  for (const move of data.moves) {
    if (answered && !answered.has(move.id)) continue;
    for (const signal of RADAR_SIGNALS) values[signal] += move.bonus?.[signal] ?? 0;
  }
  for (const signal of RADAR_SIGNALS) values[signal] = Math.min(1, round2(values[signal]));
  return values;
}

/** En yüksek sinyal; eşitlikte eksen sırasındaki ilk. */
export function strongestSignal(values: RadarValues): RadarSignal {
  let best = RADAR_SIGNALS[0];
  for (const signal of RADAR_SIGNALS) if (values[signal] > values[best]) best = signal;
  return best;
}

/** En güçlü iki sinyal (sıralamada eşitlik eksen sırasıyla bozulur). */
export function strongestTwo(values: RadarValues): [RadarSignal, RadarSignal] {
  const sorted = [...RADAR_SIGNALS].sort((a, b) => values[b] - values[a]);
  return [sorted[0], sorted[1]];
}

/** Eksen `index`, yarıçapın `ratio` katında nokta. */
export function radarPoint(index: number, ratio: number, radius: number): [number, number] {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / RADAR_SIGNALS.length;
  return [Math.cos(angle) * radius * ratio, Math.sin(angle) * radius * ratio];
}

const fixed = (point: [number, number]) => point.map((n) => n.toFixed(1)).join(",");

/** Poligon noktaları; değer en az .04 (şekil tek noktaya çökmesin). */
export function radarPolygon(values: RadarValues, radius: number): string {
  return RADAR_SIGNALS.map((signal, i) => fixed(radarPoint(i, Math.max(0.04, values[signal]), radius))).join(" ");
}

export function radarRing(ratio: number, radius: number): string {
  return RADAR_SIGNALS.map((_, i) => fixed(radarPoint(i, ratio, radius))).join(" ");
}

/** Etiketin yeri: eksenin ucunun biraz dışı; üstte yukarı, altta aşağı, yanda ortalı. */
export function radarLabelPosition(index: number, radius: number): { x: number; y: number; anchor: "start" | "middle" | "end" } {
  const [x, y] = radarPoint(index, 1.2, radius);
  return {
    x,
    y: y + (y < -50 ? -4 : y > 50 ? 12 : 4),
    anchor: Math.abs(x) < 8 ? "middle" : x > 0 ? "start" : "end",
  };
}

// ─── Format sayfasının açılış radarı: her görünümde yeni, hiçbir yerde saklanmaz ───

export interface NetShape {
  /** Yılanın yolu (SVG path `d`). */
  snake: string
  /** Son şeklin noktaları. */
  shape: string
}

/**
 * Makul bir şirket şekli: her sinyal .45 ile .9 arası, biri .9 ve üstü,
 * bir diğeri .55 ve altı. Yılan merkezden başlar, 7 rastgele halka
 * noktasından geçer (art arda aynı eksen yok) ve şeklin ilk köşesinde biter.
 */
export function randomNet(radius: number, random: () => number = Math.random): NetShape {
  const between = (a: number, b: number) => a + random() * (b - a);
  const shape = RADAR_SIGNALS.map(() => between(0.45, 0.9));
  const high = Math.floor(random() * RADAR_SIGNALS.length);
  const low = (high + 1 + Math.floor(random() * (RADAR_SIGNALS.length - 1))) % RADAR_SIGNALS.length;
  shape[high] = between(0.9, 1);
  shape[low] = between(0.45, 0.55);

  const path: [number, number][] = [[0, 0]];
  let last = -1;
  for (let i = 0; i < 7; i++) {
    let axis: number;
    do axis = Math.floor(random() * RADAR_SIGNALS.length);
    while (axis === last);
    last = axis;
    path.push(radarPoint(axis, RADAR_RINGS[Math.floor(random() * RADAR_RINGS.length)], radius));
  }
  path.push(radarPoint(0, shape[0], radius));
  return {
    snake: path.map((p, k) => `${k ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" "),
    shape: shape.map((v, k) => fixed(radarPoint(k, v, radius))).join(" "),
  };
}

// ─── Hesap makinesi ───

/**
 * JSON'daki `expr` dizgelerini değerlendirir: sayılar, girdi adları, + - * / ve
 * parantez. `eval`/`Function` kullanılmaz (CSP).
 */
export function evaluateExpression(expr: string, vars: Record<string, number>): number {
  const tokens = expr.match(/\d+(?:\.\d+)?|[A-Za-z_]\w*|[()+\-*/]/g) ?? [];
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];

  function primary(): number {
    const token = next();
    if (token === undefined) throw new Error(`Unexpected end in "${expr}"`);
    if (token === "(") {
      const inner = sum();
      if (next() !== ")") throw new Error(`Missing ) in "${expr}"`);
      return inner;
    }
    if (token === "-") return -primary();
    if (token === "+") return primary();
    if (/^\d/.test(token)) return Number(token);
    if (token in vars) return vars[token];
    throw new Error(`Unknown name "${token}" in "${expr}"`);
  }
  function product(): number {
    let value = primary();
    while (peek() === "*" || peek() === "/") value = next() === "*" ? value * primary() : value / primary();
    return value;
  }
  function sum(): number {
    let value = product();
    while (peek() === "+" || peek() === "-") value = next() === "+" ? value + product() : value - product();
    return value;
  }

  const result = sum();
  if (pos !== tokens.length) throw new Error(`Unexpected "${peek()}" in "${expr}"`);
  return result;
}

/** Hesap makinesi değerlerinin biçimi: euro, yüzde, bir ondalık. */
export function formatCalc(value: number, format: RadarCalcFormat, locale: Locale): string {
  const intl = locale === "tr" ? "tr-TR" : "en-GB";
  const rounded = Math.round(value);
  const oneDecimal = (Math.round(value * 10) / 10).toLocaleString(intl);
  if (format === "eur") return locale === "tr" ? `${rounded.toLocaleString(intl)} euro` : `€${rounded.toLocaleString(intl)}`;
  if (format === "dec") return oneDecimal;
  if (format === "pct") return locale === "tr" ? `yüzde ${oneDecimal}` : `${oneDecimal}%`;
  return rounded.toLocaleString(intl);
}

// ─── Metin: **kalın** ve [n] / [n,m] kaynak işaretleri ───

export type RichToken =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "source"; n: string };

const RICH = /\*\*(.+?)\*\*|\[(\d+(?:\s*,\s*\d+)*)\]/g;

/** `**x**` kalın, `[3]` ve `[3,5]` kaynak numarası (ikincisi iki ayrı işaret). */
export function tokenizeRich(text: string): RichToken[] {
  const tokens: RichToken[] = [];
  let last = 0;
  for (const match of text.matchAll(RICH)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ type: "text", text: text.slice(last, index) });
    if (match[1] !== undefined) tokens.push({ type: "bold", text: match[1] });
    else
      match[2].split(",").forEach((n, k) => {
        if (k > 0) tokens.push({ type: "text", text: " " });
        tokens.push({ type: "source", n: n.trim() });
      });
    last = index + match[0].length;
  }
  if (last < text.length) tokens.push({ type: "text", text: text.slice(last) });
  return tokens;
}

// ─── Gövdeyi bir dile indirmek ───

/**
 * Sanity'deki (ve src/content/radar/*.json'daki) ham gövdeyi bir dile indirir.
 * Hem yükleyici hem de check:drift'in aynası bunu kullanır.
 */
export function toRadarEpisode(
  body: RadarBody,
  locale: Locale,
  doc: { number: number; subject: string; hook: string; seo: PageSeoCopy; country: string; addedAt: string },
): SparkRadarEpisode {
  const text: RadarText = locale === "tr" ? body.tr : body.en;
  const { blocks, order, guess, usecase, moves, compare } = body;
  return {
    ...doc,
    data: {
      blocks,
      order,
      guess,
      ...(usecase ? { usecase } : {}),
      moves,
      sources: body.sources.map((s) => ({ title: s.title[locale] || s.title.tr, url: s.url })),
      ...(compare ? { compare } : {}),
    },
    text,
  };
}

/** Format sayfasındaki satır: şekil bölümün kendi JSON'undan, en güçlü sinyal onun en yükseği. */
export function toRadarIssue(entry: Extract<SparkEpisodeEntry, { layout: "radar" }>, locale: Locale): RadarIssue {
  const { story } = entry;
  const values = radarValues(story.data);
  return {
    numberLabel: `Nº ${String(story.number).padStart(2, "0")}`,
    company: story.subject,
    place: story.text.place,
    country: story.country,
    headline: story.text.headline,
    hook: story.text.listHook,
    addedDate: formatShortDate(story.addedAt, locale),
    addedAt: story.addedAt,
    values,
    strongest: strongestSignal(values),
    href: {
      pathname: "/spark/[formatSlug]/[episodeSlug]",
      params: { formatSlug: entry.formatSlug, episodeSlug: entry.slug },
    },
  };
}
