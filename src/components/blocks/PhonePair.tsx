import Image from "next/image";
import type { PhonePairProps } from "@/types/content";

/**
 * İki telefon çerçevesi ve arkalarında yukarı açılan Flare ışın (brand
 * book v3 §5 "Beam": sayfa başına en fazla bir kez, marker block ile aynı
 * sayfada değil). Board ölçüleri: masaüstü 520 × 540 alan, 210 × 432
 * telefonlar; mobil 335 × 380 alan, 146 × 300 telefonlar. Telefon
 * çerçevesi ve yuvarlak köşe marka kitabındaki iki istisnadan biri.
 */
export default function PhonePair({ screens, className }: PhonePairProps) {
  const [a, b] = screens;
  const phone =
    "absolute overflow-hidden rounded-[34px] border-[7px] border-ink bg-ink w-[146px] h-[300px] min-[900px]:w-[210px] min-[900px]:h-[432px]";

  return (
    <div className={`relative h-[380px] w-[335px] max-w-full min-[900px]:h-[540px] min-[900px]:w-[520px] ${className ?? ""}`}>
      <svg viewBox="0 0 520 540" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        <polygon points="260,540 63.5,0 456.5,0" className="fill-flare" />
      </svg>
      {a && (
        <div className={`${phone} top-4 left-7 min-[900px]:top-[30px] min-[900px]:left-12`}>
          <Image src={a.src} alt={a.alt} fill sizes="(min-width: 900px) 210px, 146px" className="object-cover" />
        </div>
      )}
      {b && (
        <div className={`${phone} top-[58px] left-[168px] min-[900px]:top-[94px] min-[900px]:left-[262px]`}>
          <Image src={b.src} alt={b.alt} fill sizes="(min-width: 900px) 210px, 146px" className="object-cover" />
        </div>
      )}
    </div>
  );
}
