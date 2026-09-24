import { Link } from "@/i18n/navigation";
import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";
import TextLink from "@/components/brand/TextLink";
import { ArrowRightIcon } from "@/components/icons";
import type { HomeContent, SparkCardContent } from "@/types/content";

interface SparkCardsProps {
  content: HomeContent["spark"];
}

/**
 * Ana sayfa Spark bölümü (board Main #spark / HomeMobile). En son üç
 * sayı kart olarak, mobilde iki. İlk kart masaüstünde büyük (6 sütun,
 * 72px başlık). Yayındaki kart bölüme gider, gelecek kartlar link değil.
 */
export default function SparkCards({ content }: SparkCardsProps) {
  return (
    <section className="bg-white px-5 pt-16 pb-14 min-[900px]:px-8 min-[900px]:py-[136px] min-[1280px]:px-16">
      <Reveal className="flex flex-col gap-8 min-[900px]:gap-14">
        <div className="flex flex-col gap-4 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-end min-[900px]:gap-x-6">
          <div className="flex flex-col gap-4 min-[900px]:col-span-8 min-[900px]:gap-5">
            <Label>{content.label}</Label>
            <h2 className="m-0 font-display text-[36px] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink min-[900px]:text-[56px] min-[900px]:leading-none">
              {content.heading}
            </h2>
            <p className="m-0 text-[17px] leading-[1.55] text-ink min-[900px]:max-w-[560px] min-[900px]:text-[19px] min-[900px]:leading-[1.5]">
              {content.text}
            </p>
          </div>
          <div className="hidden min-[900px]:col-span-3 min-[900px]:col-start-10 min-[900px]:block min-[900px]:justify-self-end">
            <TextLink href="/spark" label={content.linkLabel} />
          </div>
        </div>

        <div className="flex flex-col gap-4 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-6">
          {content.cards.map((card, i) => (
            <SparkCard key={`${card.format}-${card.number}`} card={card} featured={i === 0} hideOnMobile={i > 1} />
          ))}
        </div>

        <TextLink href="/spark" label={content.linkLabel} className="min-[900px]:hidden" />
      </Reveal>
    </section>
  );
}

function SparkCard({ card, featured, hideOnMobile }: { card: SparkCardContent; featured: boolean; hideOnMobile: boolean }) {
  // Board: küçük kartlar kendi 440px min yüksekliğinde kalıyor, büyük kartla uzamıyor.
  const span = featured ? "min-[900px]:col-span-6" : "min-[900px]:col-span-3 min-[900px]:self-start";
  const body = (
    <>
      <span className="flex items-baseline justify-between">
        <Label as="span" strong>
          {card.format}
        </Label>
        <span
          className={`font-mono text-[13px] leading-[normal] font-medium tracking-[0.08em] text-ink ${featured ? "min-[900px]:text-[15px]" : ""}`}
        >
          {card.number}
        </span>
      </span>
      <span className={`block min-h-[60px] flex-grow ${featured ? "min-[900px]:min-h-[120px]" : ""}`} />
      <span
        className={`font-display text-[34px] leading-none font-extrabold tracking-[-0.035em] text-ink ${featured ? "min-[900px]:text-[72px]" : ""}`}
      >
        {card.title}
      </span>
      <span className={`max-w-[44ch] text-[16px] leading-[1.5] text-ink ${featured ? "min-[900px]:text-[17px]" : ""}`}>
        {card.line}
      </span>
      <span className="flex min-h-[45px] items-center justify-between border-t border-rule pt-4">
        <Label as="span">{card.date ?? card.status}</Label>
        {card.linkLabel && (
          <span className="text-link-line inline-flex items-center gap-1 pb-[5px] text-[15px] leading-[normal] font-bold whitespace-nowrap text-ink">
            {card.linkLabel}
            <ArrowRightIcon className="go-arrow -mx-[0.2em] size-[1em] flex-none" />
          </span>
        )}
      </span>
    </>
  );
  const box = `group flex flex-col gap-5 border-t-2 border-ink bg-paper px-7 pt-7 pb-8 no-underline min-[900px]:min-h-[440px] ${span} ${
    hideOnMobile ? "max-[900px]:hidden" : ""
  }`;

  return card.href ? (
    <Link href={card.href} className={box}>
      {body}
    </Link>
  ) : (
    <div className={box}>{body}</div>
  );
}
