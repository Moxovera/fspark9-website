import RecordBlock from "@/components/spark/episode/RecordBlock";
import ReadingBlock from "@/components/spark/episode/ReadingBlock";
import EpisodeNote from "@/components/spark/episode/EpisodeNote";
import TheCall from "@/components/spark/episode/TheCall";
import TheEstimate from "@/components/spark/episode/TheEstimate";
import TheWeigh from "@/components/spark/episode/TheWeigh";
import TheSignal from "@/components/spark/episode/TheSignal";
import SecondOpinion from "@/components/spark/episode/SecondOpinion";
import TheAllocation from "@/components/spark/episode/TheAllocation";
import type { EpisodeContext, SparkEpisodeBlock, SparkRecordBlock } from "@/types/content";

/**
 * Tek sıralı `blocks` dizisini gezip her tip için doğru bileşeni render
 * eder. Sıra ve içerik Sanity'deki gibi, hiçbir blok gizlenmiyor; not
 * blokları ilgili yerde akışın içinde.
 */
export default function EpisodeBlocks({ blocks, ctx }: { blocks: SparkEpisodeBlock[]; ctx: EpisodeContext }) {
  const recordsById = new Map<string, SparkRecordBlock>(
    blocks.filter((b): b is SparkRecordBlock => b._type === "sparkRecord").map((b) => [b.blockId, b]),
  );

  return (
    <div className="flex flex-col gap-4 min-[900px]:gap-6">
      {blocks.map((block, index) => {
        switch (block._type) {
          case "sparkRecord":
            return <RecordBlock key={block.blockId} block={block} ctx={ctx} />;
          case "sparkReading":
            return <ReadingBlock key={index} block={block} ctx={ctx} recordsById={recordsById} />;
          case "sparkNote":
            return <EpisodeNote key={index} body={block.body} date={block.date} ctx={ctx} />;
          case "sparkCall":
            return <TheCall key={block.blockId} block={block} ctx={ctx} />;
          case "sparkEstimate":
            return <TheEstimate key={block.blockId} block={block} ctx={ctx} />;
          case "sparkWeigh":
            return <TheWeigh key={block.blockId} block={block} ctx={ctx} />;
          case "sparkSignal":
            return <TheSignal key={block.blockId} block={block} ctx={ctx} />;
          case "sparkSecondOpinion":
            return <SecondOpinion key={block.blockId} block={block} ctx={ctx} />;
          case "sparkAllocation":
            return <TheAllocation key={block.blockId} block={block} ctx={ctx} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
