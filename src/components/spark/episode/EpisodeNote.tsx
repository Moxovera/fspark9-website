import Dial from "@/components/brand/Dial";
import { EIGHT_SLICES } from "@/lib/dial";
import { dayNumberLabel } from "@/components/spark/day/dayMath";
import type { EpisodeContext } from "@/types/content";

/**
 * fspark9 notu (board Episode): kart yok. 1px Rule üst çizgi, küçük tam
 * kadran, "fspark9 · Note" ve gün, altında Epilogue 700 22px metin.
 */
export default function EpisodeNote({ body, date, ctx }: { body: string; date: string; ctx: EpisodeContext }) {
  const day = dayNumberLabel(date, ctx.launchDate);
  return (
    <aside data-spark-day={day} data-spark-date={date} className="flex flex-col gap-3 border-t border-rule pt-6 pb-2">
      <div className="flex items-center gap-[10px]">
        <Dial lit={EIGHT_SLICES} size={22} />
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">
          {ctx.vocabulary.noteLabel}
        </span>
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">
          {ctx.dayLabel} {day}
        </span>
      </div>
      <p className="m-0 max-w-[640px] font-display text-[19px] leading-[1.4] font-bold tracking-[-0.01em] text-ink min-[900px]:text-[22px]">
        {body}
      </p>
    </aside>
  );
}
