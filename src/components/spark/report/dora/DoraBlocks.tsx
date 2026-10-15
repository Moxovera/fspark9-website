import DoraInline from "@/components/spark/report/dora/DoraInline";
import { monoText } from "@/components/spark/decisions/styles";
import type { DoraBlock, DoraBlocksProps, Locale } from "@/types/content";

const cellMono = "font-mono text-[11.5px] font-medium tracking-[0.08em] text-stone uppercase";
const figure = "font-mono text-[clamp(26px,3vw,40px)] leading-none font-medium tracking-[-0.02em] whitespace-nowrap text-ink";

/**
 * DORA raporunun metin blokları: paragraf, alt başlık, liste, not ve tablo.
 * Hareket yok. Tablo 768 px altında satır başına bir kart olur (ilk hücre
 * başlık, diğerleri sütun adıyla); iki görünümden biri her zaman display:none.
 */
export default function DoraBlocks({ blocks, locale }: DoraBlocksProps) {
  return (
    <div className="grid gap-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} locale={locale} />
      ))}
    </div>
  );
}

function Block({ block, locale }: { block: DoraBlock; locale: Locale }) {
  switch (block.type) {
    case "p":
      return (
        <p className="m-0 max-w-[68ch]">
          <DoraInline text={block.text} locale={locale} />
        </p>
      );
    case "note":
      return <p className="m-0 max-w-[80ch] text-[13.5px] text-stone italic">{block.text}</p>;
    case "h":
      return <h3 className="mt-4 mb-0 font-display text-[21px] leading-[1.15] font-extrabold tracking-[-0.015em]">{block.text}</h3>;
    case "ul":
      return (
        <ul className="m-0 grid max-w-[72ch] list-none gap-0 border-t-2 border-ink p-0">
          {block.items.map((item) => (
            <li key={item} className="grid grid-cols-[18px_1fr] gap-3 border-b border-rule py-3 before:mt-[9px] before:size-2 before:bg-ink before:content-['']">
              <span>
                <DoraInline text={item} locale={locale} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="m-0 grid max-w-[72ch] list-none gap-0 border-t-2 border-ink p-0">
          {block.items.map((item, n) => (
            <li key={item} className="grid grid-cols-[34px_1fr] gap-2 border-b border-rule py-3.5">
              <span className={`${monoText} pt-[3px] text-stone`}>{String(n + 1).padStart(2, "0")}</span>
              <span>
                <DoraInline text={item} locale={locale} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return <DoraTable block={block} locale={locale} />;
  }
}

function DoraTable({ block, locale }: { block: Extract<DoraBlock, { type: "table" }>; locale: Locale }) {
  const { head, rows, figures = false } = block;
  return (
    <>
      <table className="hidden w-full border-collapse border-t-2 border-ink text-[15.5px] min-[768px]:table">
        <thead>
          <tr>
            {head.map((h, c) => (
              <th key={c} scope="col" className={`border-b border-rule py-3.5 pr-4 text-left align-bottom ${cellMono} ${c > 0 ? "pl-4" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, c) =>
                c === 0 ? (
                  <th
                    key={c}
                    scope="row"
                    className={`border-b border-rule py-4 pr-4 text-left align-top ${figures ? `${figure} w-[1%]` : "w-[22%] font-display text-[16.5px] leading-[1.25] font-bold"}`}
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={c} className={`border-b border-rule py-4 pr-4 pl-4 text-left align-top ${figures && c === row.length - 1 ? "w-[24%] text-[14px] text-stone" : ""}`}>
                    <DoraInline text={cell} locale={locale} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="m-0 grid list-none border-t-2 border-ink p-0 min-[768px]:hidden">
        {rows.map((row) => (
          <li key={row[0]} className="grid gap-2.5 border-b border-rule py-4">
            <p className={`m-0 ${figures ? figure : "font-display text-[18px] leading-[1.25] font-bold"}`}>{row[0]}</p>
            {row.slice(1).map((cell, c) => (
              <div key={c} className="grid gap-1">
                {head[c + 1] && <span className={cellMono}>{head[c + 1]}</span>}
                <span className="text-[15.5px]">
                  <DoraInline text={cell} locale={locale} />
                </span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
