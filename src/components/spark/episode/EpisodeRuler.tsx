import { dayNumberLabel } from "@/components/spark/day/dayMath";
import type { EpisodeContext, SparkEpisodeBlock } from "@/types/content";

interface EpisodeRulerProps {
  blocks: SparkEpisodeBlock[];
  ctx: EpisodeContext;
}

const MIN_GAP = 0.14;

/**
 * Gün cetveli (brief v4 §7.7, board Episode / EpisodeM): 0. günden kapanış
 * gününe tek çizgi, her blok tarihi için bir çentik. Etiketler sadece
 * başlığı olan kayıtlarda ve yer oldukça (masaüstü); mobilde ilk, orta ve
 * son. Kapanış çentiği bu görünümün tek Flare öğesi. Kapanıştan sonraki
 * ilk kayıt çizginin ardında "Then, a year later · Day 573 · ..." olarak.
 */
export default function EpisodeRuler({ blocks, ctx }: EpisodeRulerProps) {
  const closure = Number(dayNumberLabel(ctx.closureDate, ctx.launchDate));
  const dayOf = (date: string) => Number(dayNumberLabel(date, ctx.launchDate));

  const ticks = [...new Set(blocks.map((b) => dayOf(b.date)).filter((d) => d > 0 && d < closure))];
  const records = blocks
    .filter((b) => b._type === "sparkRecord")
    .map((b) => ({ day: dayOf(b.date), heading: b._type === "sparkRecord" ? b.heading : "" }))
    .filter((r) => r.day >= 0 && r.day <= closure);
  const first = records.find((r) => r.day === 0);
  const last = records.find((r) => r.day === closure);
  const middle = records.filter((r) => r.day > 0 && r.day < closure);

  // Masaüstü: yer oldukça (öncekinden ve kapanıştan en az %14 uzak).
  const desktop: typeof middle = [];
  let prev = 0;
  for (const r of middle) {
    const p = r.day / closure;
    if (p - prev >= MIN_GAP && 1 - p >= MIN_GAP) {
      desktop.push(r);
      prev = p;
    }
  }
  // Mobil: ortaya en yakın tek etiket.
  const mobile = middle.reduce<(typeof middle)[number] | undefined>(
    (best, r) => (!best || Math.abs(r.day / closure - 0.5) < Math.abs(best.day / closure - 0.5) ? r : best),
    undefined,
  );
  const after = blocks
    .filter((b) => b._type === "sparkRecord" && dayOf(b.date) > closure)
    .map((b) => ({ day: dayOf(b.date), heading: b._type === "sparkRecord" ? b.heading : "" }))[0];

  const dayText = (d: number) => `${ctx.dayLabel} ${String(d).padStart(3, "0")}`;
  const mono = "font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] uppercase";
  const label = (d: number, heading: string) => (
    <>
      <span className={`${mono} whitespace-nowrap text-ink`}>{dayText(d)}</span>
      <span className={`${mono} max-w-[150px] text-stone min-[900px]:max-w-none min-[900px]:whitespace-nowrap`}>{heading}</span>
    </>
  );

  return (
    <section className="flex flex-col gap-[14px] bg-white px-5 pt-7 pb-8 min-[900px]:gap-[18px] min-[900px]:px-8 min-[900px]:pt-10 min-[900px]:pb-11 min-[1280px]:px-16">
      <h2 className="m-0 font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">{ctx.labels.rulerLabel}</h2>
      <div className="relative h-24" aria-hidden="true">
        <div className="absolute inset-x-0 top-7 h-[2px] bg-ink" />
        <div className="absolute top-[22px] left-[-1px] h-[14px] w-[2px] bg-ink" />
        {ticks.map((d) => (
          <div key={d} className="absolute top-[22px] h-[14px] w-[2px] bg-ink" style={{ left: `calc(${(d / closure) * 100}% - 1px)` }} />
        ))}
        <div className="absolute top-[14px] h-7 w-3 bg-flare" style={{ left: "calc(100% - 6px)" }} />
        {first && <div className="absolute top-[50px] left-0 flex flex-col gap-[2px]">{label(0, first.heading)}</div>}
        {middle.map((r) => {
          const onDesktop = desktop.includes(r);
          const onMobile = mobile === r;
          if (!onDesktop && !onMobile) return null;
          return (
            <div
              key={r.day}
              className={`absolute top-[50px] flex flex-col gap-[2px] ${onDesktop ? "min-[900px]:flex" : "min-[900px]:hidden"} ${onMobile ? "flex" : "max-[900px]:hidden"}`}
              style={{ left: `calc(${(r.day / closure) * 100}% - 40px)` }}
            >
              {label(r.day, r.heading)}
            </div>
          );
        })}
        {last && <div className="absolute top-[50px] right-0 flex flex-col gap-[2px] text-right">{label(closure, last.heading)}</div>}
      </div>
      {after && (
        <div className="mt-2 flex flex-wrap items-center gap-[10px]">
          <span className={`${mono} whitespace-nowrap text-stone`}>{ctx.labels.afterClosureLabel}</span>
          <span aria-hidden="true" className="h-[2px] w-10 bg-rule" />
          <span className={`${mono} text-ink`}>
            {dayText(after.day)} · {after.heading}
          </span>
        </div>
      )}
    </section>
  );
}
