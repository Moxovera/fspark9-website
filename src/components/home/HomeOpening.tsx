import CutHeadline from "@/components/brand/CutHeadline";
import CutButton from "@/components/brand/CutButton";
import Label from "@/components/brand/Label";
import TextLink from "@/components/brand/TextLink";
import RingStage from "@/components/blocks/RingStage";
import type { HomeOpeningProps } from "@/types/content";

/**
 * Ana sayfa açılışı (board Main / HomeMobile, brief v4 §7.2): halka ve
 * portre sahnesi, etiket (mobilde ilk ve son parça), cümle cümle başlık,
 * metin, randevu butonu ve hizmetler linki.
 */
export default function HomeOpening({ content }: HomeOpeningProps) {
  const [first, ...rest] = content.eyebrowParts;
  const last = rest[rest.length - 1];

  return (
    <RingStage portraitAlt={content.portraitAlt} portraitSrc={content.portraitSrc} textClassName="gap-6 pt-12 min-[900px]:gap-8 min-[900px]:pt-[112px]">
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
    </RingStage>
  );
}
