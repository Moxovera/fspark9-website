"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { MechanicCard, ResultLine, InlineReading } from "@/components/spark/episode/MechanicParts";
import { dayParts } from "@/components/spark/episode/dayText";
import { setAllocationValue, useLastDayState } from "@/hooks/useLastDayState";
import type { EpisodeContext, SparkAllocationBlock } from "@/types/content";

/**
 * The Allocation: iki büyük sayı, kare Ink tutamaklı gerçek bir
 * `input type="range"` (globals.css .range-square) ve Ink eğik buton
 * "Lock in this split". Kilitlenince okuma açılır.
 */
export default function TheAllocation({ block, ctx }: { block: SparkAllocationBlock; ctx: EpisodeContext }) {
  const state = useLastDayState();
  const [pending, setPending] = useState(50);
  const { day, text } = dayParts(block.date, ctx);
  const committed = state.allocations[block.blockId];
  const locked = committed !== undefined;
  const value = locked ? committed : pending;

  return (
    <MechanicCard
      name={ctx.vocabulary.allocationLabel}
      dayText={text}
      day={day}
      date={block.date}
      prompt={block.prompt}
      note={block.notScoredLabel}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-display text-[40px] leading-none font-extrabold tracking-[-0.04em] text-ink min-[900px]:text-[48px]">{value}</span>
            <span className="font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">{block.categoryALabel}</span>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="font-display text-[40px] leading-none font-extrabold tracking-[-0.04em] text-ink min-[900px]:text-[48px]">
              {100 - value}
            </span>
            <span className="font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">{block.categoryBLabel}</span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={value}
          disabled={locked}
          aria-label={`${block.categoryALabel} / ${block.categoryBLabel}`}
          aria-valuetext={`${value} / ${100 - value}`}
          onChange={(event) => {
            if (!locked) setPending(Number(event.target.value));
          }}
          style={{ "--range-fill": `${value}%` } as CSSProperties}
          className="range-square w-full"
        />
      </div>
      {!locked ? (
        <div className="flex">
          <button
            type="button"
            onClick={() => setAllocationValue(block.blockId, value)}
            className="group inline-flex cursor-pointer items-center bg-ink py-[14px] pr-10 pl-[18px] text-[14px] leading-none font-bold whitespace-nowrap text-paper [clip-path:polygon(0_0,100%_0,calc(100%-18px)_100%,0_100%)]"
          >
            {ctx.vocabulary.allocationCommitLabel}
          </button>
        </div>
      ) : (
        <>
          <ResultLine label={ctx.labels.readingResultLabel} />
          <InlineReading item={block.revealReading} />
        </>
      )}
    </MechanicCard>
  );
}
