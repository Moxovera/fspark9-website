"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { formatNumber } from "@/lib/poolMath";
import { ReportRefs } from "@/components/spark/report/ReportParts";
import type { TrendChartProps } from "@/types/content";

const W = 640;
const H = 300;
const PAD_L = 8;
const PAD_B = 34;
const PAD_T = 30;

/**
 * Bundesbank yıl sonu serisi: sözleşme sayısı ya da toplam hedef tutar
 * (prototip drawTrend). Çubuklar görününce alttan büyür, metrik değişince
 * 480ms ile yeni yüksekliğe geçer. 2024 bu seride yok, 2025'in solunda
 * kesikli çizgi var.
 */
export default function TrendChart({ content, locale, footnoteTemplate }: TrendChartProps) {
  const [metricKey, setMetricKey] = useState<"contracts" | "sum">("contracts");
  const ref = useReveal<HTMLDivElement>();
  const metric = content.metrics.find((m) => m.key === metricKey) ?? content.metrics[0];
  const values = content[metric.key];
  const slot = (W - PAD_L * 2) / values.length;
  const barWidth = slot * 0.56;
  const max = Math.max(...values) * 1.08;

  return (
    <div>
      <div role="group" className="inline-flex flex-wrap border-[1.5px] border-ink">
        {content.metrics.map((m, i) => (
          <button
            key={m.key}
            type="button"
            aria-pressed={m.key === metricKey}
            onClick={() => setMetricKey(m.key)}
            className={`min-h-11 cursor-pointer px-[18px] font-mono text-[12px] tracking-[0.08em] uppercase transition-colors duration-[160ms] ease-brand ${
              i > 0 ? "border-l-[1.5px] border-ink" : ""
            } ${m.key === metricKey ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-rule"}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div ref={ref} className="reveal mt-4 border-t-2 border-ink pt-4">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" className="block h-auto w-full">
          <title>{metric.title}</title>
          <line x1="0" y1={H - PAD_B} x2={W} y2={H - PAD_B} className="stroke-ink" strokeWidth="1.5" />
          {values.map((value, i) => {
            const x = PAD_L + i * slot + (slot - barWidth) / 2;
            const height = (value / max) * (H - PAD_B - PAD_T);
            const y = H - PAD_B - height;
            const year = content.years[i];
            const label = metric.valueTemplate.replace("{n}", formatNumber(locale, value, metric.decimals));
            return (
              <g key={year}>
                {year === "2025" && (
                  <line
                    x1={x - slot * 0.3}
                    y1={PAD_T}
                    x2={x - slot * 0.3}
                    y2={H - PAD_B}
                    className="stroke-rule"
                    fill="none"
                    strokeDasharray="3 4"
                  />
                )}
                <rect className="trend-bar fill-ink" x={x} width={barWidth} y={y} height={height} />
                <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" className="fill-ink font-display text-[13px] font-bold">
                  {label}
                </text>
                <text x={x + barWidth / 2} y={H - 12} textAnchor="middle" className="fill-stone font-mono text-[11px] tracking-[0.04em]">
                  {year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-2.5 mb-0 text-[14px] text-stone">
        <ReportRefs text={content.caption} template={footnoteTemplate} />
      </p>
    </div>
  );
}
