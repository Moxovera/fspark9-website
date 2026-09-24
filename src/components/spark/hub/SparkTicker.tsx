import type { CSSProperties } from "react";
import Marquee from "@/components/effects/Marquee";
import type { SparkTickerProps } from "@/types/content";

/**
 * Spark açılışının kayan şeridi (brief v4 §7.7, board SparkIndex): sayılar
 * ve son parça, aralarında Dust eğik çizgi. Üzerine gelince şerit durur
 * ve yazılar kıvılcım gibi titreyip Flare'e döner (globals.css
 * .ticker-spark); çekilince beyaza dönüp yeniden hızlanır. Döngü görünmesin
 * diye liste iki kez; ikinci kopya ekran okuyuculardan gizli.
 */
export default function SparkTicker({ items }: SparkTickerProps) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex flex-none gap-[18px] pr-[18px] min-[900px]:gap-7 min-[900px]:pr-7">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex flex-none gap-[18px] min-[900px]:gap-7">
          <span className="ticker-item whitespace-nowrap" style={{ "--i": i } as CSSProperties}>
            {item}
          </span>
          <span aria-hidden="true" className="text-dust">
            /
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <Marquee className="ticker-spark overflow-hidden border-t border-inkrule bg-ink py-4 font-mono text-[12px] leading-[normal] font-medium tracking-[0.1em] text-paper uppercase min-[900px]:py-[22px] min-[900px]:text-[14px]">
      <div className="flex pl-5 min-[900px]:pl-16">
        {row(false)}
        {row(true)}
      </div>
    </Marquee>
  );
}
