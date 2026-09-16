"use client";

import { HBars } from "./HBars";
import { numberFormat } from "../chart-helpers";
import type { ChartComponentProps } from "./types";

// Ported from CH.capital (scratchpad script2.js:424-427).
export function CapitalBars({ locale, strings, ariaLabel }: ChartComponentProps) {
  const vals = [13.2, 11.5, 10, 7.27, 3, 1.5, 1.5];
  const decimals = (v: number) => (v === 7.27 ? 2 : v % 1 ? 1 : 0);
  const rows = vals.map((v, i) => {
    const c = strings.capital[i];
    const vl = numberFormat(locale, v, decimals(v));
    return {
      label: c.name,
      slug: c.slug,
      v,
      vl,
      hl: i === 0,
      dash: i === 3,
      color: i === 0 ? "var(--bronze)" : "var(--mark-muted)",
      tip: `<b>${c.name}</b><span class="m">${vl} ${strings.bn}</span><br>${c.caption}`,
    };
  });
  return <HBars rows={rows} max={15} ticks={[0, 5, 10, 15]} bh={18} gap={12} valW={48} locale={locale} ariaLabel={ariaLabel} />;
}
