import Image from "next/image";
import type { SanityImage } from "@/types/content";

interface CasePhonesProps {
  screens: SanityImage[];
  className?: string;
}

/**
 * Vaka açılışındaki iki telefon (board CaseInsha: 480 x 470 alan, 210 x
 * 432 telefonlar; mobil 330px yükseklik, 146 x 300). Işın yok: bu sayfada
 * marker block var, ikisi aynı sayfada olmaz (brand book §5). Ekranlar
 * Sanity'deki caseStudy.screens'ten.
 */
export default function CasePhones({ screens, className }: CasePhonesProps) {
  const [a, b] = screens;
  const phone =
    "absolute overflow-hidden rounded-[34px] border-[7px] border-ink bg-ink w-[146px] h-[300px] min-[900px]:w-[210px] min-[900px]:h-[432px]";
  return (
    <div className={`relative h-[330px] min-[900px]:h-[470px] min-[900px]:w-[480px] ${className ?? ""}`}>
      {a && (
        <div className={`${phone} top-0 left-5`}>
          <Image src={a.url} alt={a.alt} fill sizes="(min-width: 900px) 210px, 146px" className="object-cover" />
        </div>
      )}
      {b && (
        <div className={`${phone} top-7 left-[168px] min-[900px]:top-12 min-[900px]:left-[250px]`}>
          <Image src={b.url} alt={b.alt} fill sizes="(min-width: 900px) 210px, 146px" className="object-cover" />
        </div>
      )}
    </div>
  );
}
