import type { Locale, TableBlock as TableBlockType } from "@/types/content";
import type { BankFigure } from "@/content/locked/fuzul/data";
import { BankLogo } from "./BankLogo";
import { numberFormat, percentFormat } from "./chart-helpers";

/**
 * Computed from BANKS (not literal content) — ported from fillStatic's
 * bank-rows fill (scratchpad script2.js:251-253). `table.head` still comes
 * from content (only the <tbody> was data-filled in the reference).
 */
export function BankTable({ table, banks, locale, shareOther, loss }: { table: TableBlockType; banks: BankFigure[]; locale: Locale; shareOther: string; loss: string }) {
  return (
    <div className="tbl-wrap">
      <table>
        {table.head && (
          <thead>
            <tr>
              {table.head.map((h, i) => (
                <th key={i} dangerouslySetInnerHTML={{ __html: h }} />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {banks.map((b) => (
            <tr key={b.slug}>
              <td className="bank">
                <BankLogo slug={b.slug} />
                {b.n}
              </td>
              <td className="n">{numberFormat(locale, b.a, b.a % 1 ? 1 : 0)}</td>
              <td className="n">{percentFormat(locale, b.share, 1)}</td>
              <td className="n">{percentFormat(locale, b.g, 1)}</td>
              <td className="n">
                {b.p < 0 ? `${numberFormat(locale, b.p)} (${loss})` : numberFormat(locale, b.p)}
                {b.emlak ? "*" : ""}
              </td>
              <td className="n">
                {percentFormat(locale, b.roa, 2)}
                {b.emlak ? "*" : ""}
              </td>
            </tr>
          ))}
          <tr>
            <td>{shareOther}</td>
            <td className="n">~46</td>
            <td className="n">~{percentFormat(locale, 0.9, 1)}</td>
            <td className="n">-</td>
            <td className="n">-</td>
            <td className="n">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
