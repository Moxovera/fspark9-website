import type { TableBlock as TableBlockType, TableCell } from "@/types/content";
import { BankLogo, parseBankPrefix } from "./BankLogo";

function parseInlineStyle(style: string | null): React.CSSProperties | undefined {
  if (!style) return undefined;
  const out: Record<string, string> = {};
  for (const decl of style.split(";")) {
    const [prop, value] = decl.split(":").map((s) => s?.trim());
    if (!prop || !value) continue;
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = value;
  }
  return out as React.CSSProperties;
}

function Cell({ cell, tag }: { cell: TableCell; tag: "th" | "td" }) {
  const Tag = tag;
  if (cell.cls.includes("bank")) {
    const { slug, lg, rest } = parseBankPrefix(cell.html);
    return (
      <Tag className={cell.cls}>
        {slug && <BankLogo slug={slug} lg={lg} />}
        <span dangerouslySetInnerHTML={{ __html: rest }} />
      </Tag>
    );
  }
  return <Tag className={cell.cls || undefined} dangerouslySetInnerHTML={{ __html: cell.html }} />;
}

/**
 * Generic content-driven table. `bodyFillAttr` tables (bank-rows/heat-rows)
 * are computed elsewhere (BankTable/HeatTable) — this only renders tables
 * whose rows are literal content.
 */
export function Table({ table }: { table: TableBlockType }) {
  return (
    <div className={`tbl-wrap${table.isHeat ? " heat" : ""}`}>
      <table style={parseInlineStyle(table.minWidth)}>
        {table.head && (
          <thead>
            <tr>
              {table.head.map((h, i) => {
                const { slug, lg, rest } = parseBankPrefix(h);
                return (
                  <th key={i} className={i === 1 && table.isHeat ? "fzc" : undefined}>
                    {slug && <BankLogo slug={slug} lg={lg} />}
                    <span dangerouslySetInnerHTML={{ __html: rest }} />
                  </th>
                );
              })}
            </tr>
          </thead>
        )}
        {table.rows && (
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <Cell key={j} cell={cell} tag="td" />
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
