import CutHeadline from "@/components/brand/CutHeadline";
import CutButton from "@/components/brand/CutButton";
import Label from "@/components/brand/Label";
import Portrait from "@/components/brand/Portrait";
import RingOutline from "@/components/brand/RingOutline";
import TextLink from "@/components/brand/TextLink";
import type { HomeContent } from "@/types/content";

interface HomeOpeningProps {
  content: HomeContent["opening"];
}

/**
 * Ana sayfa açılışı (board Main / HomeMobile, brief v4 §7.2). Ink zemin,
 * sağda büyük halka ve tam iç deliğine oturan portre (portre çapı halkanın
 * %66.57'si: 466/700, board'daki oran). Header fixed olduğu için bölüm
 * header yüksekliği kadar üst boşlukla başlıyor.
 *
 * Masaüstü (1280+) board ölçüleri birebir. 900-1279 arasında başlık ve
 * halka ekran genişliğiyle orantılı küçülüyor. 900 altı mobil board:
 * metin üstte, halka ve portre altta.
 */
export default function HomeOpening({ content }: HomeOpeningProps) {
  const [first, ...rest] = content.eyebrowParts;
  const last = rest[rest.length - 1];

  return (
    <section className="on-ink relative overflow-hidden bg-ink pt-16 min-[900px]:h-[900px] min-[900px]:pt-[84px]">
      <div className="relative z-[2] px-5 pt-12 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6 min-[900px]:px-8 min-[900px]:pt-[112px] min-[1280px]:px-16">
        <div className="flex flex-col gap-6 min-[900px]:col-span-7 min-[900px]:gap-8">
          <Label ground="ink">
            <span className="min-[900px]:hidden">{[first, last].join(" · ")}</span>
            <span className="hidden min-[900px]:inline">{content.eyebrowParts.join(" · ")}</span>
          </Label>
          <CutHeadline
            headlineSentences={content.headlineSentences}
            cutWord={content.cutWord}
            className="m-0 font-display text-[42px] leading-[0.98] font-extrabold tracking-[-0.04em] text-paper min-[600px]:text-[56px] min-[900px]:text-[clamp(64px,6.667vw,96px)] min-[900px]:leading-[0.95]"
          />
          <p className="m-0 text-[17px] leading-[1.5] text-paper min-[900px]:max-w-[540px] min-[900px]:text-[19px]">
            {content.intro}
          </p>
          <div className="mt-1 flex flex-col items-start gap-6 min-[900px]:mt-2 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-8">
            <CutButton label={content.ctaLabel} />
            <TextLink href="/services" label={content.secondaryLinkLabel} ground="ink" />
          </div>
        </div>
      </div>

      {/* Halka ve portre. Mobilde akış içinde 452px'lik kesilmiş blok,
          masaüstünde bölümün sağına yaslı. */}
      <div className="relative mx-5 mt-10 h-[452px] overflow-hidden min-[900px]:absolute min-[900px]:inset-0 min-[900px]:mx-0 min-[900px]:mt-0 min-[900px]:h-auto">
        <div className="absolute top-0 left-[-10px] size-[420px] min-[900px]:top-[112px] min-[900px]:right-[-5.833vw] min-[900px]:left-auto min-[900px]:size-[clamp(460px,48.61vw,700px)]">
          <RingOutline animate className="absolute inset-0 z-[1] size-full" />
          <Portrait
            alt={content.portraitAlt}
            priority
            sizes="(min-width: 1440px) 466px, (min-width: 900px) 33vw, 278px"
            className="portrait-in absolute inset-[16.714%] z-[2]"
          />
        </div>
      </div>
    </section>
  );
}
