"use client";

import { MechanicCard, OptionButton, ResultLine, InlineReading } from "@/components/spark/episode/MechanicParts";
import { dayParts } from "@/components/spark/episode/dayText";
import { setWeighAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { EpisodeContext, SparkWeighBlock } from "@/types/content";

/** The Weigh: puanlanmayan üç seçenek, her biri bir satır açıklamalı. */
export default function TheWeigh({ block, ctx }: { block: SparkWeighBlock; ctx: EpisodeContext }) {
  const state = useLastDayState();
  const { day, text } = dayParts(block.date, ctx);
  const picked = state.weighs[block.blockId];

  return (
    <MechanicCard name={ctx.vocabulary.weighLabel} dayText={text} day={day} date={block.date} prompt={block.prompt} note={block.disclaimer}>
      <div className="flex flex-col gap-[10px]">
        {block.options.map((option) => (
          <OptionButton
            key={option.label}
            selected={picked === option.label}
            dimmed={Boolean(picked) && picked !== option.label}
            disabled={Boolean(picked)}
            onClick={() => setWeighAnswer(block.blockId, option.label)}
            title={option.label}
            line={option.line}
          />
        ))}
      </div>
      {picked && (
        <>
          <ResultLine label={ctx.labels.readingResultLabel} />
          <InlineReading item={block.revealReading} />
        </>
      )}
    </MechanicCard>
  );
}
