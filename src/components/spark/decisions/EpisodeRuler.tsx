import { monoText } from "@/components/spark/decisions/styles";
import type { EpisodeRulerProps } from "@/types/content";

const time = (date: string) => Date.parse(date);

/**
 * İlk günden son güne cetvel (prototip son-gun-02-nuri-v2 `.ruler`): White
 * zeminde tek çizgi, izler tarihlerinden yerleşir. Etiketsiz izler soluk.
 * Son iz kapanış, bu görünümdeki tek Flare. Etiketler çizginin ilk
 * yarısında sola, ikinci yarısında sağa yaslı. 860px ve altında sadece
 * ilk ve son etiket.
 * Çizginin altında mono not; 2023 çizgiye çizilmiyor.
 */
export default function EpisodeRuler({ ticks, after }: EpisodeRulerProps) {
  const first = ticks[0];
  const last = ticks[ticks.length - 1];
  if (!first || !last) return null;
  const span = time(last.date) - time(first.date);

  return (
    <div className="bg-white pt-14 pb-[76px]">
      <div className="mx-auto max-w-[1240px] px-5 min-[861px]:px-8">
        <div className="relative mx-2 mt-10 h-[2px] bg-ink">
          {ticks.map((tick, i) => {
            const position = span > 0 ? (time(tick.date) - time(first.date)) / span : 0;
            const end = i === ticks.length - 1;
            const edge = i === 0 || end;
            const side = position < 0.5 ? "left-0" : "right-0";
            const narrow = edge ? "" : "max-[861px]:hidden";
            return (
              <div
                key={tick.date}
                className={`absolute ${
                  end ? "-top-[13px] h-7 w-[10px] -translate-x-[10px] bg-flare" : "-top-[9px] h-5 w-[2px] -translate-x-px bg-ink"
                } ${tick.label ? "" : "opacity-45"}`}
                style={{ left: `${position * 100}%` }}
              >
                {tick.label && (
                  <span
                    className={`absolute ${end ? "top-[34px]" : "top-[30px]"} ${side} ${narrow} flex flex-col gap-[2px] text-[14px] leading-[1.55] whitespace-nowrap text-stone max-[481px]:text-[13px] max-[481px]:leading-[1.55]`}
                  >
                    <b className={`${monoText} text-ink`}>{tick.label}</b>
                    <span>{tick.caption}</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <p className={`${monoText} mt-[88px] mb-0 text-stone min-[861px]:text-right`}>{after}</p>
      </div>
    </div>
  );
}
