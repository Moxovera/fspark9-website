"use client";

import { useChartTooltip, tipHandlers } from "../ChartTooltip";
import { useChartWidth } from "../useChartWidth";
import { isNarrow } from "../chart-helpers";
import { GRP } from "@/content/locked/fuzul/data";
import type { ChartComponentProps } from "./types";

// Point coordinates/groups are fixed layout, not translatable — only the
// tooltip text and (for "Kamu birleşik") the display name come from
// strings.map. Ported from CH.map (scratchpad script2.js:470-506).
const POINTS = [
  { key: "TOM", x: 1.8, y: 8.4, g: "yeni" as const, a: "start" as const },
  { key: "Dost", x: 2.6, y: 7.3, g: "yeni" as const, dashed: true, a: "start" as const },
  { key: "Adil", x: 2.6, y: 1.2, g: "yeni" as const, a: "start" as const },
  { key: "Hayat Finans", x: 4.4, y: 2.0, g: "yeni" as const, a: "start" as const },
  { key: "Dünya Katılım", x: 5.4, y: 4.2, g: "yeni" as const, a: "start" as const },
  { key: "Kuveyt Türk", x: 5.8, y: 8.2, g: "ozel" as const, a: "end" as const },
  { key: "Kamu birleşik", x: 5.2, y: 9.3, g: "kamu" as const, a: "end" as const },
  { key: "Emlak Katılım", x: 7.8, y: 6.6, g: "kamu" as const, a: "end" as const },
  { key: "Fuzul Katılım", x: 9.0, y: 7.6, g: "fz" as const, a: "end" as const },
];

export function PositioningMap({ strings, ariaLabel }: ChartComponentProps) {
  const { ref, width } = useChartWidth<HTMLDivElement>();
  const tip = useChartTooltip();
  const w = width || 320;
  const narrow = isNarrow(w);
  const m = strings.map;

  const h = narrow ? 400 : 460;
  const L = narrow ? 22 : 34;
  const R = 14;
  const TT = 16;
  const B = narrow ? 40 : 44;
  const pw = w - L - R;
  const ph = h - TT - B;
  const X = (v: number) => L + (v / 10) * pw;
  const Y = (v: number) => TT + ((10 - v) / 10) * ph;

  return (
    <div className="chart" ref={ref} role="img" aria-label={ariaLabel}>
      {width > 0 && (
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
          <rect x={X(6.6)} y={Y(10)} width={X(10) - X(6.6)} height={Y(5.2) - Y(10)} fill="var(--zone)" />
          <text
            x={X(10) - 10}
            y={Y(10) + 22}
            textAnchor="end"
            style={{ fontFamily: "var(--f-display)", fontWeight: 700, letterSpacing: "-0.01em", fontSize: narrow ? 14 : 17, fill: "var(--bronze-ink)" }}
          >
            {m.zone}
          </text>
          <line className="grid" x1={X(5)} x2={X(5)} y1={TT} y2={TT + ph} />
          <line className="grid" x1={L} x2={w - R} y1={Y(5)} y2={Y(5)} />
          <rect x={L} y={TT} width={pw} height={ph} fill="none" stroke="var(--rule-strong)" />
          <text className="axis-t" x={L} y={h - B + 18}>
            {m.xl}
          </text>
          <text className="axis-t" x={w - R} y={h - B + 18} textAnchor="end">
            {m.xr}
          </text>
          <text className="axis-t" x={L + pw / 2} y={h - 6} textAnchor="middle">
            {m.x}
          </text>
          <text className="axis-t" transform={`translate(${L - 10},${TT + ph}) rotate(-90)`}>
            {m.yb}
          </text>
          <text className="axis-t" transform={`translate(${L - 10},${TT}) rotate(-90)`} textAnchor="end">
            {m.yt}
          </text>
          {POINTS.map((p) => {
            const cx = X(p.x);
            const cy = Y(p.y);
            const fz = p.g === "fz";
            const col = fz ? "var(--bronze)" : GRP[p.g];
            const r = fz ? 11 : 8;
            const name = m.names[p.key] || p.key;
            const rowTip = `<b>${name}</b>${m.pts[p.key]}`;
            const dx = p.a === "end" ? -(r + 8) : r + 8;
            return (
              <g key={p.key}>
                <circle
                  className="mk"
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={p.dashed ? "var(--surface)" : col}
                  stroke={p.dashed ? col : "var(--surface)"}
                  strokeWidth={2}
                  strokeDasharray={p.dashed ? "3 2" : undefined}
                  data-tip={rowTip}
                  {...tipHandlers(tip, rowTip)}
                />
                {fz && <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="var(--bronze)" />}
                <text
                  className="lbl"
                  x={cx + dx}
                  y={cy + 4.5}
                  textAnchor={p.a}
                  style={{ fontSize: narrow ? 11.5 : 13, fontWeight: fz ? 600 : undefined, fill: fz ? "var(--heading)" : undefined }}
                  pointerEvents="none"
                >
                  {name}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
