"use client";

import { useLastDayCalls } from "@/hooks/useLastDayCalls";
import type { LastDayBlock, LastDayMechanicLabels } from "@/types/content";

interface ScorecardProps {
  blocks: LastDayBlock[];
  labels: LastDayMechanicLabels;
}

/**
 * Reader'ın kendi seçimleri, kayda karşı — sadece reader hakkında,
 * subject hakkında DEĞİL (bkz. build prompt Part 0 kural 2: "Never
 * score, rate, grade or rank the subject"). Hiçbir şey sunucuya
 * gönderilmez, sadece localStorage'daki mevcut oturumun özeti.
 */
export default function Scorecard({ blocks, labels }: ScorecardProps) {
  const { calls } = useLastDayCalls();
  const callBlocks = blocks.filter((block): block is Extract<LastDayBlock, { kind: "call" }> =>
    block.kind === "call",
  );

  if (callBlocks.length === 0) return null;

  let matched = 0;
  let diverged = 0;
  let unsettled = 0;
  let pending = 0;

  for (const call of callBlocks) {
    const chosen = calls[call.id];
    if (!chosen) {
      pending += 1;
    } else if (call.answer === "unsettled") {
      unsettled += 1;
    } else if (chosen === call.answer) {
      matched += 1;
    } else {
      diverged += 1;
    }
  }

  const rows = [
    { label: labels.scorecardMatched, count: matched },
    { label: labels.scorecardDiverged, count: diverged },
    { label: labels.scorecardUnsettled, count: unsettled },
    { label: labels.scorecardPending, count: pending },
  ].filter((row) => row.count > 0);

  return (
    <div className="border border-navy/20 bg-navy/[0.03] p-8">
      <h3 className="mb-5 font-display text-[1.3rem] font-medium text-charcoal">
        {labels.scorecardHeading}
      </h3>
      <dl className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-[0.95rem] text-charcoal/80">{row.label}</dt>
            <dd className="font-mono text-lg text-navy">{row.count}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
