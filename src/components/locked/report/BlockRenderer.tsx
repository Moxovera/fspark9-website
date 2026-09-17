import type { ReportBlock } from "@/types/content";
import type { ChartComponentProps } from "./charts/types";
import { Note } from "./Note";
import { Table } from "./Table";
import { DataDisclosure } from "./DataDisclosure";
import { FigureBlockRenderer } from "./FigureBlockRenderer";
import { HomesGrid } from "./HomesGrid";
import { JourneySteps } from "./JourneySteps";
import { Timeline } from "./Timeline";
import { MoveList } from "./MoveList";
import { TrioCards } from "./TrioCards";
import { HeatTable } from "./HeatTable";

export function BlockRenderer({ block, chartData }: { block: ReportBlock; chartData: ChartComponentProps }) {
  const noteLabel = chartData.strings.note;

  switch (block.kind) {
    case "prose":
    case "pull":
    case "small":
      return <div className={block.kind === "prose" ? "prose" : block.kind} dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "h3":
      return <h3>{block.text}</h3>;
    case "note":
      return <Note html={block.html} label={noteLabel} ariaLabel={chartData.strings.noteAria} />;
    case "list":
      return (
        <ul className="clean prose">
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case "table":
      return block.bodyFillAttr === "heat-rows" ? (
        <HeatTable table={block} strings={chartData.strings} />
      ) : (
        <Table table={block} />
      );
    case "details":
      return (
        <DataDisclosure
          block={block}
          banks={chartData.banks}
          locale={chartData.locale}
          shareOther={chartData.strings.shareOther}
          loss={chartData.strings.loss}
        />
      );
    case "figure":
      return <FigureBlockRenderer block={block} chartData={chartData} />;
    case "homes":
      return (
        <figure className="fig">
          <HomesGrid block={block} />
        </figure>
      );
    case "journey":
      return <JourneySteps block={block} />;
    case "timeline":
      return <Timeline block={block} ariaLabel={block.items.map((i) => i.title).join(", ")} />;
    case "moveBlock":
      return <MoveList block={block} noteLabel={noteLabel} noteAriaLabel={chartData.strings.noteAria} />;
    case "trio":
      return <TrioCards block={block} />;
    case "two":
      return (
        <div className="two" style={block.style ? { alignItems: block.style.includes("align-items:start") ? "start" : "center" } : undefined}>
          {block.cols.map((col, i) => (
            <BlockRenderer key={i} block={col} chartData={chartData} />
          ))}
        </div>
      );
    case "group":
      return (
        <div>
          {block.blocks.map((b, i) => (
            <BlockRenderer key={i} block={b} chartData={chartData} />
          ))}
        </div>
      );
    default:
      return null;
  }
}
