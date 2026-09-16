"use client";

import { VBars } from "./VBars";
import { numberFormat } from "../chart-helpers";
import type { ChartComponentProps } from "./types";

// Ported from CH.tfs (scratchpad script2.js:462-465).
export function SavingsFinanceBars({ locale, strings, ariaLabel }: ChartComponentProps) {
  const vals = [140, 550, 1337, 1549];
  const rows = vals.map((v, i) => {
    const vl = (i === 1 ? "~" : "") + numberFormat(locale, v);
    return {
      label: strings.tfs[i],
      v,
      vl,
      hl: i === 3,
      color: "var(--s-ozel)",
      tip: `<b>${strings.tfs[i]}</b><span class="m">${vl}</span> ${strings.tfsUnit}`,
    };
  });
  return <VBars rows={rows} max={1800} ticks={[0, 600, 1200, 1800]} locale={locale} ariaLabel={ariaLabel} />;
}
