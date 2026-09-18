"use client";

import { dayNumberLabel } from "@/components/spark/day/dayMath";
import RevealItem from "@/components/spark/episode/RevealItem";
import { setEstimateAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { SparkEstimateBlock, SparkMechanicVocabulary } from "@/types/content";

interface TheEstimateProps {
  block: SparkEstimateBlock;
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * Okuyucu bir bracket seçtiği anda karşılaştırma + türetilmiş reading
 * AYNI yerde açılır (18 Eylül 2026, kullanıcı talebi: "cevapları hemen
 * görsün... sonuna kadar beklemesine gerek yok") — artık ayrı, sayfa
 * sonuna kadar tutulan bir reveal bloğu yok. Karşılaştırma HER ZAMAN
 * bracket'ın min/max sayısal sınırlarından yapılır, hiçbir zaman dile
 * bağlı label metninden (bkz. sparkEpisodeBlocks.ts yorumu). "geçti/
 * kaldı" kelimesi YOK, final interaction brief §6: "Never a word like
 * wrong, never a tick or a cross."
 */
export default function TheEstimate({ block, launchDate, dayLabel, vocabulary }: TheEstimateProps) {
  const state = useLastDayState();

  const day = dayNumberLabel(block.date, launchDate);
  const pickedIndex = state.estimates[block.blockId];
  const pickedBracket = pickedIndex !== undefined ? block.brackets[Number(pickedIndex)] : undefined;

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

      <fieldset className="border-0 p-0">
        <legend className="mb-4 max-w-[62ch] text-[1.05rem] leading-[1.6] font-medium text-charcoal">
          {block.prompt}
        </legend>
        <div className="flex flex-wrap gap-3" role="radiogroup">
          {block.brackets.map((bracket, index) => {
            const indexKey = String(index);
            const isSelected = pickedIndex === indexKey;
            return (
              <button
                key={bracket.label}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={Boolean(pickedIndex)}
                onClick={() => setEstimateAnswer(block.blockId, indexKey)}
                className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? "border-bronze bg-bronze text-ivory"
                    : "border-navy/25 text-charcoal hover:border-bronze/60 disabled:cursor-not-allowed disabled:opacity-50"
                }`}
              >
                {bracket.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {pickedBracket && (
        <div className="mt-6 flex flex-col gap-4">
          {comparisonLabel && (
            <p className="text-[1.05rem] font-medium text-charcoal">
              {comparisonLabel} <span className="font-mono text-muted">({block.actualLabel})</span>
            </p>
          )}
          <RevealItem item={block.derivedReading} readingLabel={vocabulary.readingLabel} />
        </div>
      )}
    </div>
  );
}
