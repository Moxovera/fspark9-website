"use client";

import { useRef, useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { ArrowRightIcon } from "@/components/icons";
import type { UkStoryProps } from "@/types/content";

const mono = "font-mono text-[12px] font-medium tracking-[0.08em] uppercase";
const LETTERS = ["A", "B", "C"];

/**
 * 13 Hikaye: dört adımlı ilerleme çubuğu. Her durakta zaman, başlık, metin,
 * "Sizin kararınız" ve üç seçenek. Seçim durağı kilitler, o seçeneğin
 * sonucu, sonra "Dan ne yaptı", sonra Devam düğmesi gelir. Dördüncü duraktan
 * sonra bitiş kartı: okurun dört seçimi kısa kapı adlarıyla numaralı
 * çipler, 16. bölüme not, "Yeniden oyna" ve #gaps linki.
 */
export default function UkStory({ story, gapsHref, gapsLabel, template }: UkStoryProps) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const n = story.stages.length;
  const done = step >= n;
  const stage = done ? null : story.stages[step];

  const focusHead = () => requestAnimationFrame(() => headRef.current?.focus({ preventScroll: true }));
  const next = () => {
    if (chosen === null) return;
    setPicks((p) => [...p, chosen]);
    setChosen(null);
    setStep((s) => s + 1);
    focusHead();
  };
  const restart = () => {
    setPicks([]);
    setChosen(null);
    setStep(0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rootRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    focusHead();
  };

  return (
    <div ref={rootRef} className="max-w-[860px] scroll-mt-[150px]">
      <div className="mb-6 flex gap-2" aria-hidden="true">
        {story.stages.map((s, i) => (
          <span key={s.when} className={`h-1 flex-1 ${i < step ? "bg-paper" : i === step ? "bg-flare" : "bg-inkrule"}`} />
        ))}
      </div>

      {stage ? (
        <div key={step} className="uk-appear grid gap-0 border-t-2 border-paper pt-6">
          <span className={`${mono} text-flare`}>{stage.when}</span>
          <h3 ref={headRef} tabIndex={-1} className="mt-2 mb-3 font-display text-[clamp(26px,3vw,34px)] leading-[1.1] font-extrabold tracking-[-0.02em] outline-none focus-visible:outline-2 focus-visible:outline-paper">
            {stage.title}
          </h3>
          <p className="m-0 text-dust">
            <Psd3Text text={stage.text} template={template} />
          </p>
          <p className="mt-6 mb-3.5 flex flex-wrap items-center gap-2.5 font-display text-[20px] leading-[1.3] font-bold">
            <span className={`${mono} bg-flare px-2 py-1 text-ink`}>{story.yourCall}</span>
            {stage.question}
          </p>
          <div className="grid gap-2.5">
            {stage.options.map((o, j) => {
              const picked = chosen === j;
              const locked = chosen !== null;
              return (
                <button
                  key={o.label}
                  type="button"
                  aria-pressed={picked}
                  aria-disabled={locked && !picked}
                  onClick={() => {
                    if (!locked) setChosen(j);
                  }}
                  className={`flex min-h-11 items-start gap-3.5 border-[1.5px] px-4 py-3.5 text-left text-[17px] leading-[1.4] font-medium transition-[border-color,opacity] duration-200 ease-brand motion-reduce:transition-none ${
                    picked ? "border-flare" : locked ? "border-inkrule opacity-45" : "border-inkrule hover:border-paper"
                  } ${locked ? "cursor-default" : ""}`}
                >
                  <b className="flex-none pt-0.5 font-mono text-[13px] font-medium text-dust">{LETTERS[j]}</b>
                  <span>{o.label}</span>
                </button>
              );
            })}
          </div>
          {chosen !== null && (
            <div aria-live="polite" className="grid gap-3.5">
              <p className="uk-appear mt-4 mb-0 border-[1.5px] border-inkrule p-[18px] text-[16.5px] text-dust">
                <Psd3Text text={stage.options[chosen].result} template={template} />
              </p>
              <div className="uk-appear grid gap-1.5 border-l-[3px] border-flare py-1 pl-[18px] [animation-delay:160ms]">
                <span className={`${mono} text-flare`}>{story.whatHappened}</span>
                <p className="m-0">
                  <Psd3Text text={stage.happened} template={template} />
                </p>
              </div>
              <button
                type="button"
                onClick={next}
                className="uk-appear mt-2 inline-flex min-h-11 items-center gap-2.5 justify-self-start bg-paper px-[18px] py-2.5 text-[15px] font-bold text-ink [animation-delay:320ms]"
              >
                {story.next}
                <ArrowRightIcon className="size-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="uk-appear grid gap-0 border-t-2 border-paper pt-6">
          <h3 ref={headRef} tabIndex={-1} className="m-0 mb-3.5 font-display text-[clamp(30px,3.6vw,42px)] leading-[1.08] font-extrabold tracking-[-0.025em] outline-none focus-visible:outline-2 focus-visible:outline-paper">
            {story.endTitle}
          </h3>
          <p className="m-0 text-dust">
            <Psd3Text text={story.endBody} template={template} />
          </p>
          <p className={`${mono} mt-6 mb-2.5 text-dust`}>{story.doorsLabel}</p>
          <ol className="m-0 mb-5 flex list-none flex-wrap gap-2.5 p-0">
            {picks.map((p, i) => (
              <li key={i} className="flex items-center gap-2.5 border-[1.5px] border-inkrule py-2 pr-3.5 pl-2 text-[15px]">
                <span className="grid size-[26px] place-items-center rounded-full bg-flare font-mono text-[13px] font-bold text-ink">{i + 1}</span>
                {story.stages[i].options[p].door}
              </li>
            ))}
          </ol>
          <p className="mt-0 mb-5 text-[15px] text-dust">{story.endNote}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button type="button" onClick={restart} className="inline-flex min-h-11 items-center bg-paper px-[18px] py-2.5 text-[15px] font-bold text-ink">
              {story.restart}
            </button>
            <a href={gapsHref} className="group inline-flex min-h-11 items-center text-[15px] font-bold text-paper no-underline">
              <span className="text-link-line inline-flex items-center gap-[10px] pb-[5px] leading-[normal]">
                {gapsLabel}
                <ArrowRightIcon className="go-arrow -mx-[0.2em] size-[1em] flex-none" />
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
