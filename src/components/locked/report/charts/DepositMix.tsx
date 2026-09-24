"use client";

import { useChartTooltip, tipHandlers } from "../ChartTooltip";
import { useChartWidth } from "../useChartWidth";
import type { ChartComponentProps } from "./types";

// Ported from CH.kt (scratchpad script2.js:455-461).
export function DepositMix({ strings, ariaLabel }: ChartComponentProps) {
  const { ref, width } = useChartWidth<HTMLDivElement>();
  const tip = useChartTooltip();
  const w = width || 320;
  const h = 96;
  const pw = w - 2;
  const cur = 0.61;

  return (
    <div className="chart" ref={ref} role="img" aria-label={ariaLabel}>
      {width > 0 && (
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
          <rect
            className="mk"
            x={0}
            y={18}
            width={pw * cur - 1}
            height={34}
            fill="var(--s-ozel)"
            data-tip={strings.ktCurTip}
            {...tipHandlers(tip, strings.ktCurTip)}
          />
          <rect
            className="mk"
            x={pw * cur + 1}
            y={18}
            width={pw * (1 - cur) - 1}
            height={34}
            fill="var(--mark-muted)"
            data-tip={strings.ktOtherTip}
            {...tipHandlers(tip, strings.ktOtherTip)}
          />
          <text className="val-strong" x={0} y={72}>
            {strings.ktCur}
          </text>
          <text className="val" x={w - 2} y={72} textAnchor="end">
            {strings.ktOther}
          </text>
        </svg>
      )}
    </div>
  );
}
