import type { CSSProperties } from "react";
import { EIGHT_SLICES, slicePath } from "@/lib/dial";
import type { RingOutlineProps } from "@/types/content";

/**
 * Açılıştaki büyük halka (brand book v3 §5, "Hero ring"). Sekiz dilim
 * ince çizgi (Ring, 0.6 birim), iç yarıçap 35, sadece dokuzuncu dilim
 * Flare dolu. Boyutu kullanan yer verir: masaüstünde 700px, mobilde
 * 420px. Sayfa başına bir kez, sadece açılışta.
 *
 * `animate`: yüklemede çizgiler sırayla çizilir, sonra Flare dilim gelir
 * (brief §10, globals.css .ring-draw).
 */
export default function RingOutline({ className, animate = false }: RingOutlineProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`dial-live block overflow-visible ${animate ? "ring-draw" : ""} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      {EIGHT_SLICES.map((i) => (
        <path
          key={i}
          d={slicePath(i, 50, 35)}
          data-slice={i}
          pathLength={1}
          style={{ "--slice-i": i - 1 } as CSSProperties}
          fill="none"
          className="stroke-ring"
          strokeWidth="0.6"
        />
      ))}
      <path d={slicePath(9, 50, 35)} data-slice={9} className="slice-live fill-flare" />
    </svg>
  );
}
