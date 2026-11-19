import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import SmeReading from "@/components/spark/report/sme/SmeReading";
import UkTableBlock from "@/components/spark/report/uk/UkTableBlock";
import UkTabsBlock from "@/components/spark/report/uk/UkTabsBlock";
import { MinusIcon, PlusIcon } from "@/components/icons";
import type { UkAccordionProps, UkBlocksProps, UkStatsProps } from "@/types/content";

export const blockTitle = "m-0 mb-4 font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] font-extrabold tracking-[-0.02em]";
export const tagText = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";

/** Dört rakam (telefonda iki), kalın üst çizgi. */
export function UkStats({ items, template, ground = "paper" }: UkStatsProps) {
  const ink = ground === "ink";
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 min-[901px]:grid-cols-4">
      {items.map((s) => (
        <div key={s.value + s.label} className={`grid content-start gap-2 border-t-[3px] pt-3 ${ink ? "border-paper" : "border-ink"}`}>
          <b className="font-display text-[clamp(32px,3.6vw,44px)] leading-none font-extrabold tracking-[-0.03em]">{s.value}</b>
          <span className={`text-[14.5px] leading-[1.45] ${ink ? "text-dust" : "text-stone"}`}>
            <Psd3Text text={s.label} template={template} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Akordeon: yerel <details>, kapalı başlar, artı/eksi işareti. */
export function UkAccordion({ items, template }: UkAccordionProps) {
  return (
    <div className="border-b border-rule">
      {items.map((x) => (
        <details key={x.title} className="group border-t border-rule">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[18px] leading-[1.3] font-bold [&::-webkit-details-marker]:hidden">
            {x.title}
            <PlusIcon className="size-5 flex-none text-stone group-open:hidden" />
            <MinusIcon className="hidden size-5 flex-none text-stone group-open:block" />
          </summary>
          <p className="mt-0 mb-5 max-w-[82ch] text-[16px] text-stone">
            <Psd3Text text={x.text} template={template} />
          </p>
        </details>
      ))}
    </div>
  );
}

/**
 * 06 ile 11 arası bölümlerin ortak blokları, metin dosyasındaki sırayla:
 * rakamlar, tablo, çipler, kartlar, akordeon, sekmeler ve "Bizim okumamız"
 * notu. Her blok tipi tek bileşen.
 */
export default function UkBlocks({ blocks, readingLabel, template, tone }: UkBlocksProps) {
  const card = tone === "white" ? "bg-paper" : "bg-white";
  return (
    <div className="grid gap-[clamp(36px,5vw,56px)]">
      {blocks.map((b, i) => {
        const key = `${b.type}-${i}`;
        const title = "title" in b && b.title ? <h3 className={blockTitle}>{b.title}</h3> : null;
        switch (b.type) {
          case "stats":
            return <UkStats key={key} items={b.items} template={template} />;
          case "table":
            return (
              <div key={key} className="min-w-0">
                {title}
                <UkTableBlock block={b} template={template} tone={tone} />
              </div>
            );
          case "chips":
            return (
              <div key={key}>
                {title}
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {b.items.map((c) => (
                    <li key={c.label} className={`border border-rule px-3.5 py-2.5 text-[15px] font-semibold ${card}`}>
                      {c.label}
                      {c.detail && (
                        <small className="mt-0.5 block text-[13px] font-normal text-stone">
                          <Psd3Text text={c.detail} template={template} />
                        </small>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "cards":
            return (
              <div key={key}>
                {title}
                <div className={`grid grid-cols-1 gap-3.5 ${b.columns === 2 ? "min-[901px]:grid-cols-2" : "min-[901px]:grid-cols-3"}`}>
                  {b.items.map((c) => (
                    <article key={c.title} className={`grid min-w-0 content-start gap-2 border-t-2 border-ink p-[clamp(18px,2.4vw,24px)] ${card}`}>
                      {c.tag && (
                        <span className={`${tagText} justify-self-start px-2 py-[3px] ${b.verdicts ? "bg-flare text-ink" : "border border-rule text-stone"}`}>{c.tag}</span>
                      )}
                      <h4 className="m-0 font-display text-[20px] leading-[1.2] font-extrabold tracking-[-0.01em]">{c.title}</h4>
                      {c.who && (
                        <p className="m-0 text-[15px]">
                          <Psd3Text text={c.who} template={template} />
                        </p>
                      )}
                      <p className="m-0 text-[15.5px] text-stone">
                        <Psd3Text text={c.text} template={template} />
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            );
          case "accordion":
            return (
              <div key={key}>
                {title}
                <UkAccordion items={b.items} template={template} />
              </div>
            );
          case "tabs":
            return <UkTabsBlock key={key} block={b} template={template} tone={tone} />;
          case "note":
            return <SmeReading key={key} label={readingLabel} text={b.text} template={template} className="max-w-[860px]" />;
        }
      })}
    </div>
  );
}
