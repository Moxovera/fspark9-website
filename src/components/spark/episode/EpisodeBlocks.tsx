import RecordBlock from "@/components/spark/episode/RecordBlock";
import ReadingBlock from "@/components/spark/episode/ReadingBlock";
import GapBlock from "@/components/spark/episode/GapBlock";
import TheCall from "@/components/spark/episode/TheCall";
import EpisodeNote from "@/components/spark/episode/EpisodeNote";
import type { LastDayBlock, LastDayMechanicLabels } from "@/types/content";

interface EpisodeBlocksProps {
  blocks: LastDayBlock[];
  labels: LastDayMechanicLabels;
  correctionsHref: string;
}

/**
 * Bloklar sırayla, günlük — her üst düzey blok EpisodeClock'un
 * gözlemlediği bir [data-day-anchor] sarmalayıcıya sahip. Ledger
 * modunun kendisi (reading/call/note'u gizleme) her bir yaprak
 * bileşenin İÇİNDE (useLastDayCalls().ledger) çözülüyor — bu bileşen
 * sadece sırayı ve gün çapasını kurar, en küçük client sınırı
 * prensibiyle (CLAUDE.md) kendisi server component kalabiliyor.
 */
export default function EpisodeBlocks({ blocks, labels, correctionsHref }: EpisodeBlocksProps) {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block) => (
        <div key={block.key} data-day-anchor data-day={block.day ?? 0}>
          {block.kind === "record" && (
            <RecordBlock block={block} label={labels.recordLabel} dayWord={labels.dayWord} />
          )}
          {block.kind === "reading" && (
            <ReadingBlock
              block={block}
              label={labels.readingLabel}
              dayWord={labels.dayWord}
              restsOnLabel={labels.restsOnLabel}
            />
          )}
          {block.kind === "gap" && (
            <GapBlock
              block={block}
              label={labels.gapLabel}
              dayWord={labels.dayWord}
              correctionsHref={correctionsHref}
              correctionsCtaLabel={labels.correctionsCtaLabel}
            />
          )}
          {block.kind === "call" && (
            <TheCall block={block} labels={labels} correctionsHref={correctionsHref} />
          )}
          {block.kind === "note" && (
            <EpisodeNote body={block.body} label={labels.noteLabel} />
          )}
        </div>
      ))}
    </div>
  );
}
