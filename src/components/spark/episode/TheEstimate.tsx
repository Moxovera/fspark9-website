"use client";

import { dayNumberLabel } from "@/components/spark/day/dayMath";
import { setEstimateAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { SparkEstimateBlock, SparkMechanicVocabulary } from "@/types/content";

interface TheEstimateProps {
  block: SparkEstimateBlock;
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * Tek gecikmeli reveal — bkz. final interaction brief §6: "Held, not
 * resolved here." Okuyucunun seçtiği bracket burada SADECE saklanır,
 * karşılaştırma TheEstimateReveal'da, sayfanın ilerisinde olur.
 * Skorlanmaz — sadece mesafe raporlanır (asla geçti/kaldı kelimesi).
 */
export default function TheEstimate({ block, launchDate, dayLabel, vocabulary }: TheEstimateProps) {
  const state = useLastDayState();
  if (state.ledger) return null;

  const day = dayNumberLabel(block.date, launchDate);
  const picked = state.estimates[block.blockId];

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
            const isSelected = picked === indexKey;
            return (
              <button
                key={bracket.label}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={Boolean(picked)}
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

      {picked && <p className="mt-4 max-w-[52ch] text-sm text-muted">{vocabulary.estimateHeldLabel}</p>}
    </div>
  );
}
