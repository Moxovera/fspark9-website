import type { LegalBlock, LegalBlocksProps } from "@/types/content";

type Group = { heading: string | null; blocks: LegalBlock[] };

/**
 * Yasal metin blokları (brief v4 §7.8, board Legal): yedi blok tipinin
 * hepsi korunuyor, metne dokunulmuyor, sadece stil v2. Her `h` bloğu bir
 * satır açıyor: masaüstünde başlık solda (3 sütun), içerik sağda (6
 * sütun, 5. sütundan); satırlar 1px Rule ile ayrılıyor. İlk başlıktan
 * önceki bloklar başlıksız ilk satırda.
 */
export default function LegalBlocks({ blocks }: LegalBlocksProps) {
  const groups: Group[] = [];
  for (const block of blocks) {
    if (block.type === "h") groups.push({ heading: block.text, blocks: [] });
    else {
      if (groups.length === 0) groups.push({ heading: null, blocks: [] });
      groups[groups.length - 1].blocks.push(block);
    }
  }

  return (
    <div className="border-t-2 border-b border-t-ink border-b-rule">
      {groups.map((group, gi) => (
        <div
          key={gi}
          className={`flex flex-col gap-2 py-[18px] min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6 min-[900px]:py-6 ${gi > 0 ? "border-t border-rule" : ""}`}
        >
          {group.heading ? (
            <h2 className="m-0 text-[17px] leading-[normal] font-bold text-ink min-[900px]:col-span-3">{group.heading}</h2>
          ) : (
            <span className="hidden min-[900px]:col-span-3 min-[900px]:block" />
          )}
          <div className="flex flex-col gap-4 min-[900px]:col-span-6 min-[900px]:col-start-5">
            {group.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const TEXT = "m-0 text-[17px] leading-[1.6] text-stone";

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "div":
      return <p className="m-0 font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">{block.text}</p>;
    case "h":
      return null;
    case "sh":
      return <h3 className="m-0 mt-2 text-[17px] leading-[normal] font-bold text-ink">{block.text}</h3>;
    case "b":
      return <p className={TEXT}>{block.text}</p>;
    case "field":
      return (
        <div className="flex flex-col gap-1">
          {block.label && (
            <p className="m-0 font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">{block.label}</p>
          )}
          {block.lines.map((line, j) => (
            <p key={j} className={TEXT}>
              {line}
            </p>
          ))}
        </div>
      );
    case "ul":
      return (
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3">
              <span aria-hidden="true" className="mt-[10px] size-[7px] flex-none bg-ink" />
              <span className={TEXT}>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "tbl":
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink">
                {block.head.map((cell, j) => (
                  <th key={j} className="py-2 pr-4 font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-rule">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-3 pr-4 align-top text-[15px] leading-[1.5] text-stone">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
