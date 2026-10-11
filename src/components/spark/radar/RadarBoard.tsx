"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import RadarCanvas from "@/components/spark/radar/RadarCanvas";
import RadarShape from "@/components/spark/radar/RadarShape";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { RADAR_SIGNALS, radarValues, strongestTwo } from "@/lib/radar";
import { fill } from "@/lib/format";
import { mono, sectionLabel } from "@/components/spark/radar/styles";
import type { RadarBoardProps } from "@/types/content";

const VIEWBOX = "-178 -132 356 270";

/**
 * Okurken dolan pano: dokuz kutulu tuval, "n / 9" sayacı ve beş sinyalli
 * radar (dolmuş kutuların `weight` toplamı artı cevaplanmış hamlelerin
 * `bonus`'u, en çok 1). 1080px ve üstünde sağda yapışkan; altında alttan
 * açılan sayfa: kare Ink düğmeyle açılır, Kapat düğmesi, zemin ya da
 * Escape ile kapanır (odak içeride döner, kapanınca düğmeye döner).
 * Yapışkan panonun hiçbir atasında transform, overflow ya da filter yok.
 */
export default function RadarBoard({ data, text, labels, template, filled, answered, highlight }: RadarBoardProps) {
  const [open, setOpen] = useState(false);
  const boardRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDialogFocus(open, boardRef, buttonRef, close);

  // Pano masaüstü genişliğine geçerse sayfa durumu sıfırlanır (kaydırma kilidi kalkar).
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1080px)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const values = radarValues(data, filled, answered);
  const lit = Object.fromEntries(RADAR_SIGNALS.map((signal) => [signal, values[signal] > 0]));
  const allLit = RADAR_SIGNALS.every((signal) => values[signal] > 0);
  const [first, second] = strongestTwo(values);
  const caption = allLit ? fill(labels.radarDone, { a: labels.signalsLower[first], b: labels.signalsLower[second] }) : labels.radarStart;
  const count = `${filled.size} / ${data.blocks.length}`;

  return (
    <>
      <aside
        ref={boardRef}
        id="rd-board"
        aria-label={labels.board}
        data-open={open ? "" : undefined}
        className="rd-board flex flex-col gap-4 min-[1080px]:sticky min-[1080px]:top-[108px] min-[1080px]:max-h-[calc(100svh-132px)] min-[1080px]:self-start min-[1080px]:overflow-y-auto"
      >
        <div className="rd-board-in flex flex-col gap-[14px] border-t-2 border-ink bg-white p-4">
          <div className="flex items-center justify-between gap-[10px]">
            <span className={sectionLabel}>{labels.board}</span>{" "}
            <span className="font-mono text-[12px] text-ink tabular-nums">{count}</span>{" "}
            <button type="button" onClick={close} className={`${mono} inline-flex min-h-11 cursor-pointer items-center bg-transparent text-ink min-[1080px]:hidden`}>
              {labels.close}
            </button>
          </div>
          <RadarCanvas blocks={data.blocks} texts={text.blocks} mode="mini" template={template} filled={filled} highlight={highlight} />
        </div>
        <div className="rd-board-in flex flex-col gap-[14px] border-t-2 border-ink bg-white p-4">
          <span className={sectionLabel}>{labels.radar}</span>
          <div className="flex flex-col items-center gap-[10px]">
            <RadarShape values={values} labels={labels.signals} lit={lit} radius={92} viewBox={VIEWBOX} dots title={labels.radar} className="h-auto w-full max-w-[230px] min-[1080px]:max-w-[300px]" />
            <span aria-live="polite" className="max-w-[36ch] text-center text-[14px] leading-[1.45] text-stone">
              {caption}
            </span>
          </div>
        </div>
      </aside>
      <button
        ref={buttonRef}
        type="button"
        aria-controls="rd-board"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="on-ink fixed right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+92px)] z-[82] flex h-[52px] cursor-pointer items-center gap-[10px] border-0 bg-ink pr-4 pl-2 font-mono text-[12px] tracking-[0.08em] text-paper uppercase min-[900px]:bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] min-[1080px]:hidden"
      >
        <RadarShape values={values} radius={92} viewBox={VIEWBOX} dots={false} tone="paper" title="" className="size-9" />{" "}
        <span>{fill(labels.openBoard, { n: filled.size, t: data.blocks.length })}</span>
      </button>
      {open && <div aria-hidden="true" onClick={close} className="fixed inset-0 z-[85] bg-ink/40" />}
    </>
  );
}
