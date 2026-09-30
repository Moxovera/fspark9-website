import type { TsdCapabilityMatrixProps } from "@/types/content";

// Bankalar, ödeme kuruluşları, fatura yazılımları ve Tahsildar. Son
// sütun Flare tonlu (tahsildar.css .mx .th).
export function CapabilityMatrix({ head, rows }: TsdCapabilityMatrixProps) {
  const last = head.length - 1;
  return (
    <div className="tbl-wrap">
      <table className="mx">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h} className={i === last ? "th" : undefined}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.need}>
              <td>{r.need}</td>
              {r.cells.map((c, i) => (
                <td key={i} className={i === r.cells.length - 1 ? "h th" : "h"}>
                  <span className={`lv${c.level}`}>{c.label}</span>
                  {c.note && <small>{c.note}</small>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
