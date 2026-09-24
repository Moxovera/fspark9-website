import { ArrowUpRightIcon } from "@/components/icons";
import { dayParts } from "@/components/spark/episode/dayText";
import type { EpisodeContext, SparkRecordBlock } from "@/types/content";

/**
 * Kayıt (board Episode "Record"): White, 2px Ink üst çizgi. Üst satırda
 * "Record" ve gün · tarih, sonra başlık, metin, varsa alıntı ve kaynak
 * linki (mono, altı çizili, SVG dış ok). `id` okumaların restsOn
 * linkleri için, `data-spark-*` gün saati için.
 */
export default function RecordBlock({ block, ctx }: { block: SparkRecordBlock; ctx: EpisodeContext }) {
  const { day, text } = dayParts(block.date, ctx);

  return (
    <article
      id={block.blockId}
      data-spark-day={day}
      data-spark-date={block.date}
      className="flex scroll-mt-40 flex-col gap-[14px] border-t-2 border-ink bg-white px-5 pt-6 pb-7 min-[900px]:px-8 min-[900px]:pt-7 min-[900px]:pb-[30px]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">
          {ctx.vocabulary.recordLabel}
        </span>
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">{text}</span>
      </div>
      <h3 className="m-0 font-display text-[24px] leading-[1.15] font-bold tracking-[-0.02em] text-ink min-[900px]:text-[28px]">
        {block.heading}
      </h3>
      <p className="m-0 text-[16px] leading-[1.6] text-ink min-[900px]:text-[17px]">{block.body}</p>
      {block.quote && (
        <figure className="m-0 mt-1 flex flex-col gap-[10px] pl-5 min-[900px]:pl-7">
          <blockquote className="m-0 font-display text-[19px] leading-[1.35] font-bold tracking-[-0.01em] text-ink min-[900px]:text-[21px]">
            &ldquo;{block.quote}&rdquo;
          </blockquote>
          {block.quoteAttribution && (
            <figcaption className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">
              {block.quoteAttribution}
            </figcaption>
          )}
        </figure>
      )}
      <a
        href={block.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-8 items-center gap-2 self-start border-b border-ink font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase no-underline"
      >
        {ctx.labels.sourceLabel} · {block.source.label}
        <ArrowUpRightIcon className="size-3 flex-none" strokeWidth="2.2" />
      </a>
    </article>
  );
}
