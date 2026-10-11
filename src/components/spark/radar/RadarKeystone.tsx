"use client";

import { useEffect, useRef, useState } from "react";
import RadarCanvas from "@/components/spark/radar/RadarCanvas";
import RadarRich, { RadarParas } from "@/components/spark/radar/RadarRich";
import RadarShape from "@/components/spark/radar/RadarShape";
import { RADAR_SIGNALS } from "@/lib/radar";
import { fill } from "@/lib/format";
import { body, group, h2, reveal, sectionLabel, smallButton, verdict } from "@/components/spark/radar/styles";
import type { RadarKeystoneProps, RadarValues } from "@/types/content";

const TWEEN_MS = 600;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Taşıyıcı taş: hamleler kulede taş gibi üst üste. Bir taşa basınca sağa
 * kayıp solar (kule bir kez sallanır), vurduğu kutular yandaki küçük
 * tuvalde kesik çizgiye döner ve yanındaki radar `drop` değerleri kadar
 * iner. Altta `pull` cümlesi, `why` paragrafları, tuvaldeki yeri, zorluk
 * çubukları, `keystone.answer` kutusu ve "Taşı geri koy". `keystone: true`
 * olan hamle cevap. Bir taş çekmek bütün hamleleri panodaki radar için
 * cevaplanmış sayar. Kutu seçici yok.
 */
export default function RadarKeystone({ data, text, labels, template, full, onPull }: RadarKeystoneProps) {
  const [pulled, setPulled] = useState<string | null>(null);
  const [target, setTarget] = useState<RadarValues>(full);
  const [shown, setShown] = useState<RadarValues>(full);
  const shownRef = useRef<RadarValues>(full);
  const towerRef = useRef<HTMLDivElement>(null);

  const move = data.moves.find((m) => m.id === pulled);
  const keystoneIndex = data.moves.findIndex((m) => m.keystone) + 1;

  // Radar yeni değere 600ms'de yumuşakça iner/çıkar (ease-out kübik); yarım kalan geçiş bulunduğu yerden devam eder.
  useEffect(() => {
    if (prefersReducedMotion()) {
      shownRef.current = target;
      setShown(target);
      return;
    }
    const from = { ...shownRef.current };
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const k = Math.max(0, Math.min(1, (now - start) / TWEEN_MS));
      const eased = 1 - Math.pow(1 - k, 3);
      const next = { ...from };
      for (const signal of RADAR_SIGNALS) next[signal] = from[signal] + (target[signal] - from[signal]) * eased;
      shownRef.current = next;
      setShown(next);
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  function pull(id: string) {
    const chosen = data.moves.find((m) => m.id === id);
    if (!chosen) return;
    setPulled(id);
    const to = { ...full };
    for (const signal of RADAR_SIGNALS) to[signal] = Math.max(0.04, Math.min(1, full[signal] + (chosen.drop?.[signal] ?? 0)));
    setTarget(to);
    if (towerRef.current && !prefersReducedMotion()) {
      towerRef.current.animate(
        [{ transform: "none" }, { transform: "rotate(-1.1deg)", offset: 0.2 }, { transform: "rotate(0.9deg)", offset: 0.5 }, { transform: "rotate(-0.4deg)", offset: 0.8 }, { transform: "none" }],
        { duration: 420, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
      );
    }
    onPull(id);
  }

  function putBack() {
    setPulled(null);
    setTarget(full);
  }

  const tryLine = (n: number) => fill(labels.keystoneTry, { n, suffix: labels.keystoneSuffixes[n - 1] ?? "" });

  return (
    <section id="keystone" className={group}>
      <span className={sectionLabel}>{labels.moves}</span>
      <h2 className={h2}>
        <RadarRich text={text.keystone.title} template={template} />
      </h2>
      <div className={body}>
        <RadarParas items={text.keystone.intro} template={template} />
      </div>
      <div className="flex flex-col gap-[18px] border-t-2 border-ink bg-white p-5">
        <div className="grid grid-cols-1 items-start gap-[22px] min-[701px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="overflow-hidden pr-1">
            <div ref={towerRef} role="group" aria-label={labels.keystoneTower} className="rd-tower flex flex-col gap-[6px] border-b-[6px] border-ink pb-[10px]">
              {data.moves.map((m, i) => {
                const t = text.moves[m.id];
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={pulled === m.id}
                    onClick={() => pull(m.id)}
                    className="rd-brick flex min-h-11 cursor-pointer flex-col gap-1 bg-ink px-4 py-[14px] text-left text-paper focus-visible:-outline-offset-4 focus-visible:outline-paper"
                  >
                    <span className="font-mono text-[10.5px] font-medium tracking-[0.08em] text-dust uppercase">
                      {fill(labels.moveCount, { i: i + 1, n: data.moves.length })}
                    </span>{" "}
                    <b className="font-display text-[17px] leading-[1.2] font-bold tracking-[-0.01em]">
                      <RadarRich text={t.title} template={template} />
                    </b>{" "}
                    <span className="text-[14px] leading-[1.4] text-dust">
                      <RadarRich text={t.q} template={template} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <RadarShape
              values={shown}
              labels={labels.signals}
              radius={92}
              viewBox="-178 -132 356 270"
              title={labels.radar}
              className="h-auto w-full max-w-[300px]"
            />
            <RadarCanvas
              blocks={data.blocks}
              texts={text.blocks}
              mode="ks"
              template={template}
              hits={new Set(move?.hits ?? [])}
            />
          </div>
        </div>

        <div aria-live="polite" className="flex flex-col items-start gap-3 border-t border-rule pt-4">
          {!move ? (
            <p className={`m-0 ${sectionLabel}`}>{labels.keystonePrompt}</p>
          ) : (
            <>
              <div className={`${reveal} w-full`}>
                <span className={verdict}>
                  <RadarRich text={text.moves[move.id].pull} template={template} />
                </span>{" "}
                <RadarParas items={text.moves[move.id].why} template={template} />
                <div className="flex flex-wrap items-center gap-3 text-[15px]">
                  <span className={sectionLabel}>{labels.keystonePlace}</span>{" "}
                  <b className="font-bold">{text.blocks[move.ours]?.label}</b>{" "}
                  <span className={sectionLabel}>{labels.copy}</span>{" "}
                  <span className="flex gap-1">
                    {[1, 2, 3].map((n) => (
                      <span key={n} className={`h-2 w-[30px] ${n <= move.difficulty ? "bg-ink" : "bg-rule"}`} />
                    ))}
                  </span>{" "}
                  <b className="font-bold">{labels.difficulty[move.difficulty - 1]}</b>
                </div>
              </div>
              <div className="rd-rise flex w-full flex-col gap-2 bg-paper px-4 py-[14px]">
                <span className={sectionLabel}>{labels.keystoneAnswer}</span>{" "}
                <RadarParas items={text.keystone.answer} template={template} />
                {!move.keystone && keystoneIndex > 0 && <p className="m-0 text-[14.5px] text-stone">{tryLine(keystoneIndex)}</p>}
              </div>
              <button type="button" onClick={putBack} className={smallButton}>
                {labels.keystoneBack}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
