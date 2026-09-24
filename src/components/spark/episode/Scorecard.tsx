"use client";

import { useState } from "react";
import { dayNumberLabel } from "@/components/spark/day/dayMath";
import { countInteractions, useLastDayState } from "@/hooks/useLastDayState";
import type { EpisodeContext, SparkEpisodeBlock } from "@/types/content";

interface Row {
  key: string;
  name: string;
  answer: string | null;
  status: string;
}

/**
 * Skor kartı (board Episode "Your scorecard"): White, 4px Ink üst çizgi.
 * Mekanik sırasıyla her satırda ad, verilen cevap (yoksa Stone "Not
 * answered yet.") ve durum. Altta tüm bölümlerdeki cevap sayısı, paylaş
 * butonu ve gizlilik satırı. Veri useLastDayState'ten (localStorage
 * fspark9.lastday.v2), hesap mantığı değişmedi.
 */
export default function Scorecard({ subject, blocks, ctx }: { subject: string; blocks: SparkEpisodeBlock[]; ctx: EpisodeContext }) {
  const state = useLastDayState();
  const [copied, setCopied] = useState(false);
  const { vocabulary: v } = ctx;

  const rows: Row[] = [];
  for (const block of blocks) {
    switch (block._type) {
      case "sparkCall": {
        const picked = state.calls[block.blockId];
        const status = !picked
          ? ""
          : block.answer === "unsettled"
            ? v.callUnsettledLabel
            : picked === block.answer
              ? v.callMatchLabel
              : v.callMismatchLabel;
        rows.push({
          key: block.blockId,
          name: `${v.callLabel} · ${ctx.dayLabel} ${dayNumberLabel(block.date, ctx.launchDate)}`,
          answer: picked ? (picked === "rule" ? v.callOptionRuleLabel : v.callOptionDecisionLabel) : null,
          status,
        });
        break;
      }
      case "sparkEstimate": {
        const index = state.estimates[block.blockId];
        const bracket = index !== undefined ? block.brackets[Number(index)] : undefined;
        let status = "";
        if (bracket) {
          if (block.actualValue >= bracket.min && (bracket.max === null || block.actualValue <= bracket.max)) status = block.insideBracketLabel;
          else if (block.actualValue < bracket.min) status = block.belowBracketLabel;
          else status = block.aboveBracketLabel;
        }
        rows.push({ key: block.blockId, name: v.estimateLabel, answer: bracket?.label ?? null, status });
        break;
      }
      case "sparkWeigh":
        rows.push({ key: block.blockId, name: v.weighLabel, answer: state.weighs[block.blockId] ?? null, status: v.scorecardYourReadingLabel });
        break;
      case "sparkSignal":
        rows.push({ key: block.blockId, name: v.signalLabel, answer: state.signals[block.blockId] ?? null, status: v.scorecardYourReadingLabel });
        break;
      case "sparkSecondOpinion":
        rows.push({ key: block.blockId, name: v.secondOpinionLabel, answer: state.opinions[block.blockId] ?? null, status: v.scorecardYourReadingLabel });
        break;
      case "sparkAllocation": {
        const a = state.allocations[block.blockId];
        rows.push({ key: block.blockId, name: v.allocationLabel, answer: a !== undefined ? `${a} / ${100 - a}` : null, status: v.scorecardYourReadingLabel });
        break;
      }
    }
  }

  const calls = blocks.filter((b) => b._type === "sparkCall");
  const answeredCalls = calls.filter((b) => b._type === "sparkCall" && state.calls[b.blockId]);
  const crossEpisodeCount = countInteractions(state);

  async function share() {
    const text = [`${subject}, ${answeredCalls.length}/${calls.length} calls made.`, `${crossEpisodeCount} ${v.scorecardCrossEpisodeLabel}`].join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
    } catch {
      // Paylaşım iptal edildi ya da desteklenmiyor: panoya kopyalamaya düş.
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Pano da kapalıysa sessizce geç.
    }
  }

  const mono = "font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] uppercase";

  return (
    <section className="flex flex-col gap-5 border-t-4 border-ink bg-white px-5 pt-7 pb-8 min-[900px]:px-10 min-[900px]:pt-10 min-[900px]:pb-11">
      <div className={`${mono} text-ink`}>{ctx.labels.scorecardLabel}</div>
      <h2 className="m-0 font-display text-[34px] leading-none font-extrabold tracking-[-0.035em] text-ink min-[900px]:text-[44px]">
        {v.scorecardHeading}
      </h2>
      <div className="border-t-2 border-ink">
        {rows.map((row, i) => (
          <div
            key={row.key}
            className={`flex flex-col gap-1 py-[14px] min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-baseline min-[900px]:gap-x-6 ${i > 0 ? "border-t border-rule" : ""}`}
          >
            <span className={`${mono} text-ink min-[900px]:col-span-4`}>{row.name}</span>
            <span
              className={`text-[16px] leading-[normal] min-[900px]:col-span-5 ${row.answer ? "font-bold text-ink" : "font-normal text-stone"}`}
            >
              {row.answer ?? v.scorecardUnansweredLabel}
            </span>
            <span className={`${mono} text-stone min-[900px]:col-span-3 min-[900px]:justify-self-end`}>{row.answer ? row.status : ""}</span>
          </div>
        ))}
      </div>
      <div className="flex items-baseline gap-[10px]">
        <span className="font-display text-[40px] leading-none font-extrabold tracking-[-0.04em] text-ink min-[900px]:text-[48px]">
          {crossEpisodeCount}
        </span>
        <span className={`${mono} text-ink`}>{v.scorecardCrossEpisodeLabel}</span>
      </div>
      <div className="flex flex-col items-start gap-4 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-6">
        <button
          type="button"
          onClick={share}
          className="inline-flex min-h-[52px] cursor-pointer items-center border-2 border-ink px-5 text-[15px] leading-[normal] font-bold text-ink hover:bg-paper"
        >
          {copied ? v.scorecardCopiedLabel : v.scorecardShareLabel}
        </button>
        <span className={`${mono} text-stone`}>{v.scorecardPrivacyLine}</span>
      </div>
    </section>
  );
}
