"use client";

import { useLastDayCalls } from "@/hooks/useLastDayCalls";
import RecordBlock from "@/components/spark/episode/RecordBlock";
import ReadingBlock from "@/components/spark/episode/ReadingBlock";
import GapBlock from "@/components/spark/episode/GapBlock";
import type { LastDayCallBlock, LastDayMechanicLabels } from "@/types/content";

interface TheCallProps {
  block: LastDayCallBlock;
  labels: LastDayMechanicLabels;
  correctionsHref: string;
}

/**
 * Reader'ın kendi seçimini kilitleyip altındaki kaydı açan mekanik.
 * Kilitli seçim ASLA "yanlış" diye etiketlenmez — sadece "the record
 * went the other way" ya da (unsettled cevaplarda) "the record does
 * not settle this" (bkz. build prompt Part 0 + kabul kriteri 9).
 *
 * Ledger modunda ("Show the record only"): call'ın kendi sorusu/
 * butonları hiç render edilmez, sadece revealBlocks içindeki record/gap
 * (reading DEĞİL) koşulsuz gösterilir — "One toggle strips out every
 * reading, every question... leaving nothing but the dated documents
 * and the declared gaps."
 */
export default function TheCall({ block, labels, correctionsHref }: TheCallProps) {
  const { calls, ledger, answerCall } = useLastDayCalls();
  const chosen = calls[block.id];

  if (ledger) {
    return (
      <div className="flex flex-col gap-6">
        {block.revealBlocks
          .filter((reveal) => reveal.kind !== "reading")
          .map((reveal) =>
            reveal.kind === "record" ? (
              <RecordBlock
                key={reveal.key}
                block={reveal}
                label={labels.recordLabel}
                dayWord={labels.dayWord}
              />
            ) : (
              <GapBlock
                key={reveal.key}
                block={reveal}
                label={labels.gapLabel}
                dayWord={labels.dayWord}
                correctionsHref={correctionsHref}
                correctionsCtaLabel={labels.correctionsCtaLabel}
              />
            ),
          )}
      </div>
    );
  }

  const revealMessage = !chosen
    ? undefined
    : block.answer === "unsettled"
      ? labels.callRevealUnsettled
      : chosen !== block.answer
        ? labels.callRevealDiverged
        : undefined;

  return (
    <div className="border-l-[3px] border-solid border-navy/60 bg-navy/[0.03] py-6 pl-6">
      <p className="mb-4 font-display text-[1.15rem] leading-[1.45] font-medium text-charcoal">
        {block.prompt}
      </p>
      <div className="flex flex-wrap gap-3" role="group" aria-label={block.prompt}>
        {(["rule", "decision"] as const).map((option) => {
          const label = option === "rule" ? labels.callOptionRule : labels.callOptionDecision;
          const isChosen = chosen === option;
          return (
            <button
              key={option}
              type="button"
              disabled={Boolean(chosen)}
              aria-pressed={isChosen}
              onClick={() => answerCall(block.id, option)}
              className={`rounded-full border px-5 py-2.5 font-mono text-xs tracking-[0.06em] uppercase transition-colors duration-200 ${
                isChosen
                  ? "border-navy bg-navy text-ivory"
                  : chosen
                    ? "border-charcoal/15 text-charcoal/35"
                    : "border-charcoal/30 text-charcoal hover:border-navy hover:text-navy"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {chosen && (
        <div className="mt-6 flex flex-col gap-6">
          {revealMessage && (
            <p className="font-mono text-[11.5px] tracking-[0.04em] text-muted uppercase">
              {revealMessage}
            </p>
          )}
          {block.revealBlocks.map((reveal) => {
            if (reveal.kind === "record") {
              return (
                <RecordBlock
                  key={reveal.key}
                  block={reveal}
                  label={labels.recordLabel}
                  dayWord={labels.dayWord}
                />
              );
            }
            if (reveal.kind === "reading") {
              return (
                <ReadingBlock
                  key={reveal.key}
                  block={reveal}
                  label={labels.readingLabel}
                  dayWord={labels.dayWord}
                  restsOnLabel={labels.restsOnLabel}
                />
              );
            }
            return (
              <GapBlock
                key={reveal.key}
                block={reveal}
                label={labels.gapLabel}
                dayWord={labels.dayWord}
                correctionsHref={correctionsHref}
                correctionsCtaLabel={labels.correctionsCtaLabel}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
