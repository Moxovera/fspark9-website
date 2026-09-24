import { dayNumberLabel } from "@/components/spark/day/dayMath";
import { dayParts } from "@/components/spark/episode/dayText";
import type { EpisodeContext, SparkReadingBlock, SparkRecordBlock } from "@/types/content";

/**
 * Okuma (fspark9'un yorumu, kayıt değil). Board'da ayrı çizilmedi; kayıttan
 * ayrı durması gerektiği için (kayıt ile okuma sayfa düzeninde ayrışır)
 * kart yok, 1px Rule üst çizgi ve "Reading" etiketi. Dayandığı kayıtlara
 * kare çiplerle bağlanır.
 */
export default function ReadingBlock({
  block,
  ctx,
  recordsById,
}: {
  block: SparkReadingBlock;
  ctx: EpisodeContext;
  recordsById: Map<string, SparkRecordBlock>;
}) {
  const { day, text } = dayParts(block.date, ctx);

  return (
    <article data-spark-day={day} data-spark-date={block.date} className="flex flex-col gap-3 border-t border-rule pt-6 pb-2">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">
          {ctx.vocabulary.readingLabel}
        </span>
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">{text}</span>
      </div>
      <h3 className="m-0 font-display text-[22px] leading-[1.2] font-bold tracking-[-0.015em] text-ink">{block.heading}</h3>
      <p className="m-0 text-[16px] leading-[1.6] text-ink min-[900px]:text-[17px]">{block.body}</p>
      {block.restsOn.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {block.restsOn.map((id) => {
            const record = recordsById.get(id);
            if (!record) return null;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex min-h-8 items-center border border-ink px-3 font-mono text-[11px] tracking-[0.08em] text-ink uppercase no-underline hover:bg-white"
              >
                {ctx.dayLabel} {dayNumberLabel(record.date, ctx.launchDate)}
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
}
