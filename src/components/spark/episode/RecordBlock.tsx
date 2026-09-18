import { dayNumberLabel } from "@/components/spark/day/dayMath";
import type { SparkRecordBlock } from "@/types/content";

interface RecordBlockProps {
  block: SparkRecordBlock;
  launchDate: string;
  dayLabel: string;
  recordLabel: string;
}

/**
 * Part 0 kural 3: "Fact and reading must be told apart in the layout
 * itself." Navy dolu 3px sol çizgi + "RECORD"/"KAYIT" mono etiket —
 * asla sadece renkle ayırt edilmez (bkz. GapBlock/ReadingBlock'un
 * kendi çizgi/etiket kombinasyonu). `id={block.blockId}` ReadingBlock'un
 * restsOn çipleri buraya bağlanabilsin diye. `data-spark-day` EpisodeClock'un
 * IntersectionObserver'ı için — hesaplanan gün numarası her zaman
 * launchDate + bu bloğun date'inden türetilir, elle girilmiş bir gün
 * alanı YOK (final interaction brief §2).
 */
export default function RecordBlock({ block, launchDate, dayLabel, recordLabel }: RecordBlockProps) {
  const day = dayNumberLabel(block.date, launchDate);

  return (
    <article
      id={block.blockId}
      data-spark-day={day}
      className="scroll-mt-32 border-l-[3px] border-navy py-2 pl-6"
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] tracking-[0.12em] text-navy uppercase">
        <span>{dayLabel} {day}</span>
        <span>{recordLabel}</span>
      </div>
      <h3 className="mb-2 font-display text-xl font-medium text-charcoal">{block.heading}</h3>
      <p className="max-w-[68ch] text-[1.02rem] leading-[1.65] text-charcoal/85">{block.body}</p>

      {block.quote && (
        <blockquote className="mt-4 max-w-[62ch] border-l-2 border-navy/20 pl-4 text-[1.02rem] leading-[1.6] text-charcoal/80 italic">
          &ldquo;{block.quote}&rdquo;
          {block.quoteAttribution && (
            <footer className="mt-2 font-sans text-sm not-italic text-muted">{block.quoteAttribution}</footer>
          )}
        </blockquote>
      )}

      <a
        href={block.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.04em] text-muted underline decoration-navy/30 underline-offset-4 hover:text-navy"
      >
        <span className="uppercase">{block.source.kind}</span>
        <span>{block.source.label}</span>
      </a>
    </article>
  );
}
