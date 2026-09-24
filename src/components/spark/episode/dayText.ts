import { dayNumberLabel } from "@/components/spark/day/dayMath";
import { formatShortDate } from "@/lib/format";
import type { EpisodeContext } from "@/types/content";

/** "Day 070 · 5 Feb 2020" (board Episode). Gün her zaman tarihten hesaplanır. */
export function dayParts(date: string, ctx: EpisodeContext) {
  const day = dayNumberLabel(date, ctx.launchDate);
  return { day, text: `${ctx.dayLabel} ${day} · ${formatShortDate(date, ctx.locale)}` };
}
