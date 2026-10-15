import type { DoraTimelineProps } from "@/types/content";

const date = "font-mono text-[12px] leading-[1.4] font-medium tracking-[0.06em] text-stone uppercase";

/**
 * Zaman çizelgesi (görev §3.2): statik şerit, 2020'den 2028'e her tarih bir
 * nokta. "Bugün" Flare nokta; ondan sonrası boş nokta (henüz olmadı).
 * 1180 px ve üstü yatay (etiketler sırayla çizginin üstünde ve altında,
 * böylece her etiket iki sütun genişliği kullanır), altı dikey liste.
 * Animasyon yok.
 */
export default function DoraTimeline({ timeline }: DoraTimelineProps) {
  const { events, today } = timeline;
  const items = [
    ...events.slice(0, today.after + 1).map((e) => ({ ...e, state: "past" as const })),
    { date: today.date, text: today.label, state: "today" as const },
    ...events.slice(today.after + 1).map((e) => ({ ...e, state: "future" as const })),
  ];
  const last = items.length - 1;
  const dot = (state: (typeof items)[number]["state"]) =>
    state === "today"
      ? "size-4 rounded-full bg-flare ring-2 ring-ink"
      : state === "past"
        ? "size-2.5 rounded-full bg-ink"
        : "size-2.5 rounded-full border-[1.5px] border-ink bg-paper";

  return (
    <div className="mt-[clamp(32px,4vw,48px)]">
      <h3 className="mt-0 mb-5 font-display text-[21px] leading-[1.15] font-extrabold tracking-[-0.015em]">{timeline.heading}</h3>

      {/* Dikey liste (1180 px altı) */}
      <ol className="m-0 grid list-none gap-0 border-l-2 border-ink p-0 min-[1180px]:hidden">
        {items.map((item) => (
          <li key={item.date + item.text} className="relative grid gap-1 py-3 pl-6">
            <span aria-hidden="true" className={`absolute top-[19px] -left-[1px] -translate-x-1/2 ${dot(item.state)}`} />
            <span className={date}>{item.date}</span>
            <span className={item.state === "today" ? "font-display text-[17px] font-extrabold" : "text-[15.5px]"}>{item.text}</span>
          </li>
        ))}
      </ol>

      {/* Yatay şerit (1180 px ve üstü) */}
      <ol
        className="relative m-0 hidden list-none p-0 min-[1180px]:grid"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        <span aria-hidden="true" className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-rule" />
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-ink"
          style={{ width: `${((today.after + 1.5) / items.length) * 100}%` }}
        />
        {items.map((item, i) => {
          const top = i % 2 === 1;
          // Kenardaki etiketler bir buçuk sütun (komşu etiket yarım sütun içeriden başlıyor).
          const align =
            i === 0
              ? "left-0 w-[calc(150%-14px)] text-left"
              : i === last
                ? "right-0 w-[calc(150%-14px)] text-right"
                : "left-1/2 w-[calc(200%-14px)] -translate-x-1/2 text-center";
          return (
            <li key={item.date + item.text} className="relative grid h-[340px] grid-rows-[1fr_24px_1fr]">
              <span aria-hidden="true" className={`row-start-2 self-center justify-self-center ${dot(item.state)}`} />
              <div
                className={`absolute grid gap-1 ${align} ${top ? "bottom-[calc(50%+18px)] content-end" : "top-[calc(50%+18px)]"}`}
              >
                <span className={date}>{item.date}</span>
                <span className={item.state === "today" ? "font-display text-[16px] font-extrabold" : "text-[13.5px] leading-[1.4]"}>{item.text}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
