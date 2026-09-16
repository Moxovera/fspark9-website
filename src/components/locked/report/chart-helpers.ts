// Shared helpers for the chart components under charts/*.tsx. Ported from
// fuzul-report-standalone.html's rrect()/W()/isNarrow() (see
// scratchpad script2.js:301-308 during extraction) — same formulas,
// translated from SVG-string building into plain geometry helpers that
// JSX callers turn into <path>/<text> elements.
import type { Locale } from "@/types/content";

export function roundedRectPath(x: number, y: number, w: number, h: number, r: number, side: "left" | "right" | "top") {
  w = Math.max(0, w);
  h = Math.max(0, h);
  r = Math.min(r, side === "right" || side === "left" ? Math.min(w / 2, h / 2) : Math.min(w / 2, h / 2));
  if (side === "right") {
    return `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`;
  }
  if (side === "top") {
    return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
  }
  // left (not used by the reference, kept for completeness)
  return `M${x + w},${y}H${x + r}Q${x},${y} ${x},${y + r}V${y + h - r}Q${x},${y + h} ${x + r},${y + h}H${x + w}Z`;
}

export const MIN_CHART_WIDTH = 280;
export const NARROW_BREAKPOINT = 520;

export function isNarrow(width: number) {
  return width < NARROW_BREAKPOINT;
}

export function numberFormat(locale: Locale, value: number, decimals = 0) {
  return value.toLocaleString(locale === "tr" ? "tr-TR" : "en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function percentFormat(locale: Locale, value: number, decimals = 0) {
  const n = numberFormat(locale, value, decimals);
  return locale === "tr" ? `%${n}` : `${n}%`;
}
