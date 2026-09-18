import RecordBlock from "@/components/spark/episode/RecordBlock";
import ReadingBlock from "@/components/spark/episode/ReadingBlock";
import GapBlock from "@/components/spark/episode/GapBlock";
import LedgerGate from "@/components/spark/episode/LedgerGate";
import TheCall from "@/components/spark/episode/TheCall";
import TheEstimate from "@/components/spark/episode/TheEstimate";
import TheEstimateReveal from "@/components/spark/episode/TheEstimateReveal";
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
 * Final interaction brief — tek sıralı `blocks` dizisini gezip her
 * _type için doğru bileşeni render eder. RecordBlock/GapBlock her
 * zaman görünür (server component, ledger'a bakmaz); ReadingBlock
 * LedgerGate ile sarmalanır (server kalır, sadece görünürlüğü client
 * tarafından kontrol edilir); altı mekanik kendi ledger kontrolünü
 * kendi içinde yapar (bkz. her birinin kendi dosyası).
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
              <LedgerGate key={index}>
                <ReadingBlock
                  block={block}
                  launchDate={launchDate}
                  dayLabel={dayLabel}
                  readingLabel={vocabulary.readingLabel}
                  recordsById={recordsById}
                />
              </LedgerGate>
            );
          case "sparkGap":
            return (
              <GapBlock
                key={index}
                block={block}
                launchDate={launchDate}
                dayLabel={dayLabel}
                gapLabel={vocabulary.gapLabel}
                correctionInviteLabel={vocabulary.correctionInviteLabel}
              />
            );
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
          case "sparkEstimateReveal": {
            const estimate = blocks.find(
              (b): b is Extract<SparkEpisodeBlock, { _type: "sparkEstimate" }> =>
                b._type === "sparkEstimate" && b.blockId === block.estimateBlockId,
            );
            return (
              <TheEstimateReveal
                key={index}
                block={block}
                estimate={estimate}
                launchDate={launchDate}
                dayLabel={dayLabel}
                vocabulary={vocabulary}
              />
            );
          }
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
