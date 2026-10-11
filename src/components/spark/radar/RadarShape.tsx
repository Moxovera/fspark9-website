import { RADAR_RINGS, RADAR_SIGNALS, radarLabelPosition, radarPoint, radarPolygon, radarRing } from "@/lib/radar";
import type { RadarShapeProps } from "@/types/content";

/**
 * Beş eksenli radar: üç halka, eksenler, değerlerin poligonu (Flare dolgu,
 * Ink çizgi), isteğe bağlı kare noktalar ve eksen etiketleri. Format
 * sayfasındaki büyük radar, bölümün panosu, taşıyıcı taş oyunu ve tam
 * resim hepsi bunu çizer. Saf çizim: değerleri verene bakar. `tone="paper"`
 * Ink zeminde (panodaki açma düğmesi) çizgileri Paper yapar.
 */
export default function RadarShape({ values, labels, lit, radius, viewBox, dots = false, className, tone = "ink", title }: RadarShapeProps) {
  const onInk = tone === "paper";
  const hasShape = RADAR_SIGNALS.some((signal) => values[signal] > 0);
  return (
    <svg viewBox={viewBox} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true} className={className}>
      {RADAR_RINGS.map((ratio) => (
        <polygon key={ratio} points={radarRing(ratio, radius)} className={`fill-none stroke-1 ${onInk ? "stroke-paper/30" : "stroke-rule"}`} />
      ))}
      {RADAR_SIGNALS.map((signal, i) => {
        const [x, y] = radarPoint(i, 1, radius);
        return <line key={signal} x1={0} y1={0} x2={x} y2={y} className={`stroke-1 ${onInk ? "stroke-paper/30" : "stroke-rule"}`} />;
      })}
      {hasShape && (
        <polygon
          points={radarPolygon(values, radius)}
          className={`fill-flare stroke-2 [stroke-linejoin:miter] ${onInk ? "stroke-paper" : "stroke-ink"}`}
        />
      )}
      {dots &&
        RADAR_SIGNALS.map((signal, i) => {
          if (values[signal] <= 0) return null;
          const [x, y] = radarPoint(i, values[signal], radius);
          return <rect key={signal} x={x - 3} y={y - 3} width={6} height={6} className="fill-ink" />;
        })}
      {labels &&
        RADAR_SIGNALS.map((signal, i) => {
          const { x, y, anchor } = radarLabelPosition(i, radius);
          const on = lit ? Boolean(lit[signal]) : true;
          return (
            <text
              key={signal}
              x={x}
              y={y}
              textAnchor={anchor}
              className={`font-mono text-[10px] tracking-[0.06em] ${on ? "fill-ink" : "fill-stone"}`}
            >
              {labels[signal]}
            </text>
          );
        })}
    </svg>
  );
}
