import Image from "next/image";
import type { PhonePairProps } from "@/types/content";

/**
 * İki telefon çerçevesi ve arkalarında yukarı açılan Flare ışın (brand
 * book v3 §5 "Beam": sayfa başına en fazla bir kez, marker block ile aynı
 * sayfada değil). Board ölçüleri: masaüstü 520 x 540 alan, 210 x 432
 * telefonlar; mobil 335 x 380 alan, 146 x 300 telefonlar. Telefon
 * çerçevesi ve yuvarlak köşe marka kitabındaki iki istisnadan biri.
 */
export default function PhonePair({ screens, className }: PhonePairProps) {
  const [a, b] = screens;
  // Ölçüler alanın yüzdesi (mobil 335 x 380, 900 üstü 520 x 540): alan
  // board'dan dar kaldığında (335 altı, 900 ile 1440 arası) telefonlar
  // taşmak yerine birlikte küçülür, board genişliklerinde px'i px'ine aynı.
  const phone =
    "absolute overflow-hidden rounded-[34px] border-[7px] border-ink bg-ink w-[43.582%] h-[78.947%] min-[900px]:w-[40.385%] min-[900px]:h-[80%]";

  return (
    <div className={`relative aspect-[335/380] w-[335px] max-w-full min-[900px]:aspect-[520/540] min-[900px]:w-[520px] ${className ?? ""}`}>
      <svg viewBox="0 0 520 540" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        <polygon points="260,540 63.5,0 456.5,0" className="fill-flare" />
      </svg>
      {a && (
        <div className={`${phone} top-[4.211%] left-[8.358%] min-[900px]:top-[5.556%] min-[900px]:left-[9.231%]`}>
          <Image src={a.src} alt={a.alt} fill sizes="(min-width: 900px) 210px, 146px" className="object-cover" />
        </div>
      )}
      {b && (
        <div className={`${phone} top-[15.263%] left-[50.149%] min-[900px]:top-[17.407%] min-[900px]:left-[50.385%]`}>
          <Image src={b.src} alt={b.alt} fill sizes="(min-width: 900px) 210px, 146px" className="object-cover" />
        </div>
      )}
    </div>
  );
}
