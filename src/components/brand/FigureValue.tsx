import { splitFigureUnit } from "@/lib/format";
import type { FigureValueProps } from "@/types/content";

/**
 * Büyük rakam. Sondaki kelime birimi ("months", "ay") aynı satırda,
 * taban çizgisinde ve küçük: "6 months" iki satıra kırılıp yandaki
 * rakamlardan uzun durmasın.
 */
export default function FigureValue({ value }: FigureValueProps) {
  const { main, unit } = splitFigureUnit(value);
  if (!unit) return <>{value}</>;
  return (
    <span className="whitespace-nowrap">
      {main}
      <span className="figure-unit">{unit}</span>
    </span>
  );
}
