import Image from "next/image";
import type { CasePhonesProps } from "@/types/content";

/**
 * Vaka açılışındaki iki telefon (board CaseInsha: 480 x 470 alan, 210 x
 * 432 telefonlar; mobil 330px yükseklik, 146 x 300). Işın yok: bu sayfada
 * marker block var, ikisi aynı sayfada olmaz (brand book §5). Ekranlar
 * Sanity'deki caseStudy.screens'ten.
 */
export default function CasePhones({ screens, className }: CasePhonesProps) {
  const [a, b] = screens;
  // Board 1440'ta 480'lik alan 421px'lik kolona sıkışır, ikinci telefon
  // kolonun 39px dışına, kenar boşluğuna taşar. 900 ile 1440 arası ölçüler
  // telefonların kapladığı 460 x 470 alanın yüzdesi: 1280 altında (kenar
  // boşluğu 32px) alan kolona sığar, 1280 üstünde board'daki gibi taşar;
  // 1440'tan itibaren board'un px değerleri. Mobilde 335 x 330 alanın
  // yüzdesi, 335 altında da sığsın diye.
  const phone =
    "absolute overflow-hidden rounded-[34px] border-[7px] border-ink bg-ink w-[43.582%] h-[90.909%] min-[900px]:w-[45.652%] min-[900px]:h-[91.915%] min-[1440px]:w-[210px] min-[1440px]:h-[432px]";
  return (
    <div
      className={`relative aspect-[335/330] max-w-[335px] min-[900px]:aspect-[460/470] min-[900px]:w-full min-[900px]:max-w-none min-[1280px]:-mr-[9.18%] min-[1280px]:w-[109.18%] min-[1280px]:shrink-0 min-[1440px]:mr-0 min-[1440px]:aspect-auto min-[1440px]:h-[470px] min-[1440px]:w-[480px] min-[1440px]:shrink ${className ?? ""}`}
    >
      {a && (
        <div className={`${phone} top-0 left-[5.970%] min-[900px]:left-[4.348%] min-[1440px]:left-5`}>
          <Image src={a.url} alt={a.alt} fill sizes="(min-width: 900px) 210px, 146px" className="object-cover" />
        </div>
      )}
      {b && (
        <div className={`${phone} top-[8.485%] left-[50.149%] min-[900px]:top-[10.213%] min-[900px]:left-[54.348%] min-[1440px]:top-12 min-[1440px]:left-[250px]`}>
          <Image src={b.url} alt={b.alt} fill sizes="(min-width: 900px) 210px, 146px" className="object-cover" />
        </div>
      )}
    </div>
  );
}
