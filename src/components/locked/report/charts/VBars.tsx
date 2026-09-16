"use client";

import { useChartTooltip, tipHandlers } from "../ChartTooltip";
import { useChartWidth } from "../useChartWidth";
import { roundedRectPath, numberFormat } from "../chart-helpers";
import type { Locale } from "@/types/content";

export interface VBarRow {
  label: string;
  v: number;
  vl: string;
  hl?: boolean;
  color: string;
  tip: string;
}

// Ported from the reference's vbars() (scratchpad script2.js:344-360).
export function VBars({
  rows,
  max,
  ticks = [],
  h = 250,
  locale,
  ariaLabel,
}: {
  rows: VBarRow[];
  max: number;
  ticks?: number[];
  h?: number;
  locale: Locale;
  ariaLabel?: string;
}) {
  const { ref, width } = useChartWidth<HTMLDivElement>();
  const tip = useChartTooltip();
  const w = width || 320;

  const L = 8;
  const R = 8;
  const T = 26;
  const B = 44;
  const pw = w - L - R;
  const ph = h - T - B;
  const n = rows.length;
  const slot = pw / n;
  const bw = Math.min(64, slot * 0.56);
  const y = (v: number) => T + ph - (v / max) * ph;

  return (
    <div className="chart" ref={ref} role="img" aria-label={ariaLabel}>
      {width > 0 && (
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
          {ticks.map((t) => (
            <g key={t}>
              <line className="grid" x1={L} x2={w - R} y1={y(t)} y2={y(t)} />
              <text className="axis-t" x={L} y={y(t) - 4}>
                {numberFormat(locale, t)}
              </text>
            </g>
          ))}
          <line className="base" x1={L} x2={w - R} y1={T + ph} y2={T + ph} />
          {rows.map((r, i) => {
            const cx = L + slot * i + slot / 2;
            const bx = cx - bw / 2;
            const by = y(r.v);
            return (
              <g key={r.label}>
                <path
                  className="mk"
                  d={roundedRectPath(bx, by, bw, T + ph - by, 4, "top")}
                  fill={r.color}
                  data-tip={r.tip}
                  {...tipHandlers(tip, r.tip)}
                />
                <text className={r.hl ? "val-strong" : "val"} x={cx} y={by - 8} textAnchor="middle">
                  {r.vl}
                </text>
                <text className="axis-t" x={cx} y={T + ph + 18} textAnchor="middle">
                  {r.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
