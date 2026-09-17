import RibbonCountUp from "@/components/spark/RibbonCountUp";
import type { SparkRibbonItem } from "@/types/content";

interface SparkRibbonProps {
  items: SparkRibbonItem[];
}

/**
 * Hesaplanamayan bir rakam diziden zaten ÇIKARILMIŞ oluyor (bkz.
 * queries.ts:toSparkRibbon) — burada sadece render var. flex-wrap:
 * dar ekranda yan yana kaydırma yerine alt alta sarıyor (bkz. kabul
 * kriteri).
 */
export default function SparkRibbon({ items }: SparkRibbonProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-9 flex flex-wrap gap-x-8 gap-y-2">
      {items.map((item) => (
        <p key={item.label} className="font-mono text-sm tracking-[0.03em] text-ivory/65">
          <span className="text-ivory">
            <RibbonCountUp value={item.value} />
          </span>{" "}
          {item.label}
        </p>
      ))}
    </div>
  );
}
