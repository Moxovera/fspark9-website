"use client";

import { useChartTooltip, tipHandlers } from "../ChartTooltip";
import { useChartWidth } from "../useChartWidth";
import { isNarrow, numberFormat, percentFormat } from "../chart-helpers";
import { GRP } from "@/content/locked/fuzul/data";
import type { ChartComponentProps } from "./types";

const KEEP_ON_NARROW = new Set(["dunya-katilim", "hayat-finans", "tom-katilim", "kuveyt-turk"]);

// Ported from CH.bubble (scratchpad script2.js:387-423). Log x axis
// (assets), y axis is profit/assets, bubble radius encodes YTD growth.
export function ProfitBubble({ locale, strings, banks, ariaLabel }: ChartComponentProps) {
  const { ref, width } = useChartWidth<HTMLDivElement>();
  const tip = useChartTooltip();
  const w = width || 320;
  const narrow = isNarrow(w);

  const h = narrow ? 380 : 440;
  const L = narrow ? 44 : 56;
  const R = narrow ? 20 : 40;
  const TT = 24;
  const B = 48;
  const pw = w - L - R;
  const ph = h - TT - B;
  const lx0 = Math.log10(20);
  const lx1 = Math.log10(2500);
  const X = (v: number) => L + ((Math.log10(v) - lx0) / (lx1 - lx0)) * pw;
  const Y = (v: number) => TT + ((3 - v) / 6.5) * ph;
  const radius = (g: number) => (narrow ? 4 : 5) + Math.sqrt(g) * (narrow ? 1.6 : 2.2);

  const sortedByGrowth = [...banks].sort((a, b) => b.g - a.g);

  return (
    <div className="chart" ref={ref} role="img" aria-label={ariaLabel}>
      {width > 0 && (
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
          {[-3, -2, -1, 0, 1, 2, 3].map((v) => (
            <g key={v}>
              <line className="grid" x1={L} x2={w - R} y1={Y(v)} y2={Y(v)} style={v === 0 ? { stroke: "var(--rule-strong)" } : undefined} />
              <text className="axis-t" x={L - 8} y={Y(v) + 4} textAnchor="end">
                {percentFormat(locale, v)}
              </text>
            </g>
          ))}
          {[25, 50, 100, 250, 500, 1000, 2000]
            .filter((v) => !(narrow && (v === 25 || v === 250 || v === 2000)))
            .map((v) => (
              <g key={v}>
                <line className="grid" x1={X(v)} x2={X(v)} y1={TT} y2={TT + ph} />
                <text className="axis-t" x={X(v)} y={TT + ph + 18} textAnchor="middle">
                  {numberFormat(locale, v)}
                </text>
              </g>
            ))}
          <text className="axis-t" x={L + pw / 2} y={h - 6} textAnchor="middle">
            {strings.axAssets}
          </text>
          <text className="axis-t" x={L} y={TT - 10}>
            {strings.axRoa}
          </text>
          {sortedByGrowth.map((b) => {
            const tp = `<b>${b.n}</b>${strings.grp[b.grp]}<br>${strings.tipAssets} <span class="m">${numberFormat(locale, b.a, b.a % 1 ? 1 : 0)} ${strings.bn}</span><br>${strings.tipRoa} <span class="m">${percentFormat(locale, b.roa, 2)}</span><br>${strings.tipGrowth} <span class="m">${percentFormat(locale, b.g, 1)}</span>${b.emlak ? `<br><span style="opacity:.75">${strings.emlakNote}</span>` : ""}`;
            return (
              <circle
                key={b.slug}
                className="mk"
                cx={X(b.a)}
                cy={Y(b.roa)}
                r={radius(b.g)}
                fill={GRP[b.grp]}
                fillOpacity={0.82}
                stroke="var(--surface)"
                strokeWidth={2}
                data-tip={tp}
                {...tipHandlers(tip, tp)}
              />
            );
          })}
          {banks
            .filter((b) => !(narrow && !KEEP_ON_NARROW.has(b.slug)))
            .map((b) => {
              const cx = X(b.a);
              const cy = Y(b.roa);
              const r = radius(b.g);
              let anchor: "start" | "middle" | "end" = b.anchor;
              let dx = 0;
              let dy = 5;
              if (anchor === "start") dx = r + 6;
              if (anchor === "end") dx = -(r + 6);
              if (anchor === "middle") dy = b.up ? -(r + 8) : r + 16;
              if (narrow && b.slug === "kuveyt-turk") {
                anchor = "end";
                dy = -(r + 8);
                dx = r;
              }
              const strong = b.slug === "dunya-katilim";
              return (
                <text
                  key={b.slug}
                  className="lbl"
                  x={cx + dx}
                  y={cy + dy}
                  textAnchor={anchor}
                  style={{ fontSize: narrow ? 11.5 : 13, fontWeight: strong ? 600 : undefined, fill: strong ? "var(--heading)" : undefined }}
                  pointerEvents="none"
                >
                  {b.n} <tspan className="val" style={{ fontSize: narrow ? 10.5 : 11.5, fill: "var(--muted)" }}>{percentFormat(locale, b.roa, 2)}</tspan>
                </text>
              );
            })}
        </svg>
      )}
    </div>
  );
}
