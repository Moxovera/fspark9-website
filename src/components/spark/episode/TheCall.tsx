"use client";

import { dayNumberLabel } from "@/components/spark/day/dayMath";
import RevealItem from "@/components/spark/episode/RevealItem";
import { setCallAnswer, useLastDayState, type CallAnswer } from "@/hooks/useLastDayState";
import type { SparkCallBlock, SparkMechanicVocabulary } from "@/types/content";

interface TheCallProps {
  block: SparkCallBlock;
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * Altı mekaniğin ilki, tek SKORLANAN olan (final interaction brief §4:
 * "Only The Call is scored, and only against the record"). Kilitlenen
 * seçim asla "yanlış" diye etiketlenmez — eşleşmiyorsa "the record went
 * the other way" (bkz. orijinal brief'in TheCall notu), answer
 * "unsettled" ise gap çerçevesi. Ledger modunda tamamen gizlenir.
 */
export default function TheCall({ block, launchDate, dayLabel, vocabulary }: TheCallProps) {
  const state = useLastDayState();
  if (state.ledger) return null;

  const day = dayNumberLabel(block.date, launchDate);
  const picked = state.calls[block.blockId];

  const comparisonLabel =
    block.answer === "unsettled"
      ? vocabulary.callUnsettledLabel
      : picked === block.answer
        ? vocabulary.callMatchLabel
        : vocabulary.callMismatchLabel;

  return (
    <div className="scroll-mt-32 border-l-[3px] border-bronze/60 py-2 pl-6" data-spark-day={day}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
        <span>{dayLabel} {day}</span>
        <span>{vocabulary.callLabel}</span>
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-4 max-w-[62ch] text-[1.05rem] leading-[1.6] font-medium text-charcoal">
          {block.prompt}
        </legend>
        <div className="flex flex-wrap gap-3" role="radiogroup">
          {(["rule", "decision"] as CallAnswer[]).map((option) => {
            const isSelected = picked === option;
            const label = option === "rule" ? vocabulary.callOptionRuleLabel : vocabulary.callOptionDecisionLabel;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={Boolean(picked)}
                onClick={() => setCallAnswer(block.blockId, option)}
                className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? "border-bronze bg-bronze text-ivory"
                    : "border-navy/25 text-charcoal hover:border-bronze/60 disabled:cursor-not-allowed disabled:opacity-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {picked && (
        <div className="mt-6 flex flex-col gap-4">
          {block.reveal.map((item, index) => (
            <RevealItem key={index} item={item} readingLabel={vocabulary.readingLabel} gapLabel={vocabulary.gapLabel} />
          ))}
          <p className="font-mono text-xs tracking-[0.04em] text-muted">{comparisonLabel}</p>
        </div>
      )}
    </div>
  );
}
