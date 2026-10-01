"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import StoryCard from "@/components/spark/episode/StoryCard";
import { fill } from "@/lib/format";
import type { SparkStoryCard, StoryBarProps, StoryCardFace, StoryProviderProps, StoryRailProps, StoryStopProps } from "@/types/content";

/**
 * "Kart hikâyeyi izler" (Son Gün v3): her bölüm ve ara bölüm bir durak,
 * ekranın ortasındaki bant (root margin -35% / -55%) hangi duraktaysa
 * yandaki kart (geniş ekran) ve ince şerit (dar ekran) onun kartını
 * gösterir. Bu gözlemci reveal'dan ayrı: amacı bir kez görünür yapmak
 * değil, okurun hangi durakta olduğunu sürekli izlemek.
 *
 * Duraklar StoryStop ile kendi ref'lerini kaydediyor; DOM sorgusu yok.
 */

interface StoryState {
  stops: SparkStoryCard[];
  active: number;
  register: (el: HTMLElement | null, index: number) => void;
}

const StoryContext = createContext<StoryState | null>(null);

function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory must be used within StoryProvider");
  return ctx;
}

const flipped = (card: SparkStoryCard) => card.mode === "flipped" || card.mode === "closed";
const face = (card: SparkStoryCard): StoryCardFace => ({ day: card.day, state: card.state });

export function StoryProvider({ stops, children }: StoryProviderProps) {
  const [active, setActive] = useState(0);
  const elements = useRef(new Map<number, HTMLElement>());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.stop);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    observer.current = io;
    for (const el of elements.current.values()) io.observe(el);
    return () => {
      io.disconnect();
      observer.current = null;
    };
  }, []);

  const register = useCallback((el: HTMLElement | null, index: number) => {
    const previous = elements.current.get(index);
    if (previous && previous !== el) observer.current?.unobserve(previous);
    if (el) {
      elements.current.set(index, el);
      observer.current?.observe(el);
    } else {
      elements.current.delete(index);
    }
  }, []);

  const value = useMemo(() => ({ stops, active, register }), [stops, active, register]);
  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}

export function StoryStop({ index, id, as: Tag = "section", className, children }: StoryStopProps) {
  const { register } = useStory();
  const ref = useCallback((el: HTMLElement | null) => register(el, index), [register, index]);
  return (
    <Tag ref={ref} id={id} data-stop={index} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Ön yüz: şu ana kadarki son ön yüz durağı. Arka yüz: şu ana kadarki son
 * arka yüz durağı, yoksa ilk arka yüz durağı (dönüş başlamadan hazır
 * dursun). Geri kaydırınca kart ön yüzüne döner.
 */
function useCardFaces() {
  const { stops, active } = useStory();
  const current = stops[active] ?? stops[0];
  const upTo = stops.slice(0, active + 1);
  const frontStop = [...upTo].reverse().find((card) => !flipped(card)) ?? stops[0];
  const backStop = [...upTo].reverse().find(flipped) ?? stops.find(flipped);
  return { current, front: face(frontStop), back: backStop ? face(backStop) : undefined };
}

const mono = "font-mono text-[12px] leading-[1.6] font-medium tracking-[0.08em] uppercase";

/**
 * Geniş ekranda (1000px ve üstü) sol sütunda yapışkan kart ve altındaki
 * küçük yazı. `clock` varsa kartın yerine nötr gün saati (prototip
 * son-gun-fidor `.clock`): gün, çubuk, "of 2394"; son günde gün Stone'a döner.
 */
export function StoryRail({ clock }: StoryRailProps) {
  const { current, front, back } = useCardFaces();
  return (
    <aside aria-hidden="true" className="hidden min-[1000px]:col-span-3 min-[1000px]:block">
      <div className="sticky top-[110px] flex flex-col items-start gap-[14px]">
        {clock ? (
          <div className="flex w-[190px] flex-col gap-[6px] border-t-2 border-ink pt-[14px]">
            <span className={`${mono} text-ink`}>{clock.label}</span>
            <span
              className={`story-clock-day font-display text-[72px] leading-[0.9] font-extrabold tracking-[-0.05em] ${
                current.mode === "closed" ? "text-stone" : "text-ink"
              }`}
            >
              {current.day}
            </span>
            <span className="mt-2 mb-[2px] block h-1 bg-rule">
              <i className="story-clock-bar block h-full bg-ink" style={{ width: `${current.progress ?? 0}%` }} />
            </span>
            <span className={`${mono} text-stone`}>{clock.ofLabel}</span>
          </div>
        ) : (
          <StoryCard mode={current.mode} front={front} back={back} className="w-[170px]" />
        )}
        <span className={`max-w-[18ch] text-stone ${mono}`}>
          {current.caption}
        </span>
      </div>
    </aside>
  );
}

/** Dar ekranda header'ın altında ince yapışkan şerit: küçük kart (gün saatli bölümde yok), başlık, gün. */
export function StoryBar({ dayTemplate, clock }: StoryBarProps) {
  const { current } = useCardFaces();
  const day = current.barDay ?? (current.day === "?" ? current.caption : fill(dayTemplate, { n: current.day }));
  return (
    <div aria-hidden="true" className="sticky top-16 z-30 border-b-2 border-ink bg-paper min-[900px]:top-[84px] min-[1000px]:hidden">
      <div className="flex h-[60px] items-center gap-[14px] px-5 min-[900px]:px-8">
        {!clock && <span data-mode={current.mode} className="story-mini h-10 w-[26px] flex-none" />}
        <b className="font-display text-[18px] leading-none font-extrabold tracking-[-0.02em] text-ink">{current.barTitle}</b>
        <span className="ml-auto font-mono text-[12px] leading-none font-medium tracking-[0.08em] whitespace-nowrap text-stone uppercase">
          {day}
        </span>
      </div>
    </div>
  );
}
