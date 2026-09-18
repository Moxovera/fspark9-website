"use client";

import { dayNumberLabel } from "@/components/spark/day/dayMath";
import RevealItem from "@/components/spark/episode/RevealItem";
import { setSignalAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { SparkMechanicVocabulary, SparkSignalBlock } from "@/types/content";

interface TheSignalProps {
  block: SparkSignalBlock;
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * Final interaction brief §6: "the sharpest moment in the episode."
 * Hard constraint bileşende değil İÇERİKTE uygulanıyor — reveal metni
 * hiçbir zaman kapanışın bu tarihte kararlaştırıldığını ya da
 * atamanın buna hazırlık olduğunu ima etmemeli (bkz. seed-spark.ts'teki
 * gerçek metin). Bileşen sadece "not scored" göstergesini ve seçenekleri
 * render eder, skorlamaz.
 */
export default function TheSignal({ block, launchDate, dayLabel, vocabulary }: TheSignalProps) {
  const state = useLastDayState();
  if (state.ledger) return null;

  const day = dayNumberLabel(block.date, launchDate);
  const picked = state.signals[block.blockId];

  return (
    <div className="scroll-mt-32 border-l-[3px] border-bronze/60 py-2 pl-6" data-spark-day={day}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
        <span>{dayLabel} {day}</span>
        <span>{vocabulary.signalLabel}</span>
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-2 max-w-[62ch] text-[1.05rem] leading-[1.6] font-medium text-charcoal">
          {block.prompt}
        </legend>
        <p className="mb-4 text-sm text-muted">{block.notScoredLabel}</p>
        <div className="flex flex-col gap-3" role="radiogroup">
          {block.options.map((option) => {
            const isSelected = picked === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={Boolean(picked)}
                onClick={() => setSignalAnswer(block.blockId, option)}
                className={`rounded-lg border px-5 py-3 text-left text-[1rem] text-charcoal transition-colors ${
                  isSelected
                    ? "border-bronze bg-bronze/10"
                    : "border-navy/20 hover:border-bronze/50 disabled:cursor-not-allowed disabled:opacity-60"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      {picked && (
        <div className="mt-6">
          <RevealItem
            item={{ _type: "sparkInlineReading", ...block.revealReading }}
            readingLabel={vocabulary.readingLabel}
            gapLabel={vocabulary.gapLabel}
          />
        </div>
      )}
    </div>
  );
}
