import { dayNumberLabel } from "@/components/spark/day/dayMath";
import { formatShortDate } from "@/lib/format";
import type { EpisodeContext } from "@/types/content";

/**
 * "Day 070 · 5 Feb 2020" (board Episode). Gün her zaman tarihten hesaplanır.
 * Kapanıştan sonraki kayıtlar gün numarası taşımaz (Bó 156 gün açık
 * kaldı, "Day 573" okuru yanıltıyordu): "Then, a year later · tarih",
 * saat de kapanış gününde durur. `short` tarihsiz hali (not rozeti).
 */
export function dayParts(date: string, ctx: EpisodeContext) {
  const raw = dayNumberLabel(date, ctx.launchDate);
  const closure = dayNumberLabel(ctx.closureDate, ctx.launchDate);
  const formatted = formatShortDate(date, ctx.locale);
  if (Number(raw) > Number(closure)) {
    return { day: closure, text: `${ctx.labels.afterClosureLabel} · ${formatted}`, short: ctx.labels.afterClosureLabel };
  }
  return { day: raw, text: `${ctx.dayLabel} ${raw} · ${formatted}`, short: `${ctx.dayLabel} ${raw}` };
}
