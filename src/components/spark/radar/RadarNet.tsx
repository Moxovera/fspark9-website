"use client";

import { useEffect, useState } from "react";
import { RADAR_RINGS, RADAR_SIGNALS, radarLabelPosition, radarPoint, radarRing, randomNet, type NetShape } from "@/lib/radar";
import type { RadarNetProps } from "@/types/content";

const RADIUS = 110;

/**
 * Format sayfasının Ink açılışındaki radar çizimi: beş eksen, üç halka,
 * etiketler. Bir kez çalışan kısa bir hareket: Flare bir çizgi (yılan)
 * merkezden çıkıp yedi rastgele halka noktasından geçer ve kaybolur, sonra
 * makul bir şirket şekli çizilir ve hafif Flare ile dolar. Şekil her
 * görünümde yeni, hiçbir yerde saklanmaz; hareket döngüye girmez. Sunucu
 * ve istemci aynı işaretlemeyi vermek için yılan ve şekil mount'tan sonra
 * eklenir. reduced-motion'da yılan yok, şekil hemen görünür (CSS).
 * Dekoratif.
 */
export default function RadarNet({ labels }: RadarNetProps) {
  const [net, setNet] = useState<NetShape | null>(null);
  useEffect(() => {
    setNet(randomNet(RADIUS));
  }, []);

  return (
    <svg viewBox="-210 -150 420 300" aria-hidden="true" className="h-auto w-full max-w-[440px]">
      {RADAR_RINGS.map((ratio) => (
        <polygon key={ratio} points={radarRing(ratio, RADIUS)} className="fill-none stroke-paper/16 stroke-1" />
      ))}
      {RADAR_SIGNALS.map((signal, i) => {
        const [x, y] = radarPoint(i, 1, RADIUS);
        return <line key={signal} x1={0} y1={0} x2={x} y2={y} className="stroke-paper/16 stroke-1" />;
      })}
      {net && (
        <>
          <path className="rd-snake" pathLength={1000} d={net.snake} />
          <polygon className="rd-final" pathLength={1000} points={net.shape} />
        </>
      )}
      {RADAR_SIGNALS.map((signal, i) => {
        const { x, y, anchor } = radarLabelPosition(i, RADIUS);
        return (
          <text key={signal} x={x} y={y} textAnchor={anchor} className="fill-dust font-mono text-[10px] tracking-[0.06em]">
            {labels[signal]}
          </text>
        );
      })}
    </svg>
  );
}
