"use client";

import { MechanicCard, OptionButton, ResultLine, InlineReading } from "@/components/spark/episode/MechanicParts";
import { dayParts } from "@/components/spark/episode/dayText";
import { setOpinionAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { EpisodeContext, SparkSecondOpinionBlock } from "@/types/content";

/** The Second Opinion: seçimden sonra iki okuma masaüstünde yan yana, altta kapanış cümlesi. */
export default function SecondOpinion({ block, ctx }: { block: SparkSecondOpinionBlock; ctx: EpisodeContext }) {
  const state = useLastDayState();
  const { day, text } = dayParts(block.date, ctx);
  const picked = state.opinions[block.blockId];

  return (
    <MechanicCard
      name={ctx.vocabulary.secondOpinionLabel}
      dayText={text}
      day={day}
      date={block.date}
      prompt={block.prompt}
      note={block.notScoredLabel}
    >
      <div className="grid grid-cols-1 gap-[10px] min-[900px]:grid-cols-3">
        {block.options.map((option) => (
          <OptionButton
            key={option}
            selected={picked === option}
            dimmed={Boolean(picked) && picked !== option}
            disabled={Boolean(picked)}
            onClick={() => setOpinionAnswer(block.blockId, option)}
            title={option}
          />
        ))}
      </div>
      {picked && (
        <>
          <ResultLine label={ctx.labels.readingResultLabel} />
          <div className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-2">
            <InlineReading item={block.readingA} />
            <InlineReading item={block.readingB} />
          </div>
          <p className="m-0 font-display text-[18px] leading-[1.35] font-bold text-ink min-[900px]:text-[20px]">{block.closingLine}</p>
        </>
      )}
    </MechanicCard>
  );
}
