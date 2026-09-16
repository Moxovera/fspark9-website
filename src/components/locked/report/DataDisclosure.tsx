import type { DetailsBlock, Locale } from "@/types/content";
import type { BankFigure } from "@/content/locked/fuzul/data";
import { Table } from "./Table";
import { BankTable } from "./BankTable";

/**
 * The expandable table with the dark plus button and hint text that
 * disappears when open (CSS-only via `details.data[open] .sum-h`, see
 * locked-report.css). `table.bodyFillAttr === "bank-rows"` renders the
 * computed BankTable instead of literal content rows.
 */
export function DataDisclosure({
  block,
  banks,
  locale,
  shareOther,
  loss,
}: {
  block: DetailsBlock;
  banks?: BankFigure[];
  locale?: Locale;
  shareOther?: string;
  loss?: string;
}) {
  const isBankTable = block.table.bodyFillAttr === "bank-rows";
  return (
    <details className="data">
      <summary>
        <span className="plus" aria-hidden="true" />
        <span className="sum-t">{block.sumT}</span>
        <span className="sum-h">{block.sumH}</span>
      </summary>
      {isBankTable && banks && locale && shareOther && loss ? (
        <BankTable table={block.table} banks={banks} locale={locale} shareOther={shareOther} loss={loss} />
      ) : (
        <Table table={block.table} />
      )}
    </details>
  );
}
