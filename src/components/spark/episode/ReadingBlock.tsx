import { dayNumberLabel } from "@/components/spark/day/dayMath";
import type { SparkRecordBlock, SparkReadingBlock } from "@/types/content";

interface ReadingBlockProps {
  block: SparkReadingBlock;
  launchDate: string;
  dayLabel: string;
  readingLabel: string;
  recordsById: Map<string, SparkRecordBlock>;
}

/**
 * Bronz dolu 3px sol çizgi + "READING"/"OKUMA" mono etiket — RecordBlock'un
 * navy/GapBlock'un kesik çizgisinden ayrı, asla sadece renkle değil.
 * `restsOn` orijinal brief'te "decoration değil" diye tarif edildi — her
 * zaman en az bir kayda dayanır, burada o kayıtlara giden küçük çipler
 * olarak render edilir (bkz. sparkEpisodeBlocks.ts yorumu: aynı doküman
 * içindeki dizi elemanlarına Sanity reference hedeflenemediği için
 * blockId string'i kullanılıyor).
 */
export default function ReadingBlock({ block, launchDate, dayLabel, readingLabel, recordsById }: ReadingBlockProps) {
  const day = dayNumberLabel(block.date, launchDate);

  return (
    <article className="scroll-mt-32 border-l-[3px] border-bronze py-2 pl-6">
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] tracking-[0.12em] text-bronze uppercase">
        <span>{dayLabel} {day}</span>
        <span>{readingLabel}</span>
      </div>
      <h3 className="mb-2 font-display text-xl font-medium text-charcoal">{block.heading}</h3>
      <p className="max-w-[68ch] text-[1.02rem] leading-[1.65] text-charcoal/85">{block.body}</p>

      {block.restsOn.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {block.restsOn.map((blockId) => {
            const record = recordsById.get(blockId);
            if (!record) return null;
            return (
              <a
                key={blockId}
                href={`#${blockId}`}
                className="rounded-full border border-navy/20 px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-navy/70 uppercase transition-colors hover:border-navy/50 hover:text-navy"
              >
                {dayLabel} {dayNumberLabel(record.date, launchDate)}
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
}
