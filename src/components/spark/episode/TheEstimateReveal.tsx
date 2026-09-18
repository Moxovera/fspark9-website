"use client";

import { dayNumberLabel } from "@/components/spark/day/dayMath";
import RevealItem from "@/components/spark/episode/RevealItem";
import { useLastDayState } from "@/hooks/useLastDayState";
import type { SparkEstimateBlock, SparkEstimateRevealBlock, SparkMechanicVocabulary } from "@/types/content";

interface TheEstimateRevealProps {
  block: SparkEstimateRevealBlock;
  estimate: SparkEstimateBlock | undefined;
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * THE ESTIMATE'in geciken çözümü. Karşılaştırma HER ZAMAN bracket'ın
 * min/max sayısal sınırlarından yapılır, hiçbir zaman label metninden
 * (bkz. sparkEpisodeBlocks.ts yorumu) — dile bağlı bir string
 * karşılaştırması kırılgan olurdu. "geçti/kaldı" kelimesi YOK, final
 * interaction brief §6: "Never a word like wrong, never a tick or a
 * cross."
 */
export default function TheEstimateReveal({ block, estimate, launchDate, dayLabel, vocabulary }: TheEstimateRevealProps) {
  const state = useLastDayState();
  if (state.ledger) return null;

  const day = dayNumberLabel(block.date, launchDate);
  const pickedIndex = estimate ? state.estimates[estimate.blockId] : undefined;
  const pickedBracket =
    estimate && pickedIndex !== undefined ? estimate.brackets[Number(pickedIndex)] : undefined;

  let comparisonLabel: string | null = null;
  if (pickedBracket) {
    if (block.actualValue >= pickedBracket.min && (pickedBracket.max === null || block.actualValue <= pickedBracket.max)) {
      comparisonLabel = block.insideBracketLabel;
    } else if (block.actualValue < pickedBracket.min) {
      comparisonLabel = block.belowBracketLabel;
    } else {
      comparisonLabel = block.aboveBracketLabel;
    }
  }

  return (
    <div className="scroll-mt-32 border-l-[3px] border-bronze/60 py-2 pl-6" data-spark-day={day}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
        <span>{dayLabel} {day}</span>
        <span>{vocabulary.estimateLabel}</span>
      </div>

      {comparisonLabel && (
        <p className="mb-4 text-[1.05rem] font-medium text-charcoal">
          {comparisonLabel} <span className="font-mono text-muted">({block.actualLabel})</span>
        </p>
      )}

      <RevealItem
        item={{ _type: "sparkInlineReading", ...block.derivedReading }}
        readingLabel={vocabulary.readingLabel}
        gapLabel={vocabulary.gapLabel}
      />
    </div>
  );
}
