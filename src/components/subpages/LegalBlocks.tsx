import type { LegalBlock } from "@/types/content";

interface LegalBlocksProps {
  blocks: LegalBlock[];
}

/**
 * dc.html: legalBlocks() (satır 888-947) — 7 blok varyantı, discriminated
 * union pattern matching ile. Tablo sütun sayısı içerik-bağımlı olduğu
 * için (head.length) grid-template-columns inline style kalıyor,
 * ProcessTabs/AudienceAccordion'daki aynı gerekçeyle.
 */
export default function LegalBlocks({ blocks }: LegalBlocksProps) {
  return (
    <section className="bg-ivory px-7 pt-16 pb-[110px]">
      <div className="mx-auto max-w-[760px]">
        {blocks.map((block, i) => (
          <div key={i}>
            {block.type === "div" && (
              <p className="mt-[68px] border-t border-bronze/30 pt-[30px] font-mono text-[11.5px] tracking-[0.18em] text-bronze uppercase">
                {block.text}
              </p>
            )}

            {block.type === "h" && (
              <h2 className="mt-[46px] mb-3.5 font-display text-[clamp(1.45rem,2.5vw,2rem)] leading-[1.2] font-medium text-navy">
                {block.text}
              </h2>
            )}

            {block.type === "sh" && (
              <h3 className="mt-8 mb-2.5 font-display text-[1.18rem] leading-[1.3] font-medium text-navy">
                {block.text}
              </h3>
            )}

            {block.type === "b" && (
              <p className="mb-[18px] text-[1.02rem] leading-[1.78] text-charcoal">
                {block.text}
              </p>
            )}

            {block.type === "field" && (
              <div className="mb-[22px] flex flex-col gap-1">
                {block.label && (
                  <p className="mb-1 font-mono text-[11.5px] tracking-[0.1em] text-muted uppercase">
                    {block.label}
                  </p>
                )}
                {block.lines.map((line, j) => (
                  <p
                    key={j}
                    className="text-[1.02rem] leading-[1.7] text-charcoal"
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}

            {block.type === "ul" && (
              <div className="mb-[22px] flex flex-col gap-2.5">
                {block.items.map((item, j) => (
                  <div
                    key={j}
                    className="grid grid-cols-[16px_1fr] items-start gap-3"
                  >
                    <span className="font-mono text-[13px] leading-[1.7] text-bronze">
                      —
                    </span>
                    <p className="text-[1.02rem] leading-[1.7] text-charcoal">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {block.type === "tbl" && (
              <div className="mb-[26px] overflow-x-auto border border-navy/[0.14] bg-[#fffdf7]">
                <div className="flex flex-col">
                  <div
                    className="grid gap-3.5 border-b border-navy/12 bg-navy/[0.05] px-[18px] py-[13px]"
                    style={{
                      gridTemplateColumns: `repeat(${block.head.length}, minmax(110px, 1fr))`,
                    }}
                  >
                    {block.head.map((cell, j) => (
                      <p
                        key={j}
                        className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase"
                      >
                        {cell}
                      </p>
                    ))}
                  </div>
                  {block.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className={`grid gap-3.5 px-[18px] py-[13px] ${
                        ri === block.rows.length - 1
                          ? ""
                          : "border-b border-navy/[0.08]"
                      }`}
                      style={{
                        gridTemplateColumns: `repeat(${block.head.length}, minmax(110px, 1fr))`,
                      }}
                    >
                      {row.map((cell, ci) => (
                        <p
                          key={ci}
                          className="text-[14.5px] leading-[1.6] text-charcoal"
                        >
                          {cell}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
