"use client";

import { MechanicCard, OptionButton, ResultLine, InlineReading } from "@/components/spark/episode/MechanicParts";
import { dayParts } from "@/components/spark/episode/dayText";
import { setSignalAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { EpisodeContext, SparkSignalBlock } from "@/types/content";

/** The Signal: puanlanmayan okuma, üç seçenek alt alta. */
export default function TheSignal({ block, ctx }: { block: SparkSignalBlock; ctx: EpisodeContext }) {
  const state = useLastDayState();
  const { day, text } = dayParts(block.date, ctx);
  const picked = state.signals[block.blockId];

  return (
    <MechanicCard name={ctx.vocabulary.signalLabel} dayText={text} day={day} date={block.date} prompt={block.prompt} note={block.notScoredLabel}>
      <div className="flex flex-col gap-[10px]">
        {block.options.map((option) => (
          <OptionButton
            key={option}
            selected={picked === option}
            dimmed={Boolean(picked) && picked !== option}
            disabled={Boolean(picked)}
            onClick={() => setSignalAnswer(block.blockId, option)}
            title={option}
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
