import RecordBlock from "@/components/spark/episode/RecordBlock";
import ReadingBlock from "@/components/spark/episode/ReadingBlock";
import EpisodeNote from "@/components/spark/episode/EpisodeNote";
import TheCall from "@/components/spark/episode/TheCall";
import TheEstimate from "@/components/spark/episode/TheEstimate";
import TheWeigh from "@/components/spark/episode/TheWeigh";
import TheSignal from "@/components/spark/episode/TheSignal";
import SecondOpinion from "@/components/spark/episode/SecondOpinion";
import TheAllocation from "@/components/spark/episode/TheAllocation";
import type { SparkEpisodeBlock, SparkMechanicVocabulary, SparkRecordBlock } from "@/types/content";

interface EpisodeBlocksProps {
  blocks: SparkEpisodeBlock[];
  launchDate: string;
  dayLabel: string;
  vocabulary: SparkMechanicVocabulary;
}

/**
 * Tek sıralı `blocks` dizisini gezip her _type için doğru bileşeni
 * render eder. Her şey her zaman görünür (18 Eylül 2026, kullanıcı
 * talebi: Ledger tamamen kaldırıldı) — gizlenen hiçbir blok yok.
 * `sparkNote` (fspark9'un kendi sesi) gövde akışının içinde, ilgili
 * olduğu noktada render edilir, sayfa sonunda konsolide bir bölüm
 * DEĞİL.
 */
export default function EpisodeBlocks({ blocks, launchDate, dayLabel, vocabulary }: EpisodeBlocksProps) {
  const recordsById = new Map<string, SparkRecordBlock>(
    blocks.filter((b): b is SparkRecordBlock => b._type === "sparkRecord").map((b) => [b.blockId, b]),
  );

  return (
    <div className="flex flex-col gap-12">
      {blocks.map((block, index) => {
        switch (block._type) {
          case "sparkRecord":
            return (
              <RecordBlock
                key={block.blockId}
                block={block}
                launchDate={launchDate}
                dayLabel={dayLabel}
                recordLabel={vocabulary.recordLabel}
              />
            );
          case "sparkReading":
            return (
              <ReadingBlock
                key={index}
                block={block}
                launchDate={launchDate}
                dayLabel={dayLabel}
                readingLabel={vocabulary.readingLabel}
                recordsById={recordsById}
              />
            );
          case "sparkNote":
            return <EpisodeNote key={index} body={block.body} label={vocabulary.noteLabel} />;
          case "sparkCall":
            return (
              <TheCall key={block.blockId} block={block} launchDate={launchDate} dayLabel={dayLabel} vocabulary={vocabulary} />
            );
          case "sparkEstimate":
            return (
              <TheEstimate
                key={block.blockId}
                block={block}
                launchDate={launchDate}
                dayLabel={dayLabel}
                vocabulary={vocabulary}
              />
            );
          case "sparkWeigh":
            return (
              <TheWeigh
                key={block.blockId}
                block={block}
                launchDate={launchDate}
                dayLabel={dayLabel}
                vocabulary={vocabulary}
              />
            );
          case "sparkSignal":
            return (
              <TheSignal
                key={block.blockId}
                block={block}
                launchDate={launchDate}
                dayLabel={dayLabel}
                vocabulary={vocabulary}
              />
            );
          case "sparkSecondOpinion":
            return (
              <SecondOpinion
                key={block.blockId}
                block={block}
                launchDate={launchDate}
                dayLabel={dayLabel}
                vocabulary={vocabulary}
              />
            );
          case "sparkAllocation":
            return (
              <TheAllocation
                key={block.blockId}
                block={block}
                launchDate={launchDate}
                dayLabel={dayLabel}
                vocabulary={vocabulary}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
