import type { ReactNode } from "react";
import type { SparkInlineReading } from "@/types/content";

/**
 * Bölüm sayfasının mekanik parçaları (brief v4 §7.7, board Episode).
 * Hepsi sunum; state ve kayıt useLastDayState'te kalıyor.
 */

/** Mekanik kartı: White, 4px Ink üst çizgi; üst satırda ad ve gün, sonra soru (Epilogue 800). */
export function MechanicCard({
  name,
  dayText,
  day,
  date,
  prompt,
  note,
  children,
}: {
  name: string;
  dayText: string;
  day: string;
  date: string;
  prompt: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section
      data-spark-day={day}
      data-spark-date={date}
      className="flex scroll-mt-40 flex-col gap-5 border-t-4 border-ink bg-white px-5 pt-6 pb-7 min-[900px]:px-8 min-[900px]:pt-8 min-[900px]:pb-[34px]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">{name}</span>
        <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">{dayText}</span>
      </div>
      <fieldset className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0">
        <legend className="float-left m-0 w-full p-0 font-display text-[22px] leading-[1.15] font-extrabold tracking-[-0.025em] text-ink min-[900px]:text-[28px]">
          {prompt}
        </legend>
        {note && (
          <span className="clear-both font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">
            {note}
          </span>
        )}
        <div className="clear-both flex flex-col gap-5">{children}</div>
      </fieldset>
    </section>
  );
}

/** Kare seçenek butonu: 2px Ink çerçeve, seçilince Ink dolgu; seçimden sonra diğerleri %45. */
export function OptionButton({
  selected,
  dimmed,
  disabled,
  onClick,
  title,
  line,
}: {
  selected: boolean;
  dimmed: boolean;
  disabled: boolean;
  onClick: () => void;
  title: string;
  line?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-14 cursor-pointer flex-col justify-center gap-1 border-2 border-ink px-4 py-3 text-left transition-[background-color,opacity] duration-[160ms] ease-brand disabled:cursor-default ${
        selected ? "bg-ink" : "bg-white enabled:hover:bg-paper"
      } ${dimmed ? "opacity-45" : ""}`}
    >
      <span className={`text-[16px] leading-[normal] font-bold ${selected ? "text-paper" : "text-ink"}`}>{title}</span>
      {line && (
        <span className={`text-[14px] leading-[1.4] font-normal ${selected ? "text-dust" : "text-stone"}`}>{line}</span>
      )}
    </button>
  );
}

/** Sonuç satırı: küçük Ink kare ve mono etiket. */
export function ResultLine({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[10px]" aria-live="polite">
      <span aria-hidden="true" className="size-[10px] flex-none bg-ink" />
      <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">{label}</span>
    </div>
  );
}

/** Seçimden sonra açılan okuma: 1px Rule altında başlık ve metin. */
export function InlineReading({ item }: { item: SparkInlineReading }) {
  return (
    <div className="flex flex-col gap-2 border-t border-rule pt-4">
      <div className="text-[17px] leading-[normal] font-bold text-ink">{item.heading}</div>
      <p className="m-0 text-[16px] leading-[1.6] text-ink">{item.body}</p>
    </div>
  );
}
