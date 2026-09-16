"use client";

import { VBars } from "./VBars";
import { numberFormat } from "../chart-helpers";
import type { ChartComponentProps } from "./types";

// Ported from CH.growth (scratchpad script2.js:364-367).
export function AssetGrowthBars({ locale, strings, ariaLabel }: ChartComponentProps) {
  const vals = [2.6, 4.3, 4.7, 4.92];
  const rows = vals.map((v, i) => {
    const decimals = v === 4.92 ? 2 : 1;
    const vl = numberFormat(locale, v, decimals);
    return {
      label: strings.growth[i],
      v,
      vl,
      hl: i === 3,
      color: "var(--s-ozel)",
      tip: `<b>${strings.growth[i]}</b><span class="m">${vl} ${strings.trn}</span>`,
    };
  });
  return <VBars rows={rows} max={6} ticks={[0, 2, 4, 6]} locale={locale} ariaLabel={ariaLabel} />;
}
