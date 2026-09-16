"use client";

import { useChartTooltip, tipHandlers } from "../ChartTooltip";
import { useChartWidth } from "../useChartWidth";
import { roundedRectPath, numberFormat, isNarrow } from "../chart-helpers";
import { SvgBankLogo } from "./SvgBankLogo";
import type { Locale } from "@/types/content";

export interface HBarRow {
  label: string;
  slug?: string | null;
  v: number;
  vl: string;
  hl?: boolean;
  dash?: boolean;
  color: string;
  tip: string;
}

export interface HBarsOptions {
  max: number;
  ticks?: number[];
  tickFmt?: (v: number) => string;
  labelMax?: number;
  valW?: number;
  bh?: number;
  gap?: number;
  top?: number;
  locale: Locale;
  ariaLabel?: string;
}

// Ported from the reference's hbars() (scratchpad script2.js:318-342).
export function HBars({ rows, ...o }: { rows: HBarRow[] } & HBarsOptions) {
  const { ref, width } = useChartWidth<HTMLDivElement>();
  const tip = useChartTooltip();
  const w = width || 320;
  const narrow = isNarrow(w);

  const hasLogo = rows.some((r) => r.slug !== undefined);
  const labelW = Math.min(o.labelMax ?? 180, Math.round(w * (narrow ? 0.4 : 0.28)));
  const valW = o.valW ?? 70;
  const bh = o.bh ?? 18;
  const gap = o.gap ?? 12;
  const top = o.top ?? 22;
  const plotW = w - labelW - valW - 8;
  const h = top + rows.length * (bh + gap) + 4;
  const x = (v: number) => labelW + (v / o.max) * plotW;
  const textEnd = hasLogo ? labelW - 28 : labelW - 10;

  return (
    <div className="chart" ref={ref} role="img" aria-label={o.ariaLabel}>
      {width > 0 && (
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
          {(o.ticks ?? []).map((t) => (
            <g key={t}>
              <line className="grid" x1={x(t)} x2={x(t)} y1={top - 6} y2={h - 4} />
              <text className="axis-t" x={x(t)} y={top - 10} textAnchor="middle">
                {o.tickFmt ? o.tickFmt(t) : numberFormat(o.locale, t)}
              </text>
            </g>
          ))}
          <line className="base" x1={labelW} x2={labelW} y1={top - 6} y2={h - 4} />
          {rows.map((r, i) => {
            const y = top + i * (bh + gap) + gap / 2;
            const cy = y + bh / 2;
            const bw = Math.max(2, x(r.v) - labelW);
            return (
              <g key={r.label}>
                <text
                  className="lbl"
                  x={textEnd}
                  y={cy + 4.5}
                  textAnchor="end"
                  style={{ fontSize: narrow ? 12 : undefined, fontWeight: r.hl ? 600 : undefined, fill: r.hl ? "var(--heading)" : undefined }}
                >
                  {r.label}
                </text>
                {hasLogo && r.slug && <SvgBankLogo slug={r.slug} cx={labelW - 15} cy={cy} r={8} />}
                <path
                  className="mk"
                  d={roundedRectPath(labelW + 1, y, bw - 1, bh, 4, "right")}
                  fill={r.color}
                  fillOpacity={r.dash ? 0.35 : undefined}
                  stroke={r.dash ? r.color : undefined}
                  strokeDasharray={r.dash ? "3 2" : undefined}
                  data-tip={r.tip}
                  {...tipHandlers(tip, r.tip)}
                />
                <text className={r.hl ? "val-strong" : "val"} x={labelW + bw + 8} y={cy + 4.5}>
                  {r.vl}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
