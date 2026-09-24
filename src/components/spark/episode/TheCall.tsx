"use client";

import { MechanicCard, OptionButton, ResultLine, InlineReading } from "@/components/spark/episode/MechanicParts";
import { dayParts } from "@/components/spark/episode/dayText";
import { setCallAnswer, useLastDayState, type CallAnswer } from "@/hooks/useLastDayState";
import type { EpisodeContext, SparkCallBlock } from "@/types/content";

/**
 * The Call: tek skorlanan mekanik, sadece kayda karşı. Seçim asla
 * "yanlış" denmez: eşleşmiyorsa "the record went the other way", cevap
 * "unsettled" ise düz okuma. Seçim kilitlenir (mantık değişmedi, sadece
 * sunum v2).
 */
export default function TheCall({ block, ctx }: { block: SparkCallBlock; ctx: EpisodeContext }) {
  const state = useLastDayState();
  const { vocabulary } = ctx;
  const { day, text } = dayParts(block.date, ctx);
  const picked = state.calls[block.blockId];
  const result =
    block.answer === "unsettled"
      ? vocabulary.callUnsettledLabel
      : picked === block.answer
        ? vocabulary.callMatchLabel
        : vocabulary.callMismatchLabel;

  return (
    <MechanicCard name={vocabulary.callLabel} dayText={text} day={day} date={block.date} prompt={block.prompt}>
      <div className="grid grid-cols-1 gap-[10px] min-[600px]:grid-cols-2">
        {(["rule", "decision"] as CallAnswer[]).map((option) => (
          <OptionButton
            key={option}
            selected={picked === option}
            dimmed={Boolean(picked) && picked !== option}
            disabled={Boolean(picked)}
            onClick={() => setCallAnswer(block.blockId, option)}
            title={option === "rule" ? vocabulary.callOptionRuleLabel : vocabulary.callOptionDecisionLabel}
          />
        ))}
      </div>
      {picked && (
        <>
          <ResultLine label={result} />
          <InlineReading item={block.reveal} />
        </>
      )}
    </MechanicCard>
  );
}
