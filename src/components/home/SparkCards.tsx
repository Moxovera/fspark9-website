import { Link } from "@/i18n/navigation";
import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";
import TextLink from "@/components/brand/TextLink";
import SparkSubscribe from "@/components/spark/newsletter/SparkSubscribe";
import SparkFilmRow from "@/components/spark/newsletter/SparkFilmRow";
import { ArrowRightIcon } from "@/components/icons";
import { fill } from "@/lib/format";
import type { SparkCardContent, SparkCardsProps } from "@/types/content";

/**
 * Ana sayfa Spark bölümü ("Sıkıcı bloglara son."): Ink zemin. Üst satırda
 * en yeni yayın (geniş Paper kart) ve Flare bülten kartı; altında ince
 * şerit: sonraki iki yayın ve Spark filmi (tıklanınca pencerede açılır,
 * ilk açılışta hiçbir film isteği yok). En yeni yayın SPARK_CARDS_QUERY'nin
 * ilk satırı; bileşen gelen kadar kart çizer, boş kart yok.
 */
export default function SparkCards({ content, film, newsletter, sparkLabel, locale }: SparkCardsProps) {
  const [latest, ...rest] = content.cards;
  const next = rest.slice(0, 2);
  const hasFilm = Boolean(film.youtubeId);

  return (
    <section className="on-ink bg-ink px-5 py-16 min-[900px]:px-8 min-[900px]:py-24 min-[1280px]:px-16">
      <Reveal className="flex flex-col gap-8 min-[900px]:gap-10">
        <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between min-[900px]:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-[10px]">
              <span aria-hidden="true" className="size-[14px] flex-none rounded-full bg-flare" />
              <Label ground="ink" className="!text-flare">
                {sparkLabel}
              </Label>
            </div>
            <h2 className="m-0 font-display text-[40px] leading-[1.02] font-extrabold tracking-[-0.035em] text-paper min-[900px]:text-[58px] min-[900px]:leading-none">
              {newsletter.homeHeading}
            </h2>
          </div>
          <div className="hidden min-[900px]:block">
            <TextLink href="/spark" label={newsletter.archiveLabel} ground="ink" />
          </div>
        </div>

        <div className="flex flex-col gap-6 min-[900px]:grid min-[900px]:grid-cols-12">
          {latest && <LatestCard card={latest} newsletter={newsletter} />}
          <div className="flex flex-col gap-6 bg-flare p-6 text-ink min-[900px]:col-span-5 min-[900px]:p-8">
            <div className="flex flex-col gap-3">
              <Label strong>{newsletter.cardLabel}</Label>
              <h3 className="m-0 font-display text-[28px] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink min-[900px]:text-[34px]">
                {newsletter.cardHeading}
              </h3>
              <p className="m-0 text-[16px] leading-[1.5] text-ink">{newsletter.cardText}</p>
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <SparkSubscribe variant="card" locale={locale} content={newsletter} />
              <p className="m-0 text-[14px] leading-[1.4] text-ink">{newsletter.cardNote}</p>
            </div>
          </div>
        </div>

        {(next.length > 0 || hasFilm) && (
          <div className="flex flex-col min-[768px]:grid min-[768px]:grid-cols-3 min-[768px]:gap-6">
            {next.map((card) => (
              <StripItem key={`${card.format}-${card.number}`} card={card} />
            ))}
            {hasFilm && <SparkFilmRow film={film} newsletter={newsletter} variant="strip" />}
          </div>
        )}

        <div className="min-[900px]:hidden">
          <TextLink href="/spark" label={newsletter.archiveLabel} ground="ink" />
        </div>
      </Reveal>
    </section>
  );
}

function LatestCard({ card, newsletter }: { card: SparkCardContent; newsletter: SparkCardsProps["newsletter"] }) {
  const body = (
    <>
      <span className="flex items-baseline justify-between gap-4">
        <Label as="span" strong>
          {fill(newsletter.latestLabel, { format: card.format })}
        </Label>
        <Label as="span" strong>
          {card.number}
        </Label>
      </span>
      <span className="flex flex-col gap-3">
        <span className="font-display text-[34px] leading-none font-extrabold tracking-[-0.035em] text-ink min-[900px]:text-[46px]">
          {card.title}
        </span>
        <span className="max-w-[44ch] text-[16px] leading-[1.5] text-ink min-[900px]:text-[17px]">{card.line}</span>
      </span>
      <span className="mt-auto flex min-h-[45px] items-center justify-between gap-4 border-t border-rule pt-4">
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
  const box = "group flex flex-col gap-10 border-t-4 border-flare bg-paper p-6 no-underline min-[900px]:col-span-7 min-[900px]:min-h-[360px] min-[900px]:p-8";
  return card.href ? (
    <Link href={card.href} className={box}>
      {body}
    </Link>
  ) : (
    <div className={box}>{body}</div>
  );
}

function StripItem({ card }: { card: SparkCardContent }) {
  const body = (
    <>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-dust uppercase">
          {card.format} · {card.number}
        </span>
        <span className="font-display text-[20px] leading-[1.2] font-extrabold tracking-[-0.02em] text-paper">{card.title}</span>
      </span>
      <span className="flex size-10 flex-none items-center justify-center rounded-full border border-ring text-paper">
        <ArrowRightIcon className="go-arrow size-[16px]" />
      </span>
    </>
  );
  const box = "group flex min-h-16 items-center justify-between gap-4 border-t-2 border-paper py-4 no-underline";
  return card.href ? (
    <Link href={card.href} className={box}>
      {body}
    </Link>
  ) : (
    <div className={box}>{body}</div>
  );
}
