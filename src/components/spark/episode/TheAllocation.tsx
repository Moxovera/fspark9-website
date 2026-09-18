"use client";

import { dayNumberLabel } from "@/components/spark/day/dayMath";
import RevealItem from "@/components/spark/episode/RevealItem";
import { setAllocationValue, useLastDayState } from "@/hooks/useLastDayState";
import type { SparkAllocationBlock, SparkMechanicVocabulary } from "@/types/content";

interface TheAllocationProps {
  block: SparkAllocationBlock;
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * "Two sliders summing to 100" TEK bir range input olarak uygulandı —
 * A'nın değeri B'yi otomatik tamamlar (100-A), bu yüzden ikisi asla
 * senkron dışı kalamaz. Görsel olarak iki kategori arasında bölünen
 * tek bir çubuk. Adım genişliği 5 — hem masaüstü hem mobil için tek
 * bir granülerlik, cihaza göre farklı `step` JS viewport tespiti
 * gerektirir ve bu küçük cilanın karşılığı yok (uncertainty list'te).
 */
export default function TheAllocation({ block, launchDate, dayLabel, vocabulary }: TheAllocationProps) {
  const state = useLastDayState();
  if (state.ledger) return null;

  const day = dayNumberLabel(block.date, launchDate);
  const committed = state.allocations[block.blockId];
  const hasCommitted = committed !== undefined;
  const value = committed ?? 50;

  return (
    <div className="scroll-mt-32 border-l-[3px] border-bronze/60 py-2 pl-6" data-spark-day={day}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
        <span>{dayLabel} {day}</span>
        <span>{vocabulary.allocationLabel}</span>
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-2 max-w-[62ch] text-[1.05rem] leading-[1.6] font-medium text-charcoal">
          {block.prompt}
        </legend>
        <p className="mb-4 text-sm text-muted">{block.notScoredLabel}</p>

        <div className="mb-2 flex items-baseline justify-between font-mono text-sm text-charcoal">
          <span>{block.categoryALabel} {value}</span>
          <span>{block.categoryBLabel} {100 - value}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={value}
          disabled={hasCommitted}
          aria-label={`${block.categoryALabel} / ${block.categoryBLabel}`}
          onChange={(event) => {
            if (!hasCommitted) setAllocationValue(block.blockId, Number(event.target.value));
          }}
          className="w-full max-w-[420px] accent-bronze disabled:opacity-70"
        />
        {!hasCommitted && (
          <button
            type="button"
            onClick={() => setAllocationValue(block.blockId, value)}
            className="mt-4 rounded-full border border-bronze px-5 py-2 text-sm text-bronze transition-colors hover:bg-bronze hover:text-ivory"
          >
            {vocabulary.allocationCommitLabel}
          </button>
        )}
      </fieldset>

      {hasCommitted && (
        <div className="mt-6">
          <RevealItem
            item={{ _type: "sparkInlineReading", ...block.revealReading }}
            readingLabel={vocabulary.readingLabel}
            gapLabel={vocabulary.gapLabel}
          />
        </div>
      )}
    </div>
  );
}
