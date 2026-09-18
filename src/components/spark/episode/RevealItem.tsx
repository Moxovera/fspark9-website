import type { SparkRevealItem } from "@/types/content";

interface RevealItemProps {
  item: SparkRevealItem;
  readingLabel: string;
  gapLabel: string;
}

/**
 * TheCall/TheWeigh/TheSignal/TheAllocation'ın reveal'ında gömülü
 * reading/gap — kendi date'i yok (mekaniğin date'i zaten üstte
 * gösteriliyor), ama Part 0 kural 3 gereği yine de READING/GAP
 * etiketini ve çizgi stilini taşımak ZORUNDA, gömülü olması onu
 * ayırt edilemez yapmaz.
 */
export default function RevealItem({ item, readingLabel, gapLabel }: RevealItemProps) {
  if (item._type === "sparkInlineGap") {
    return (
      <div className="border-l-[3px] border-dashed border-muted py-1 pl-5">
        <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{gapLabel}</p>
        <h4 className="mb-1.5 font-display text-lg font-medium text-charcoal">{item.heading}</h4>
        <p className="text-[0.98rem] leading-[1.6] text-charcoal/85">{item.body}</p>
        {item.whereItWouldBe && (
          <p className="mt-2 font-mono text-xs tracking-[0.02em] text-muted">{item.whereItWouldBe}</p>
        )}
      </div>
    );
  }

  return (
    <div className="border-l-[3px] border-bronze py-1 pl-5">
      <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">{readingLabel}</p>
      <h4 className="mb-1.5 font-display text-lg font-medium text-charcoal">{item.heading}</h4>
      <p className="text-[0.98rem] leading-[1.6] text-charcoal/85">{item.body}</p>
    </div>
  );
}
