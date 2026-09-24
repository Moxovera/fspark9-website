import { EIGHT_SLICES, slicePath } from "@/lib/dial";
import type { RingOutlineProps } from "@/types/content";

/**
 * Açılıştaki büyük halka (brand book v3 §5, "Hero ring"). Sekiz dilim
 * ince çizgi (Ring, 0.6 birim), iç yarıçap 35, sadece dokuzuncu dilim
 * Flare dolu. Boyutu kullanan yer verir: masaüstünde 700px, mobilde
 * 420px. Sayfa başına bir kez, sadece açılışta.
 *
 * Çizgiler `data-slice` taşıyor: yükleme animasyonu (stroke-dashoffset,
 * brief §10) Geçiş C'de bu attribute'a bağlanacak.
 */
export default function RingOutline({ className }: RingOutlineProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`block overflow-visible ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      {EIGHT_SLICES.map((i) => (
        <path
          key={i}
          d={slicePath(i, 50, 35)}
          data-slice={i}
          fill="none"
          className="stroke-ring"
          strokeWidth="0.6"
        />
      ))}
      <path d={slicePath(9, 50, 35)} data-slice={9} className="fill-flare" />
    </svg>
  );
}
