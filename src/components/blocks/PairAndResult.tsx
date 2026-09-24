import Dial from "@/components/brand/Dial";
import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";
import type { ReactNode } from "react";

interface StoryCardContent {
  label: string;
  lead?: string;
  body?: string;
  /** Madde listesi (7px Ink kareler, numara yok). */
  items?: string[];
}

interface PairAndResultProps {
  pair: StoryCardContent[];
  result: StoryCardContent;
  /** Sonuç kartındaki tam kadranın yanık dilimleri. */
  slices: readonly number[];
  /** Kartların altına (ör. kaynak satırı). */
  footer?: ReactNode;
}

/**
 * Pair and result (brand book v3 §6, board CaseInsha / About): iki White
 * story card yan yana (2px Ink üst çizgi), altında daha geniş sonuç kartı
 * (4px Ink çizgi, tam kadran, daha büyük ilk cümle). Mobilde alt alta.
 */
export default function PairAndResult({ pair, result, slices, footer }: PairAndResultProps) {
  return (
    <section className="bg-paper px-5 pt-14 pb-16 min-[900px]:px-8 min-[900px]:pt-[112px] min-[900px]:pb-24 min-[1280px]:px-16">
      <Reveal className="flex flex-col gap-6 min-[900px]:gap-8">
        <div className="flex flex-col gap-4 min-[900px]:gap-8">
          <div className="flex flex-col gap-4 min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:gap-6">
            {pair.map((card) => (
              <div key={card.label} className="flex flex-col gap-4 border-t-2 border-ink bg-white px-5 pt-6 pb-7 min-[900px]:gap-5 min-[900px]:px-8 min-[900px]:pt-8 min-[900px]:pb-10">
                <Label strong>{card.label}</Label>
                {card.lead && (
                  <p className="m-0 font-display text-[22px] leading-[1.2] font-bold tracking-[-0.02em] text-ink min-[900px]:text-[26px]">
                    {card.lead}
                  </p>
                )}
                {card.body && <p className="m-0 text-[16px] leading-[1.6] text-ink min-[900px]:text-[17px]">{card.body}</p>}
                {card.items && (
                  <ul className="m-0 flex list-none flex-col p-0">
                    {card.items.map((item, i) => (
                      <li key={item} className={`flex gap-[14px] py-3 ${i > 0 ? "border-t border-rule" : ""}`}>
                        <span aria-hidden="true" className="mt-[9px] size-[7px] flex-none bg-ink" />
                        <span className="text-[15px] leading-[1.55] text-ink min-[900px]:text-[16px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[14px] border-t-4 border-ink bg-white px-5 pt-6 pb-7 min-[900px]:mt-6 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-x-6 min-[900px]:px-10 min-[900px]:pt-10 min-[900px]:pb-11">
            <div className="dial-fill-result flex items-center gap-3 min-[900px]:col-span-2">
              <Dial lit={slices} size={32} className="min-[900px]:size-28" />
              <Label strong className="min-[900px]:hidden">
                {result.label}
              </Label>
            </div>
            <div className="flex flex-col gap-[14px] min-[900px]:col-span-10 min-[900px]:col-start-3">
              <Label strong className="hidden min-[900px]:block">
                {result.label}
              </Label>
              {result.lead && (
                <p className="m-0 max-w-[900px] font-display text-[26px] leading-[1.12] font-extrabold tracking-[-0.025em] text-ink min-[900px]:text-[40px] min-[900px]:leading-[1.08] min-[900px]:tracking-[-0.03em]">
                  {result.lead}
                </p>
              )}
              {result.body && (
                <p className="m-0 max-w-[720px] text-[16px] leading-[1.6] text-ink min-[900px]:text-[17px]">{result.body}</p>
              )}
            </div>
          </div>
        </div>
        {footer}
      </Reveal>
    </section>
  );
}
