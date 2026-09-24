import Portrait from "@/components/brand/Portrait";
import RingOutline from "@/components/brand/RingOutline";
import type { RingStageProps } from "@/types/content";

/**
 * Halka ve portreli Ink açılış (brand book v3 §5 "Hero ring", board Main /
 * About ve mobilleri). Sayfa başına bir kez, sadece açılışta. Portre çapı
 * halkanın %66.57'si (466/700), tam iç deliğe oturuyor. Masaüstü 1280+
 * board ölçüleri; 900-1279 halka genişlikle küçülüyor; 900 altı mobil
 * board: metin üstte, halka ve portre 452px'lik kesilmiş blokta.
 */
export default function RingStage({ portraitAlt, portraitSrc, children, textClassName, ringClassName = "mt-10" }: RingStageProps) {
  return (
    <section className="on-ink relative overflow-hidden bg-ink pt-16 min-[900px]:min-h-[900px] min-[900px]:pt-[84px] min-[900px]:pb-24">
      {/* Izgara tam genişlikte halkanın üstünde: fare olaylarını halkaya
          geçiriyor (dokuzuncu dilimin hover'ı), metin sütunu tıklanabilir. */}
      <div className="pointer-events-none relative z-[2] px-5 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6 min-[900px]:px-8 min-[1280px]:px-16">
        <div className={`pointer-events-auto flex flex-col min-[900px]:col-span-7 ${textClassName}`}>{children}</div>
      </div>
      <div
        className={`relative mx-5 h-[452px] [clip-path:inset(-24px_0_0_0)] min-[900px]:absolute min-[900px]:inset-0 min-[900px]:mx-0 min-[900px]:mt-0 min-[900px]:h-auto ${ringClassName}`}
      >
        <div className="absolute top-0 left-[-10px] size-[420px] min-[900px]:top-[112px] min-[900px]:right-[-5.833vw] min-[900px]:left-auto min-[900px]:size-[clamp(460px,48.61vw,700px)]">
          <RingOutline animate className="absolute inset-0 z-[1] size-full" />
          <Portrait
            alt={portraitAlt}
            src={portraitSrc}
            priority
            sizes="(min-width: 1440px) 466px, (min-width: 900px) 33vw, 278px"
            className="portrait-in absolute inset-[16.714%] z-[2]"
          />
        </div>
      </div>
    </section>
  );
}
