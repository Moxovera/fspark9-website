"use client";

import { HBars } from "./HBars";
import { percentFormat } from "../chart-helpers";
import type { ChartComponentProps } from "./types";

// Ported from CH.shareSteps (scratchpad script2.js:368-371). The target
// meter above this chart (9.33% today vs 15% target) is a separate,
// mostly-static block — see Meter.tsx, rendered by FigureBlockRenderer.
export function ShareStepsChart({ locale, strings, ariaLabel }: ChartComponentProps) {
  const vals = [8.14, 9.2, 9.5, 15];
  const decimals = [2, 1, 1, 0];
  const rows = vals.map((v, i) => {
    const vl = percentFormat(locale, v, decimals[i]);
    return {
      label: strings.shareSteps[i],
      v,
      vl,
      color: i === 3 ? "var(--bronze)" : "var(--s-ozel)",
      dash: i === 3,
      tip: `<b>${strings.shareSteps[i]}</b><span class="m">${vl}</span>`,
    };
  });
  return <HBars rows={rows} max={15} bh={14} gap={12} top={8} valW={58} locale={locale} ariaLabel={ariaLabel} />;
}
