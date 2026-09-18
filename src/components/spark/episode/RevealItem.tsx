import type { SparkInlineReading } from "@/types/content";

interface RevealItemProps {
  item: SparkInlineReading;
  readingLabel: string;
}

/**
 * TheCall/TheWeigh/TheSignal/TheSecondOpinion/TheAllocation'ın reveal'ında
 * gömülü reading — kendi date'i yok (mekaniğin date'i zaten üstte
 * gösteriliyor), ama Part 0 kural 3 gereği yine de READING etiketini ve
 * çizgi stilini taşımak ZORUNDA.
 */
export default function RevealItem({ item, readingLabel }: RevealItemProps) {
  return (
    <div className="border-l-[3px] border-bronze py-1 pl-5">
      <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">{readingLabel}</p>
      <h4 className="mb-1.5 font-display text-lg font-medium text-charcoal">{item.heading}</h4>
      <p className="text-[0.98rem] leading-[1.6] text-charcoal/85">{item.body}</p>
    </div>
  );
}
