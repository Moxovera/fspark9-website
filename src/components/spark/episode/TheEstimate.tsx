"use client";

import { MechanicCard, OptionButton, ResultLine, InlineReading } from "@/components/spark/episode/MechanicParts";
import { dayParts } from "@/components/spark/episode/dayText";
import { setEstimateAnswer, useLastDayState } from "@/hooks/useLastDayState";
import type { EpisodeContext, SparkEstimateBlock } from "@/types/content";

/**
 * The Estimate: aralık seçilince gerçek rakam büyük (11,413), karşılaştırma
 * ve okuma aynı yerde açılır. Karşılaştırma her zaman aralığın sayısal
 * sınırlarından; "yanlış" kelimesi yok.
 */
export default function TheEstimate({ block, ctx }: { block: SparkEstimateBlock; ctx: EpisodeContext }) {
  const state = useLastDayState();
  const { day, text } = dayParts(block.date, ctx);
  const pickedIndex = state.estimates[block.blockId];
  const picked = pickedIndex !== undefined ? block.brackets[Number(pickedIndex)] : undefined;

  let result: string | null = null;
  if (picked) {
    if (block.actualValue >= picked.min && (picked.max === null || block.actualValue <= picked.max)) {
      result = block.insideBracketLabel;
    } else if (block.actualValue < picked.min) {
      result = block.belowBracketLabel;
    } else {
      result = block.aboveBracketLabel;
    }
  }
  const actual = block.actualValue.toLocaleString(ctx.locale === "tr" ? "tr-TR" : "en-GB");
  const actualUnit = block.actualLabel.replace(/^[\d.,\s]+/, "");

  return (
    <MechanicCard name={ctx.vocabulary.estimateLabel} dayText={text} day={day} date={block.date} prompt={block.prompt}>
      <div className="grid grid-cols-1 gap-2 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-5">
        {block.brackets.map((bracket, index) => {
          const key = String(index);
          return (
            <OptionButton
              key={bracket.label}
              selected={pickedIndex === key}
              dimmed={pickedIndex !== undefined && pickedIndex !== key}
              disabled={pickedIndex !== undefined}
              onClick={() => setEstimateAnswer(block.blockId, key)}
              title={bracket.label}
            />
          );
        })}
      </div>
      {picked && (
        <>
          <div className="flex flex-wrap items-baseline gap-[14px]">
            <span className="font-display text-[48px] leading-none font-extrabold tracking-[-0.045em] text-ink min-[900px]:text-[64px]">
              {actual}
            </span>
            <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">{actualUnit}</span>
          </div>
          {result && <ResultLine label={result} />}
          <InlineReading item={block.derivedReading} />
        </>
      )}
    </MechanicCard>
  );
}
