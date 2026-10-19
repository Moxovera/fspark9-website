import BackLink from "@/components/brand/BackLink";
import RadarRich from "@/components/spark/radar/RadarRich";
import { mono } from "@/components/spark/radar/styles";
import type { RadarOpeningProps } from "@/types/content";

/**
 * Bölümün Ink açılışı: geri link, büyük konturlu format numarası, kicker
 * (format · Nº · şirket · şehir; şirket adı kendi küçük harfiyle), başlık
 * ve tek cümle. Dil değiştirici sitenin kendisi.
 */
export default function RadarOpening({ episode, addedLabel, addedDate, formatName, formatNumber, numberLabel, backLabel, template }: RadarOpeningProps) {
  const { text, subject } = episode;
  return (
    <header className="on-ink bg-ink px-5 text-[17px] leading-[1.55] text-paper min-[900px]:px-8 min-[1280px]:px-16">
      <div className="relative mx-auto flex max-w-[1312px] flex-col gap-7 overflow-hidden pt-[18px] pb-16">
        <BackLink href="/spark" label={backLabel} ground="ink" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[2px] bottom-[-8px] flex flex-col items-end gap-[10px] select-none min-[641px]:top-[110px] min-[641px]:right-[2px] min-[641px]:bottom-auto"
        >
          <span className="text-outline-dust pr-[0.06em] font-display text-[clamp(110px,20vw,240px)] leading-[0.8] font-extrabold tracking-[-0.04em]">
            {text.figure?.value ?? formatNumber}
          </span>
          {text.figure && <span className={`${mono} text-dust`}>{text.figure.label}</span>}
        </div>
        <div className="relative flex flex-col gap-2">
          <span className={`${mono} text-dust`}>
            {formatName} · {numberLabel} · <span className="normal-case">{subject}</span> · {text.place}
          </span>
          <span className={`${mono} text-dust`}>
            {addedLabel} <time dateTime={episode.addedAt}>{addedDate}</time>
          </span>
        </div>
        <h1 className="relative m-0 max-w-[15ch] font-display text-[clamp(36px,6.2vw,56px)] leading-none font-extrabold tracking-[-0.035em] text-balance text-paper">
          <RadarRich text={text.headline} template={template} />
        </h1>
        <p className="relative m-0 max-w-[52ch] text-[19px]">
          <RadarRich text={text.line} template={template} />
        </p>
      </div>
    </header>
  );
}
