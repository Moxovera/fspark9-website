import type { DoraPhoneProps } from "@/types/content";

const amount = "font-mono text-[12px] whitespace-nowrap tabular-nums";
const tag = "font-mono text-[9.5px] leading-none tracking-[0.04em] whitespace-nowrap uppercase";

/**
 * Elif'in telefonu (görev §5): CSS çerçeve, markasız. Üç ekran üst üste
 * durur, `scene` hangisinin görüneceğini seçer; geçiş 250 ms opaklık
 * (`phone-scene`, reduced-motion'da yok). Sahne 3'ün etiketi `postponed`
 * olunca bir kez "Ertelendi" olur. Tutarlar Spline Sans Mono.
 */
export default function DoraPhone({ phone, scene, postponed, className = "" }: DoraPhoneProps) {
  const { s1, s2, s3 } = phone;
  const screen = (index: 0 | 1 | 2) =>
    `phone-scene absolute inset-0 grid content-start gap-3 overflow-hidden px-3.5 pt-3 pb-4 ${scene === index ? "opacity-100" : "pointer-events-none opacity-0"}`;

  return (
    <div className={`relative overflow-hidden rounded-[38px] border-[9px] border-ink bg-paper text-ink ${className}`}>
      <div aria-hidden="true" className="absolute top-2 left-1/2 z-10 h-[18px] w-[86px] -translate-x-1/2 rounded-full bg-ink" />
      <div className="absolute inset-x-0 top-[38px] bottom-0">
        <div className="flex items-center gap-2.5 px-3.5 pb-2.5">
          <span aria-hidden="true" className="size-7 flex-none rounded-full border-[1.5px] border-ink bg-rule" />
          <span className="font-sans text-[15px] font-bold">{phone.account}</span>
        </div>
        <div className="relative h-[calc(100%-44px)]">
          {/* Sahne 1 · Kasım 2023: sessiz ekran */}
          <div className={screen(0)} aria-hidden={scene !== 0}>
            <div className="grid gap-1 bg-white p-3.5">
              <span className="text-[12px] text-stone">{s1.balanceLabel}</span>
              <span className="font-mono text-[22px] leading-none font-medium tabular-nums">{s1.balance}</span>
            </div>
            <p className="m-0 bg-rule px-3 py-2.5 text-[13px] leading-[1.35]">{s1.banner}</p>
            <div className="grid gap-0">
              <span className="pb-1.5 text-[12.5px] font-bold">{s1.pendingHeading}</span>
              {s1.rows.map((row, i) => (
                <div key={i} className="flex items-center justify-between gap-2 border-t border-rule py-2 text-[12.5px]">
                  <span className="min-w-0 whitespace-nowrap">{row.label}</span>
                  <span className="flex items-center gap-2">
                    <span className={amount}>{row.amount}</span>
                    <span className={`${tag} border border-rule px-1.5 py-1 text-stone`}>{s1.pendingLabel}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="m-0 border border-rule px-3 py-2.5 text-[12px] leading-[1.35] text-stone opacity-70">{s1.support}</p>
          </div>

          {/* Sahne 2 · Şubat 2025: bildirim ve bilgi kartı */}
          <div className={screen(1)} aria-hidden={scene !== 1}>
            <div className="grid gap-1 rounded-[14px] bg-ink px-3 py-2.5 text-paper">
              <span className={`${tag} text-dust`}>{s2.pushApp}</span>
              <span className="text-[13px] leading-[1.3] font-bold">{s2.push}</span>
            </div>
            <div className="relative grid gap-1.5 border-[1.5px] border-flare bg-white p-3 pt-3.5">
              <span className={`${amount} absolute top-1.5 right-2 text-[10.5px] text-stone`}>{s2.time}</span>
              <p className="m-0 pr-9 text-[12.5px] leading-[1.42]">{s2.info}</p>
            </div>
            <div className="flex items-center justify-between gap-2 border-y border-rule py-2.5 text-[12.5px]">
              <span className="min-w-0">{s2.rowLabel}</span>
              <span className="flex items-center gap-2">
                <span className={amount}>{s2.rowAmount}</span>
                <span className={`${tag} border border-ink px-1.5 py-1`}>{s2.queuedLabel}</span>
              </span>
            </div>
          </div>

          {/* Sahne 3 · Bahar 2026: ertelenen özellik */}
          <div className={screen(2)} aria-hidden={scene !== 2}>
            <div className="grid gap-2.5 bg-white p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[14px] font-bold">{s3.title}</span>
                <span className="relative grid">
                  <span aria-hidden={postponed} className={`phone-swap ${tag} col-start-1 row-start-1 border border-ink px-1.5 py-1 ${postponed ? "opacity-0" : "opacity-100"}`}>{s3.before}</span>
                  <span aria-hidden={!postponed} className={`phone-swap ${tag} col-start-1 row-start-1 bg-ink px-1.5 py-1 text-paper ${postponed ? "opacity-100" : "opacity-0"}`}>{s3.after}</span>
                </span>
              </div>
              <p className="m-0 text-[12px] leading-[1.42] text-stone">{s3.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
