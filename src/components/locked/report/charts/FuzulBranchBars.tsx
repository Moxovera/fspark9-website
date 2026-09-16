"use client";

import { VBars } from "./VBars";
import { numberFormat } from "../chart-helpers";
import type { ChartComponentProps } from "./types";

// Ported from CH.fzbranch (scratchpad script2.js:466-469).
export function FuzulBranchBars({ locale, strings, ariaLabel }: ChartComponentProps) {
  const vals = [100, 125, 173, 256];
  const rows = vals.map((v, i) => {
    const vl = numberFormat(locale, v);
    return {
      label: strings.fzb[i],
      v,
      vl,
      hl: i === 3,
      color: i === 3 ? "var(--bronze)" : "var(--mark-muted)",
      tip: `<b>${strings.fzb[i]}</b><span class="m">${v}</span> ${strings.branches}`,
    };
  });
  return <VBars rows={rows} max={300} ticks={[0, 100, 200, 300]} locale={locale} ariaLabel={ariaLabel} />;
}
