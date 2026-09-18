"use client";

import { dayNumberLabel } from "@/components/spark/day/dayMath";
import RevealItem from "@/components/spark/episode/RevealItem";
import { setWeighAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { SparkMechanicVocabulary, SparkWeighBlock } from "@/types/content";

interface TheWeighProps {
  block: SparkWeighBlock;
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * Skorlanmayan ilk mekanik. "There is no right answer here. Pick the
 * one you would defend." commit'ten ÖNCE görünür (bkz. final
 * interaction brief §6). Okuyucunun seçimi asla işaretlenmez —
 * highlight yok, "most readers chose" yok, sayaç yok.
 */
export default function TheWeigh({ block, launchDate, dayLabel, vocabulary }: TheWeighProps) {
  const state = useLastDayState();

  const day = dayNumberLabel(block.date, launchDate);
  const picked = state.weighs[block.blockId];

  return (
    <div className="scroll-mt-32 border-l-[3px] border-bronze/60 py-2 pl-6" data-spark-day={day}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
        <span>{dayLabel} {day}</span>
        <span>{vocabulary.weighLabel}</span>
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-2 max-w-[62ch] text-[1.05rem] leading-[1.6] font-medium text-charcoal">
          {block.prompt}
        </legend>
        <p className="mb-4 text-sm text-muted">{block.disclaimer}</p>
        <div className="flex flex-col gap-3" role="radiogroup">
          {block.options.map((option) => {
            const isSelected = picked === option.label;
            return (
              <button
                key={option.label}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={Boolean(picked)}
                onClick={() => setWeighAnswer(block.blockId, option.label)}
                className={`rounded-lg border px-5 py-3 text-left transition-colors ${
                  isSelected
                    ? "border-bronze bg-bronze/10"
                    : "border-navy/20 hover:border-bronze/50 disabled:cursor-not-allowed disabled:opacity-60"
                }`}
              >
                <span className="block text-[1rem] font-medium text-charcoal">{option.label}</span>
                <span className="mt-1 block text-sm text-muted">{option.line}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {picked && (
        <div className="mt-6 flex flex-col gap-4">
          <RevealItem item={block.revealReading} readingLabel={vocabulary.readingLabel} />
        </div>
      )}
    </div>
  );
}
