"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { useInView } from "@/hooks/useReveal";
import { fill } from "@/lib/format";
import { formatNumber } from "@/lib/poolMath";
import type { SmeDoor, SmePath, SmeStoryProps } from "@/types/content";

const mono = "font-mono text-[12px] font-medium tracking-[0.08em] uppercase";
const LAST_MONTH = 30;

/** Ay 30'un geri sayımı: bugünden son tarihe kalan gün. */
const daysUntil = (iso: string) => Math.max(0, Math.ceil((Date.parse(`${iso}T00:00:00Z`) - Date.now()) / 86_400_000));

function Countdown({ deadline, template, locale }: { deadline: string; template: string; locale: SmeStoryProps["locale"] }) {
  const { ref, seen } = useInView<HTMLParagraphElement>(0.5);
  const [days, setDays] = useState<number | null>(null);
  const [k, setK] = useState(1);

  useEffect(() => {
    setDays(daysUntil(deadline));
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setK(0);
  }, [deadline]);

  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setK(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen]);

  return (
    <p ref={ref} className="m-0 font-display text-[clamp(40px,6vw,72px)] leading-none font-extrabold tracking-[-0.04em] tabular-nums">
      {days === null ? " " : fill(template, { n: formatNumber(locale, Math.round(days * k)) })}
    </p>
  );
}

/**
 * 04 Kaan'ın 30 ayı: beş sahne, sayfa gibi akar. Ay 0'daki seçim (Sparkasse
 * ya da dijital) sonraki sahnelerin metnini belirler. Ay 14'te bir karar,
 * Ay 20'de beş kredi kapısı (kumbara çubuğu hiçbir kapıda dolmaz), Ay 30'da
 * e-fatura geri sayımı. Üstteki sabit şerit okurun hangi ayda olduğunu
 * izler (sürekli durum izleme, reveal değil; kendi gözlemcisi). Her şey
 * düğme, klavyeyle oynanır. Puan yok, sadece sonuç.
 */
export default function SmeStory({ story, locale, template }: SmeStoryProps) {
  const [path, setPath] = useState<SmePath | null>(null);
  const [crisis, setCrisis] = useState<string | null>(null);
  const [door, setDoor] = useState<string | null>(null);
  const [tried, setTried] = useState<string[]>([]);
  const [month, setMonth] = useState(0);
  const scenes = useRef<(HTMLElement | null)[]>([]);
  const text = (s: string) => <Psd3Text text={s} template={template} />;
  const { found, cash, crisis: crisisScene, credit, invoice } = story;
  const months = [found.month, cash.month, crisisScene.month, credit.month, invoice.month];

  useEffect(() => {
    const els = scenes.current.filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setMonth(Number((entry.target as HTMLElement).dataset.month));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const reset = () => {
    setPath(null);
    setCrisis(null);
    setDoor(null);
    setTried([]);
  };

  const pick = (p: SmePath) => {
    setPath(p);
    setCrisis(null);
  };

  const openDoor = (d: SmeDoor) => {
    setDoor(d.key);
    setTried((t) => (t.includes(d.key) ? t : [...t, d.key]));
  };

  const current = credit.doors.find((d) => d.key === door) ?? null;
  const amount = current?.amount ?? 0;
  const best = Math.max(0, ...credit.doors.filter((d) => tried.includes(d.key)).map((d) => d.amount));
  const allTried = tried.length === credit.doors.length;
  const doorText = (d: SmeDoor) => (path && d.textBy?.[path]) || d.text;

  const scene = (i: number, m: number, title: string, children: ReactNode) => (
    <article
      ref={(el) => {
        scenes.current[i] = el;
      }}
      data-month={m}
      aria-labelledby={`kaan-${m}`}
      className="grid scroll-mt-[160px] grid-cols-1 gap-x-8 gap-y-4 border-t-2 border-ink py-[clamp(32px,5vw,56px)] min-[861px]:grid-cols-[150px_minmax(0,1fr)]"
    >
      <div className="grid content-start gap-1">
        <span className={`${mono} text-stone`}>{story.monthLabel}</span>
        <span className="font-display text-[clamp(44px,5vw,64px)] leading-[0.9] font-extrabold tracking-[-0.04em] tabular-nums">{m}</span>
      </div>
      <div className="grid min-w-0 max-w-[68ch] content-start gap-4">
        <h3 id={`kaan-${m}`} className="m-0 font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] font-extrabold tracking-[-0.02em]">
          {title}
        </h3>
        {children}
      </div>
    </article>
  );

  const result = (body: string, key?: string) => (
    <div key={key} className="grid gap-1.5 border-l-4 border-ink bg-paper px-4 py-3.5">
      <span className={`${mono} text-stone`}>{story.resultLabel}</span>
      <p className="m-0 text-[16px]">{text(body)}</p>
    </div>
  );

  const waiting = <p className="m-0 border-l-4 border-rule pl-4 text-[15.5px] text-stone">{story.pickFirst}</p>;

  const optionClass = (on: boolean) =>
    `grid min-h-11 content-start gap-0.5 border-2 border-ink px-4 py-3 text-left ${on ? "bg-ink text-paper" : "bg-white hover:bg-paper"}`;

  return (
    <div>
      <p className="mt-0 mb-[clamp(20px,3vw,32px)] max-w-[60ch] font-display text-[clamp(19px,2.2vw,24px)] leading-[1.3] font-bold tracking-[-0.015em]">{story.intro}</p>

      {/* Sabit şerit: hangi aydasın, hangi yoldasın. */}
      <div className="sticky top-16 z-20 -mx-[clamp(20px,5vw,64px)] border-y border-ink bg-white px-[clamp(20px,5vw,64px)] py-2.5 min-[900px]:top-[84px]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 min-[641px]:gap-x-4">
          <span className={`${mono} max-[640px]:hidden`}>{story.stickyTitle}</span>
          <span className={`${mono} tabular-nums`}>
            {story.monthLabel} {month}
          </span>
          <span aria-hidden="true" className="relative mx-1 h-1.5 min-w-[60px] flex-1 bg-rule">
            <span className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-[400ms] ease-brand motion-reduce:transition-none" style={{ width: `${(month / LAST_MONTH) * 100}%` }} />
            {months.map((m) => (
              <span key={m} className={`absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 border-2 border-ink ${m <= month ? "bg-ink" : "bg-white"}`} style={{ left: `${(m / LAST_MONTH) * 100}%` }} />
            ))}
          </span>
          {path && <span className="border-[1.5px] border-ink bg-flare px-2 py-0.5 font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase">{story.pathLabels[path]}</span>}
          {path && (
            <button type="button" onClick={reset} className="min-h-11 text-[14px] font-bold underline underline-offset-4 max-[640px]:hidden">
              {story.changeLabel}
            </button>
          )}
        </div>
      </div>

      {scene(
        0,
        found.month,
        found.title,
        <>
          <p className="m-0">{text(found.text)}</p>
          <span className={mono}>
            {story.questionLabel}: {found.question}
          </span>
          <div className="grid grid-cols-1 gap-2.5 min-[561px]:grid-cols-2" role="group" aria-label={found.question}>
            {found.options.map((o) => (
              <button key={o.key} type="button" aria-pressed={path === o.key} onClick={() => pick(o.key)} className={optionClass(path === o.key)}>
                <b className="font-display text-[18px] font-bold">{o.label}</b>
                <span className="text-[14px] opacity-80">{o.sub}</span>
              </button>
            ))}
          </div>
          {path && (
            <div aria-live="polite">{result(found.options.find((o) => o.key === path)?.result ?? "")}</div>
          )}
        </>,
      )}

      {scene(
        1,
        cash.month,
        cash.title,
        <>
          <p className="m-0">{text(cash.text)}</p>
          {path ? result(cash.results[path]) : waiting}
        </>,
      )}

      {scene(
        2,
        crisisScene.month,
        crisisScene.title,
        path ? (
          <>
            <p className="m-0">{text(crisisScene.texts[path])}</p>
            <span className={mono}>
              {story.questionLabel}: {crisisScene.question}
            </span>
            <div className="grid grid-cols-1 gap-2.5 min-[761px]:grid-cols-3" role="group" aria-label={crisisScene.question}>
              {crisisScene.choices[path].map((c) => (
                <button key={c.key} type="button" aria-pressed={crisis === c.key} onClick={() => setCrisis(c.key)} className={optionClass(crisis === c.key)}>
                  <b className="text-[15.5px] font-bold">{c.label}</b>
                </button>
              ))}
            </div>
            <div aria-live="polite">{crisis && result(crisisScene.choices[path].find((c) => c.key === crisis)?.result ?? "", crisis)}</div>
          </>
        ) : (
          waiting
        ),
      )}

      {scene(
        3,
        credit.month,
        credit.title,
        <>
          <p className="m-0">{text(credit.text)}</p>
          <div className="grid gap-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className={mono}>{credit.barLabel}</span>
              <span className="font-mono text-[13px] tabular-nums">
                {formatNumber(locale, amount)} / {formatNumber(locale, credit.goal)}
              </span>
            </div>
            <div
              role="meter"
              aria-label={credit.barLabel}
              aria-valuemin={0}
              aria-valuemax={credit.goal}
              aria-valuenow={amount}
              className="relative h-7 border-2 border-ink bg-white"
            >
              <span
                className="absolute inset-y-0 left-0 bg-[repeating-linear-gradient(45deg,var(--ink)_0_3px,var(--flare)_3px_9px)] transition-[width] duration-[700ms] ease-brand motion-reduce:transition-none"
                style={{ width: `${(amount / credit.goal) * 100}%` }}
              />
            </div>
            <span className="text-[14px] text-stone" aria-live="polite">
              {current ? fill(credit.missingTemplate, { n: formatNumber(locale, credit.goal - amount) }) : " "}
            </span>
          </div>
          <span className={mono}>{credit.doorsLabel}</span>
          <div className="grid grid-cols-2 gap-2 min-[641px]:grid-cols-5">
            {credit.doors.map((d) => {
              const seen = tried.includes(d.key);
              return (
                <button
                  key={d.key}
                  type="button"
                  aria-pressed={door === d.key}
                  onClick={() => openDoor(d)}
                  className={`grid min-h-[84px] content-between gap-2 border-2 border-ink p-3 text-left ${door === d.key ? "bg-ink text-paper" : seen ? "bg-paper" : "bg-white hover:bg-paper"}`}
                >
                  <b className="font-display text-[17px] font-bold">{d.name}</b>
                  <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase opacity-80">{seen ? d.verdict : " "}</span>
                </button>
              );
            })}
          </div>
          <div aria-live="polite" className="grid gap-3">
            {current && result(doorText(current), current.key)}
            {tried.length > 0 && !allTried && (
              <span className="text-[14px] text-stone">
                {fill(credit.bestTemplate, { n: formatNumber(locale, best) })} · {credit.triedLabel} {tried.length}/{credit.doors.length}
              </span>
            )}
          </div>
          {allTried && (
            <div className="grid gap-2 bg-ink px-5 py-6 text-paper">
              <p className="m-0 font-display text-[clamp(24px,3.2vw,38px)] leading-[1.1] font-extrabold tracking-[-0.025em] text-balance">{credit.finalLine}</p>
              <p className="m-0 text-dust">{credit.finalNote}</p>
            </div>
          )}
        </>,
      )}

      {scene(
        4,
        invoice.month,
        invoice.title,
        <>
          <p className="m-0">{text(invoice.text)}</p>
          <Countdown deadline={invoice.deadline} template={invoice.countdownTemplate} locale={locale} />
          <p className="m-0 border-t-2 border-ink pt-4 font-display text-[clamp(22px,2.8vw,32px)] leading-[1.15] font-extrabold tracking-[-0.025em] text-balance">{invoice.question}</p>
          {path && (
            <button type="button" onClick={reset} className="min-h-11 justify-self-start text-[15px] font-bold underline underline-offset-4 min-[641px]:hidden">
              {story.changeLabel}
            </button>
          )}
        </>,
      )}
    </div>
  );
}
