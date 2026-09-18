"use client";

import { dayNumberLabel } from "@/components/spark/day/dayMath";
import RevealItem from "@/components/spark/episode/RevealItem";
import { setOpinionAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { SparkMechanicVocabulary, SparkSecondOpinionBlock } from "@/types/content";

interface SecondOpinionProps {
  block: SparkSecondOpinionBlock;
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * İki okuma EŞİT ağırlıkta, yan yana (masaüstü) / alt alta (mobil),
 * hangisinin "doğru" olduğunu ima eden bir sıralama YOK (final
 * interaction brief §6). Kapanış cümlesi bronz renkte, ayrık —
 * yayının kendi ticari argümanı, hiç fspark9'dan bahsetmiyor, olduğu
 * gibi bırakılıyor.
 */
export default function SecondOpinion({ block, launchDate, dayLabel, vocabulary }: SecondOpinionProps) {
  const state = useLastDayState();
  if (state.ledger) return null;

  const day = dayNumberLabel(block.date, launchDate);
  const picked = state.opinions[block.blockId];

  return (
    <div className="scroll-mt-32 border-l-[3px] border-bronze/60 py-2 pl-6" data-spark-day={day}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
        <span>{dayLabel} {day}</span>
        <span>{vocabulary.secondOpinionLabel}</span>
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-2 max-w-[62ch] text-[1.05rem] leading-[1.6] font-medium text-charcoal">
          {block.prompt}
        </legend>
        <p className="mb-4 text-sm text-muted">{block.notScoredLabel}</p>
        <div className="flex flex-wrap gap-3" role="radiogroup">
          {block.options.map((option) => {
            const isSelected = picked === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={Boolean(picked)}
                onClick={() => setOpinionAnswer(block.blockId, option)}
                className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? "border-bronze bg-bronze text-ivory"
                    : "border-navy/25 text-charcoal hover:border-bronze/60 disabled:cursor-not-allowed disabled:opacity-50"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      {picked && (
        <div className="mt-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <RevealItem
              item={{ _type: "sparkInlineReading", ...block.readingA }}
              readingLabel={vocabulary.readingLabel}
              gapLabel={vocabulary.gapLabel}
            />
            <RevealItem
              item={{ _type: "sparkInlineReading", ...block.readingB }}
              readingLabel={vocabulary.readingLabel}
              gapLabel={vocabulary.gapLabel}
            />
          </div>
          <p className="max-w-[62ch] border-t border-bronze/20 pt-4 text-[1.02rem] leading-[1.6] font-medium text-bronze">
            {block.closingLine}
          </p>
        </div>
      )}
    </div>
  );
}
