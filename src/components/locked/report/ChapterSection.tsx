import type { ReportChapter } from "@/types/content";
import type { ChartComponentProps } from "./charts/types";
import { BlockRenderer } from "./BlockRenderer";

export function ChapterSection({ chapter, chartData }: { chapter: ReportChapter; chartData: ChartComponentProps }) {
  return (
    <section className="chapter wrap" id={chapter.id} data-chapter data-nav={chapter.nav}>
      <p className="eyebrow">{chapter.eyebrow}</p>
      <h2 dangerouslySetInnerHTML={{ __html: chapter.heading }} />
      <p className="lede" dangerouslySetInnerHTML={{ __html: chapter.lede }} />
      {chapter.blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} chartData={chartData} />
      ))}
    </section>
  );
}
