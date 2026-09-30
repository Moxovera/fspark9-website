import type { TsdBlockRendererProps } from "@/types/content";
import { HBars } from "./HBars";
import { HundredGrid } from "./HundredGrid";
import { ResultCard } from "./ResultCard";
import { CardGrid } from "./CardGrid";
import { CapabilityMatrix } from "./CapabilityMatrix";
import { Table } from "./Table";
import { FactRow } from "./FactRow";
import { StepList } from "./StepList";
import { RiskList } from "./RiskList";
import { Note } from "./Note";
import { PartnerRing } from "./PartnerRing";
import { Roadmap } from "./Roadmap";
import { UseCaseStepper } from "./UseCaseStepper";
import { MeetingList } from "./MeetingList";

const SPACE = { md: "prose sp-md", lg: "prose sp-lg" } as const;

export function BlockRenderer({ block, noteLabel }: TsdBlockRendererProps) {
  switch (block.type) {
    case "h3":
      return <h3>{block.text}</h3>;
    case "prose":
      return (
        <div className={block.space ? SPACE[block.space] : "prose"}>
          {block.paras.map((html) => (
            <p key={html} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </div>
      );
    case "small":
      return <p className="small" dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "pull":
      return <p className="pull">{block.text}</p>;
    case "note":
      return <Note html={block.html} label={noteLabel} />;
    case "hbars":
      return <HBars {...block.figure} />;
    case "grid100":
      return <HundredGrid {...block.figure} />;
    case "two":
      return (
        <div className="two">
          {block.items.map((item, i) => (
            <BlockRenderer key={i} block={item} noteLabel={noteLabel} />
          ))}
        </div>
      );
    case "result":
      return <ResultCard {...block.card} />;
    case "cards":
      return <CardGrid {...block.grid} />;
    case "matrix":
      return <CapabilityMatrix {...block.table} />;
    case "table":
      return <Table {...block.table} />;
    case "facts":
      return <FactRow {...block.row} />;
    case "steps":
      return <StepList items={block.items} />;
    case "risks":
      return <RiskList items={block.items} />;
    case "ring":
      return <PartnerRing {...block.ring} />;
    case "roadmap":
      return <Roadmap {...block.roadmap} />;
    case "useCase":
      return <UseCaseStepper {...block.useCase} />;
    case "meetings":
      return <MeetingList {...block.meetings} />;
  }
}
