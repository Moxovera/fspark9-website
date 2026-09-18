"use client";

import { useState } from "react";
import { countInteractions, useLastDayState } from "@/hooks/useLastDayState";
import type {
  SparkCallBlock,
  SparkEpisodeBlock,
  SparkEstimateBlock,
  SparkEstimateRevealBlock,
  SparkMechanicVocabulary,
  SparkSecondOpinionBlock,
  SparkSignalBlock,
  SparkWeighBlock,
  SparkAllocationBlock,
} from "@/types/content";

interface ScorecardProps {
  subject: string;
  blocks: SparkEpisodeBlock[];
  vocabulary: SparkMechanicVocabulary;
}

/**
 * Final interaction brief §6, "The end": dört Call kayda karşı, Estimate
 * mesafe olarak (geçti/kaldı yok), Weigh/Signal/SecondOpinion/Allocation
 * "your reading" etiketiyle açıkça skorlanmamış, bölümler arası koşan
 * sayaç, paylaşım eylemi (SADECE okuyucunun kendi deseni hakkında,
 * konu hakkında bir yargı asla). Ledger modunda gizlenir — bu bileşen
 * kendi ledger kontrolünü yapar (diğer mekanikler gibi).
 */
export default function Scorecard({ subject, blocks, vocabulary }: ScorecardProps) {
  const state = useLastDayState();
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  if (state.ledger) return null;

  const calls = blocks.filter((b): b is SparkCallBlock => b._type === "sparkCall");
  const estimates = blocks.filter((b): b is SparkEstimateBlock => b._type === "sparkEstimate");
  const estimateReveals = blocks.filter(
    (b): b is SparkEstimateRevealBlock => b._type === "sparkEstimateReveal",
  );
  const weighs = blocks.filter((b): b is SparkWeighBlock => b._type === "sparkWeigh");
  const signals = blocks.filter((b): b is SparkSignalBlock => b._type === "sparkSignal");
  const opinions = blocks.filter((b): b is SparkSecondOpinionBlock => b._type === "sparkSecondOpinion");
  const allocations = blocks.filter((b): b is SparkAllocationBlock => b._type === "sparkAllocation");

  const answeredCalls = calls.filter((call) => state.calls[call.blockId]);
  const crossEpisodeCount = countInteractions(state);

  async function handleShare() {
    const lines = [
      `${subject}, ${answeredCalls.length}/${calls.length} calls made.`,
      `${crossEpisodeCount} ${vocabulary.scorecardCrossEpisodeLabel}`,
    ];
    const text = lines.join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
    } catch {
      // kullanıcı paylaşım sayfasını iptal etti ya da API yok — clipboard'a düş
    }
    try {
      await navigator.clipboard.writeText(text);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      // clipboard da yoksa sessizce hiçbir şey yapma, sayfa kırılmaz
    }
  }

  return (
    <section className="mt-4 border-t border-charcoal/10 pt-10">
      <h2 className="mb-6 font-display text-2xl font-medium text-charcoal">{vocabulary.scorecardHeading}</h2>

      {calls.length > 0 && (
        <ul className="mb-8 flex flex-col gap-3">
          {calls.map((call) => {
            const picked = state.calls[call.blockId];
            const label =
              !picked
                ? null
                : call.answer === "unsettled"
                  ? vocabulary.callUnsettledLabel
                  : picked === call.answer
                    ? vocabulary.callMatchLabel
                    : vocabulary.callMismatchLabel;
            return (
              <li key={call.blockId} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-charcoal/8 pb-3">
                <span className="max-w-[46ch] text-sm text-charcoal/85">{call.prompt}</span>
                <span className="font-mono text-xs tracking-[0.03em] text-muted">{label ?? vocabulary.scorecardUnansweredLabel}</span>
              </li>
            );
          })}
        </ul>
      )}

      {estimates.length > 0 && (
        <ul className="mb-8 flex flex-col gap-3">
          {estimates.map((estimate) => {
            const pickedIndex = state.estimates[estimate.blockId];
            const bracket = pickedIndex !== undefined ? estimate.brackets[Number(pickedIndex)] : undefined;
            const reveal = estimateReveals.find((r) => r.estimateBlockId === estimate.blockId);
            let comparison: string | null = null;
            if (bracket && reveal) {
              if (reveal.actualValue >= bracket.min && (bracket.max === null || reveal.actualValue <= bracket.max)) {
                comparison = reveal.insideBracketLabel;
              } else if (reveal.actualValue < bracket.min) {
                comparison = reveal.belowBracketLabel;
              } else {
                comparison = reveal.aboveBracketLabel;
              }
            }
            return (
              <li key={estimate.blockId} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-charcoal/8 pb-3">
                <span className="max-w-[46ch] text-sm text-charcoal/85">{bracket?.label ?? vocabulary.scorecardUnansweredLabel}</span>
                <span className="font-mono text-xs tracking-[0.03em] text-muted">{comparison ?? vocabulary.scorecardUnansweredLabel}</span>
              </li>
            );
          })}
        </ul>
      )}

      {(weighs.length > 0 || signals.length > 0 || opinions.length > 0 || allocations.length > 0) && (
        <ul className="mb-8 flex flex-col gap-3">
          {weighs.map((block) => (
            <li key={block.blockId} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-charcoal/8 pb-3">
              <span className="max-w-[46ch] text-sm text-charcoal/85">{state.weighs[block.blockId] ?? vocabulary.scorecardUnansweredLabel}</span>
              <span className="font-mono text-xs tracking-[0.03em] text-bronze uppercase">{vocabulary.scorecardYourReadingLabel}</span>
            </li>
          ))}
          {signals.map((block) => (
            <li key={block.blockId} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-charcoal/8 pb-3">
              <span className="max-w-[46ch] text-sm text-charcoal/85">{state.signals[block.blockId] ?? vocabulary.scorecardUnansweredLabel}</span>
              <span className="font-mono text-xs tracking-[0.03em] text-bronze uppercase">{vocabulary.scorecardYourReadingLabel}</span>
            </li>
          ))}
          {opinions.map((block) => (
            <li key={block.blockId} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-charcoal/8 pb-3">
              <span className="max-w-[46ch] text-sm text-charcoal/85">{state.opinions[block.blockId] ?? vocabulary.scorecardUnansweredLabel}</span>
              <span className="font-mono text-xs tracking-[0.03em] text-bronze uppercase">{vocabulary.scorecardYourReadingLabel}</span>
            </li>
          ))}
          {allocations.map((block) => {
            const valueA = state.allocations[block.blockId];
            return (
              <li key={block.blockId} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-charcoal/8 pb-3">
                <span className="max-w-[46ch] text-sm text-charcoal/85">
                  {valueA !== undefined
                    ? `${block.categoryALabel} ${valueA} / ${block.categoryBLabel} ${100 - valueA}`
                    : vocabulary.scorecardUnansweredLabel}
                </span>
                <span className="font-mono text-xs tracking-[0.03em] text-bronze uppercase">{vocabulary.scorecardYourReadingLabel}</span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-charcoal/10 pt-6">
        <p className="font-mono text-sm text-charcoal">
          {crossEpisodeCount} {vocabulary.scorecardCrossEpisodeLabel}
        </p>
        <button
          type="button"
          onClick={handleShare}
          className="rounded-full border border-navy/25 px-5 py-2.5 text-sm text-charcoal transition-colors hover:border-bronze/60"
        >
          {shareStatus === "copied" ? vocabulary.scorecardCopiedLabel : vocabulary.scorecardShareLabel}
        </button>
      </div>

      <p className="mt-6 text-xs text-muted">{vocabulary.scorecardPrivacyLine}</p>
    </section>
  );
}
