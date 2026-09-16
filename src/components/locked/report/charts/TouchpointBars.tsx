"use client";

import { HBars } from "./HBars";
import type { ChartComponentProps } from "./types";

// Ported from CH.points (scratchpad script2.js:429-434). Row 4 (Fuzul) is
// the only one ever highlighted in the reference regardless of the ozel/
// kamu/yeni grouping, so that's hardcoded here rather than threaded
// through content.
const FUZUL_INDEX = 4;

export function TouchpointBars({ locale, strings, ariaLabel }: ChartComponentProps) {
  const vals = [13500, 12751, 453, 452, 256, 224, 223, 122, 28];
  const rows = vals.map((v, i) => {
    const p = strings.points[i];
    const hl = i === FUZUL_INDEX;
    return {
      label: p.name,
      slug: p.slug,
      v,
      vl: p.value,
      hl,
      color: hl ? "var(--bronze)" : "var(--mark-muted)",
      tip: `<b>${p.name}</b><span class="m">${p.value}</span><br>${p.caption}`,
    };
  });
  return <HBars rows={rows} max={14000} ticks={[0, 5000, 10000]} bh={15} gap={9} valW={64} locale={locale} ariaLabel={ariaLabel} />;
}
