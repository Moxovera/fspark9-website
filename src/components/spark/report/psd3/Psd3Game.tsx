"use client";

import { useRef, useState } from "react";
import Psd3Text, { Psd3Refs } from "@/components/spark/report/psd3/Psd3Text";
import { fill } from "@/lib/format";
import type { Psd3GameProps } from "@/types/content";

const KEYS = "ABC";
const btn = "bg-ink px-5 py-[13px] font-mono text-[12.5px] font-medium tracking-[0.08em] text-paper uppercase";

/**
 * 07 Who pays? Altı vaka, vaka başına tek seçim, doğru ve yanlış durumu,
 * kaynaklı açıklama, ilerleme kareleri, skor, sonuç ekranı, Play again ve
 * Copy my score (panoya; kopyalanamazsa metin yanında görünür). Hiçbir şey
 * saklanmıyor ya da gönderilmiyor.
 */
export default function Psd3Game({ game, template }: Psd3GameProps) {
  const total = game.cases.length;
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState("");
  const nextRef = useRef<HTMLButtonElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const score = results.filter(Boolean).length;
  const done = current >= total;
  const item = game.cases[Math.min(current, total - 1)];

  const answer = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setResults((r) => {
      const next = [...r];
      next[current] = i === item.answer;
      return next;
    });
    window.setTimeout(() => nextRef.current?.focus({ preventScroll: true }), 0);
  };

  const advance = () => {
    const next = current + 1;
    setCurrent(next);
    setPicked(null);
    if (next >= total) setFinished(true);
    else window.setTimeout(() => firstOptionRef.current?.focus({ preventScroll: true }), 0);
  };

  const again = () => {
    setCurrent(0);
    setResults([]);
    setPicked(null);
  };

  const share = () => {
    const text = fill(game.shareTemplate, { score, total });
    try {
      navigator.clipboard
        .writeText(text)
        .then(() => setCopied(game.copiedLabel))
        .catch(() => setCopied(text));
    } catch {
      setCopied(text);
    }
  };

  const dots = (
    <span aria-hidden="true" className="flex gap-1.5">
      {game.cases.map((c, i) => (
        <i
          key={c.question}
          className={`block size-3 border-[1.5px] border-ink ${
            results[i] === true ? "bg-ink" : results[i] === false ? "bg-[repeating-linear-gradient(45deg,var(--ink)_0_2px,transparent_2px_5px)]" : ""
          } ${i === current ? "outline-2 outline-offset-2 outline-ink" : ""}`}
        />
      ))}
    </span>
  );
  const mono = "font-mono text-[12.5px] font-medium tracking-[0.08em] uppercase";
  const tier = score >= 5 ? game.tiers[0] : score >= 3 ? game.tiers[1] : game.tiers[2];

  return (
    <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,48px)] min-[901px]:grid-cols-[minmax(0,1fr)_300px]">
      <div aria-live="polite" className="border-t-2 border-ink bg-white p-[clamp(20px,3vw,32px)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className={mono}>{done ? game.resultLabel : fill(game.caseTemplate, { n: current + 1, total })}</span>{" "}
          {dots}
        </div>
        {done ? (
          <>
            <p className="m-0 font-display text-[clamp(20px,2.4vw,26px)] leading-[1.25] font-bold tracking-[-0.015em]">
              {fill(game.resultTemplate, { score, total })}
            </p>
            <p className="mt-3 mb-0">{tier}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={again} className={btn}>
                {game.againLabel}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="m-0 font-display text-[clamp(20px,2.4vw,26px)] leading-[1.25] font-bold tracking-[-0.015em]">{item.question}</p>
            <div className="mt-[22px] grid gap-2.5">
              {item.options.map((option, i) => {
                const state = picked === null ? "" : i === item.answer ? "right" : i === picked ? "wrong" : "";
                return (
                  <button
                    key={option}
                    ref={i === 0 ? firstOptionRef : undefined}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => answer(i)}
                    className={`flex items-center gap-3 border-[1.5px] px-4 py-3.5 text-left text-[16px] transition-colors duration-[160ms] ease-brand motion-reduce:transition-none disabled:cursor-default ${
                      state === "right"
                        ? "border-ink bg-ink text-paper"
                        : state === "wrong"
                          ? "border-stone bg-paper text-stone line-through"
                          : "border-ink bg-paper enabled:hover:bg-white"
                    }`}
                  >
                    <span className={`grid size-[22px] flex-none place-items-center border-[1.5px] font-mono text-[12px] ${state === "right" ? "border-paper" : "border-current"}`}>
                      {KEYS[i]}
                    </span>{" "}
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <>
                <div className="mt-[18px] border-t border-rule pt-4 text-[15.5px]">
                  <p className={`mb-1.5 font-mono text-[12px] tracking-[0.08em] uppercase`}>{picked === item.answer ? game.rightLabel : game.wrongLabel}</p>
                  <p className="m-0">
                    <Psd3Text text={item.explanation} template={template} /> <Psd3Refs sources={item.sources} template={template} />
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button ref={nextRef} type="button" onClick={advance} className={btn}>
                    {current === total - 1 ? game.seeResultLabel : game.nextLabel}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <aside className="grid gap-3.5">
        <span className={mono}>{game.scoreLabel}</span>
        <div className="font-display text-[72px] leading-none font-extrabold tracking-[-0.04em] tabular-nums">
          {score}/{total}
        </div>
        <p className="m-0 text-[15px] text-stone">{game.sideNote}</p>
        {finished && (
          <div>
            <button type="button" onClick={share} className="border-[1.5px] border-ink bg-transparent px-5 py-[13px] font-mono text-[12.5px] font-medium tracking-[0.08em] text-ink uppercase">
              {game.copyLabel}
            </button>{" "}
            <span aria-live="polite" className="font-mono text-[12px] text-positive">
              {copied}
            </span>
          </div>
        )}
      </aside>
    </div>
  );
}
