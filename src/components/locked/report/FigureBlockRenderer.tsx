import type { FigureBlock } from "@/types/content";
import type { ChartComponentProps } from "./charts/types";
import { Meter } from "./Meter";
import { DataDisclosure } from "./DataDisclosure";
import { SectorShareFigure } from "./charts/SectorShareFigure";
import { AssetGrowthBars } from "./charts/AssetGrowthBars";
import { ShareStepsChart } from "./charts/ShareStepsChart";
import { ProfitBubble } from "./charts/ProfitBubble";
import { CapitalBars } from "./charts/CapitalBars";
import { TouchpointBars } from "./charts/TouchpointBars";
import { ProfitShareDots } from "./charts/ProfitShareDots";
import { DepositMix } from "./charts/DepositMix";
import { SavingsFinanceBars } from "./charts/SavingsFinanceBars";
import { FuzulBranchBars } from "./charts/FuzulBranchBars";
import { PositioningMap } from "./charts/PositioningMap";

const CHART_REGISTRY = {
  growth: AssetGrowthBars,
  shareSteps: ShareStepsChart,
  bubble: ProfitBubble,
  capital: CapitalBars,
  points: TouchpointBars,
  rates: ProfitShareDots,
  kt: DepositMix,
  tfs: SavingsFinanceBars,
  fzbranch: FuzulBranchBars,
  map: PositioningMap,
} as const;

export function FigureBlockRenderer({ block, chartData }: { block: FigureBlock; chartData: ChartComponentProps }) {
  if (block.chart === "share") {
    return (
      <SectorShareFigure
        {...chartData}
        ariaLabel={block.chartAria ?? undefined}
        title={block.title}
        sub={block.sub}
        segButtons={block.segButtons}
        legendItems={block.legendItems}
        caption={block.caption}
      />
    );
  }

  const ChartComponent = block.chart ? CHART_REGISTRY[block.chart] : null;

  return (
    <figure className="fig">
      <div className="fig-head">
        <div>
          <p className="fig-title">{block.title}</p>
          <p className="fig-sub">{block.sub}</p>
        </div>
      </div>
      {block.legendItems && (
        <div className="legend" style={{ marginBottom: 10 }}>
          {block.legendItems.map((l) => (
            <span key={l.label}>
              <i style={{ background: l.color.replace(/^background:\s*/, "") }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      {block.meter && <Meter meter={block.meter} />}
      {ChartComponent && <ChartComponent {...chartData} ariaLabel={block.chartAria ?? undefined} />}
      {block.caption && <figcaption dangerouslySetInnerHTML={{ __html: block.caption }} />}
      {block.detailsNested && <DataDisclosure block={block.detailsNested} banks={chartData.banks} locale={chartData.locale} shareOther={chartData.strings.shareOther} loss={chartData.strings.loss} />}
    </figure>
  );
}
