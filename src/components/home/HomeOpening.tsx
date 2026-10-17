import CutHeadline from "@/components/brand/CutHeadline";
import CutButton from "@/components/brand/CutButton";
import Label from "@/components/brand/Label";
import Portrait from "@/components/brand/Portrait";
import RingOutline from "@/components/brand/RingOutline";
import TextLink from "@/components/brand/TextLink";
import HeroVideo from "@/components/home/HeroVideo";
import { heroPreviewSources } from "@/lib/heroVideo";
import type { HomeOpeningProps } from "@/types/content";

/** Telefonda halkanın iç yarıçapı: dış 146, iç 120 px (viewBox'ta dış 50). */
const PHONE_RING_INNER = (50 * 120) / 146;

/**
 * Ana sayfa açılışı (board Main / HomeMobile, brief v4 §7.2; tanıtım filmiyle
 * "FİNAL · Masaüstü" ve "FİNAL · Telefon"). About'un açılışı hâlâ RingStage.
 *
 * Masaüstü (900+): sol sütun 12'lik ızgaranın 8'i (1440'ta 860px; 1280
 * altında 7'si, halkaya değmesin). Halka 1440'ta 600px (dış yarıçap 300, iç
 * 211, portre 396), merkezi x 1250'de (genişliğin %86.8'i), sağı ekrandan
 * taşıp kesiliyor. Dar ekranda merkez, video düğmesi ekrandan taşmayacak
 * kadar sola çekiliyor (en fazla 100vw - 178px). Halka "Görüşme ayarla" satırına bağlı: merkezi
 * satırın ortasından portre yarıçapı kadar yukarıda, böylece portrenin alt
 * kenarına oturan video düğmesi her genişlikte butonla aynı hizada. Ölçüm ya
 * da JS yok, hiza CSS'ten geliyor.
 *
 * Telefon (900 altı): portre ve halka en üstte (292px kutu, portre 224), sonra
 * etiket, başlık, kısa metin ve tam genişlik buton. Halka kutusu buton
 * satırının içinde duruyor; telefonda o satır `display: contents` olup
 * sütunun sırasına (order-first) katılıyor. Tek portre, tek görsel isteği.
 */
export default function HomeOpening({ content, video, locale }: HomeOpeningProps) {
  const [first, ...rest] = content.eyebrowParts;
  const last = rest[rest.length - 1];
  // Uzun başlık (ör. TR tek cümle) bir kademe küçük: masaüstünde 78px.
  const long = content.headlineSentences.join(" ").length > 48;
  const size = long
    ? "text-[38px] min-[600px]:text-[48px] min-[900px]:text-[clamp(52px,5.417vw,78px)]"
    : "text-[38px] min-[600px]:text-[56px] min-[900px]:text-[clamp(64px,6.667vw,96px)]";
  const hasVideo = video.youtubeId !== "";

  const portrait = (
    <Portrait
      alt={content.portraitAlt}
      src={content.portraitSrc}
      priority
      sizes="(min-width: 900px) 28vw, 224px"
      className="hero-portrait-in absolute inset-0 z-[1]"
    />
  );

  return (
    <section className="on-ink relative overflow-hidden bg-ink pt-[76px] pb-14 min-[900px]:pt-[84px] min-[900px]:pb-24">
      <div className="px-5 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6 min-[900px]:px-8 min-[1280px]:px-16">
        <div className="flex flex-col gap-4 min-[900px]:col-span-7 min-[900px]:gap-8 min-[900px]:pt-[112px] min-[1280px]:col-span-8">
          <Label ground="ink">
            <span className="min-[900px]:hidden">{[first, last].join(" · ")}</span>
            <span className="hidden min-[900px]:inline">{content.eyebrowParts.join(" · ")}</span>
          </Label>
          <CutHeadline
            headlineSentences={content.headlineSentences}
            cutWord={content.cutWord}
            className={`m-0 font-display leading-[0.98] font-extrabold tracking-[-0.04em] text-paper min-[900px]:leading-[1.02] ${size}`}
          />
          <p className="m-0 text-[16px] leading-[1.5] text-paper min-[900px]:hidden">{content.heroTextMobile}</p>
          <p className="m-0 hidden max-w-[600px] text-[19px] leading-[1.6] text-paper min-[900px]:block">{content.intro}</p>
          <div className="max-[900px]:contents min-[900px]:relative min-[900px]:mt-2">
            <div className="relative mx-auto size-[292px] flex-none max-[900px]:order-first min-[900px]:absolute min-[900px]:top-[calc(50%-0.83*min(41.667vw,720px))] min-[900px]:left-[calc(min(86.806vw,100vw-178px)-min(20.833vw,360px)-32px)] min-[900px]:m-0 min-[900px]:size-[min(41.667vw,720px)] min-[1280px]:left-[calc(min(86.806vw,100vw-178px)-min(20.833vw,360px)-64px)]">
              <RingOutline animate inner={PHONE_RING_INNER} className="absolute inset-0 size-full min-[900px]:hidden" />
              <RingOutline animate className="absolute inset-0 hidden size-full min-[900px]:block" />
              <div className="absolute inset-[34px] z-[2] min-[900px]:inset-[17%]">
                {hasVideo ? (
                  <HeroVideo video={video} preview={heroPreviewSources(locale)}>
                    {portrait}
                  </HeroVideo>
                ) : (
                  portrait
                )}
              </div>
            </div>
            <div className="flex flex-col items-start gap-5 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-8">
              <CutButton
                label={content.ctaLabel}
                className="max-[900px]:h-[54px] max-[900px]:w-full max-[900px]:justify-center max-[900px]:py-0"
              />
              <TextLink href="/services" label={content.secondaryLinkLabel} ground="ink" />
            </div>
          </div>
          {content.proof && (
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-8 gap-y-4 border-t border-track p-0 pt-6 min-[900px]:mt-4 min-[900px]:gap-x-6 min-[900px]:pt-7 min-[1280px]:gap-x-10">
              {content.proof.map((figure) => (
                <li key={figure.label} className="flex items-baseline gap-[10px] whitespace-nowrap">
                  <span className="font-display text-[26px] leading-none font-extrabold tracking-[-0.02em] text-paper min-[900px]:text-[30px]">
                    {figure.value}
                  </span>
                  <span className="font-mono text-[11px] leading-[1.3] font-medium tracking-[0.08em] text-dust uppercase">{figure.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
