"use client";

import { useChartTooltip, tipHandlers } from "../ChartTooltip";
import { useChartWidth } from "../useChartWidth";
import { isNarrow, percentFormat } from "../chart-helpers";
import { SvgBankLogo } from "./SvgBankLogo";
import { GRP } from "@/content/locked/fuzul/data";
import type { ChartComponentProps } from "./types";

// Ported from CH.rates (scratchpad script2.js:435-454).
export function ProfitShareDots({ locale, strings, rates, ariaLabel }: ChartComponentProps) {
  const { ref, width } = useChartWidth<HTMLDivElement>();
  const tip = useChartTooltip();
  const w = width || 320;
  const narrow = isNarrow(w);

  const labelW = Math.min(170, Math.round(w * (narrow ? 0.4 : 0.24)));
  const R = 62;
  const TT = 26;
  const rowH = 30;
  const h = TT + rates.length * rowH + 12;
  const X = (v: number) => labelW + ((v - 25) / 15) * (w - labelW - R);

  return (
    <div className="chart" ref={ref} role="img" aria-label={ariaLabel}>
      {width > 0 && (
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
          {[25, 30, 35, 40].map((v) => (
            <g key={v}>
              <line className="grid" x1={X(v)} x2={X(v)} y1={TT - 6} y2={h - 6} />
              <text className="axis-t" x={X(v)} y={TT - 12} textAnchor="middle">
                {percentFormat(locale, v)}
              </text>
            </g>
          ))}
          <line x1={X(37)} x2={X(37)} y1={TT - 6} y2={h - 6} stroke="var(--bronze)" strokeWidth={1.2} strokeDasharray="4 3" />
          <text className="axis-t" x={X(37) - 5} y={h - 10} textAnchor="end" style={{ fill: "var(--bronze-ink)" }}>
            {strings.policy}
          </text>
          {rates.map((d, i) => {
            const y = TT + i * rowH + rowH / 2;
            const vl = percentFormat(locale, d.value, 2);
            const rowTip = `<b>${d.name}</b>${strings.grp[d.grp]}<br><span class="m">${vl}</span> ${strings.rateTip}`;
            return (
              <g key={d.name}>
                <text className="lbl" x={labelW - 28} y={y + 4.5} textAnchor="end" style={{ fontSize: narrow ? 12 : undefined }}>
                  {d.name}
                </text>
                <SvgBankLogo slug={d.slug} cx={labelW - 15} cy={y} r={8} />
                <line x1={X(25)} x2={X(d.value)} y1={y} y2={y} stroke="var(--rule)" />
                <circle
                  className="mk"
                  cx={X(d.value)}
                  cy={y}
                  r={7}
                  fill={GRP[d.grp]}
                  stroke="var(--surface)"
                  strokeWidth={2}
                  data-tip={rowTip}
                  {...tipHandlers(tip, rowTip)}
                />
                <text className="val" x={X(d.value) + 13} y={y + 4}>
                  {vl}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
