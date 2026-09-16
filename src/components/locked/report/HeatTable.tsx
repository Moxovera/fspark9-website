import type { ReportChartStrings, TableBlock as TableBlockType } from "@/types/content";
import { parseBankPrefix, BankLogo } from "./BankLogo";

/**
 * Computed from strings.heat/facts/lv — ported from fillStatic's
 * heat-rows fill (scratchpad script2.js:255-259). `table.head` is literal
 * content (only <tbody> was data-filled in the reference).
 */
export function HeatTable({ table, strings }: { table: TableBlockType; strings: ReportChartStrings }) {
  return (
    <div className="tbl-wrap heat">
      <table>
        {table.head && (
          <thead>
            <tr>
              {table.head.map((h, i) => {
                const { slug, lg, rest } = parseBankPrefix(h);
                return (
                  <th key={i} className={i === 1 ? "fzc" : undefined}>
                    {slug && <BankLogo slug={slug} lg={lg} />}
                    <span dangerouslySetInnerHTML={{ __html: rest }} />
                  </th>
                );
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {strings.heat.map(([label, levels]) => (
            <tr key={label}>
              <td>{label}</td>
              {levels.map((v, i) => (
                <td key={i} className={i === 0 ? "h fzc" : "h"}>
                  <span className={`lv${v}`}>{strings.lv[String(v) as keyof typeof strings.lv]}</span>
                </td>
              ))}
            </tr>
          ))}
          {strings.facts.map(([label, values]) => (
            <tr key={label}>
              <td>{label}</td>
              {values.map((v, i) => (
                <td key={i} className={i === 0 ? "fzc" : undefined} style={{ fontSize: 14 }}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="small" colSpan={8}>
              {strings.heatSrc} <a href="#k56">[56]</a>
              <a href="#k30">[30]</a>
              <a href="#k47b">[47b]</a>
              <a href="#k46">[46]</a>
              <a href="#k63">[63]</a>
              <a href="#k10">[10]</a> · {strings.heatSrc2} <a href="#k17">[17]</a>
              <a href="#k18">[18]</a>
              <a href="#k24">[24]</a>
              <a href="#k46">[46]</a>
              <a href="#k20">[20]</a> · {strings.heatSrc3} <a href="#k62">[62]</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
