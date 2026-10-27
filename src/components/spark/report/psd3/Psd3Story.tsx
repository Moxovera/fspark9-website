"use client";

import { useEffect, useRef, useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { reducedMotion } from "@/components/spark/report/psd3/tabKeys";
import { useTabs } from "@/components/spark/report/psd3/useTabs";
import type { Psd3StoryProps } from "@/types/content";

const FIRST_MS = 160;
const STEP_MS = 240;

/**
 * 06 User story: üç an (sekme), Today ve With the new rules düğmesi,
 * telefon ve yanında başlık, metin, kural ve yapılması gerekenler. Sekme
 * ya da mod değişince telefonun mesajları tek tek gelir (160ms + 240ms
 * arayla); ilk açılışta ve reduced-motion'da hepsi hemen görünür.
 */
export default function Psd3Story({ story, template }: Psd3StoryProps) {
  const [mode, setMode] = useState<"today" | "after">("after");
  const [visible, setVisible] = useState(Infinity);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const play = (count: number) => {
    clear();
    if (reducedMotion()) {
      setVisible(Infinity);
      return;
    }
    setVisible(0);
    for (let i = 0; i < count; i++) {
      timers.current.push(window.setTimeout(() => setVisible(i + 1), FIRST_MS + i * STEP_MS));
    }
  };

  const tabs = useTabs(story.moments.length, 0, (i) => play(story.moments[i][mode].messages.length));
  const moment = story.moments[tabs.index];
  const view = moment[mode];

  const pickMode = (next: "today" | "after") => {
    setMode(next);
    play(moment[next].messages.length);
  };

  return (
    <>
      <div role="tablist" className="grid grid-cols-1 min-[561px]:flex min-[561px]:flex-wrap">
        {story.moments.map((m, i) => (
          <button
            key={m.title}
            ref={tabs.setRef(i)}
            type="button"
            role="tab"
            id={`story-tab-${i}`}
            aria-selected={i === tabs.index}
            aria-controls="story-panel"
            tabIndex={i === tabs.index ? 0 : -1}
            onClick={() => tabs.select(i)}
            onKeyDown={(e) => tabs.onKeyDown(e, i)}
            className={`grid min-w-0 gap-0.5 border-[1.5px] border-ink px-4 py-3 text-left ${i > 0 ? "border-t-0 min-[561px]:border-t-[1.5px] min-[561px]:border-l-0" : ""} ${i === tabs.index ? "bg-ink text-paper" : ""}`}
          >
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase">{m.year}</span>{" "}
            <span className="font-display text-[15px] font-bold">{m.title}</span>
          </button>
        ))}
      </div>
      <div className="mt-3.5 inline-flex flex-wrap border-[1.5px] border-ink">
        {story.modes.map((m, i) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={m.id === mode}
            onClick={() => pickMode(m.id)}
            className={`px-[18px] py-[11px] font-mono text-[12px] tracking-[0.08em] uppercase transition-[background-color,color] duration-[160ms] ease-brand motion-reduce:transition-none ${i > 0 ? "border-l-[1.5px] border-ink" : ""} ${m.id === mode ? "bg-ink text-paper" : "hover:bg-paper"}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="story-panel"
        aria-labelledby={`story-tab-${tabs.index}`}
        className="mt-[26px] grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[861px]:grid-cols-[320px_minmax(0,1fr)]"
      >
        <div
          aria-live="polite"
          className="relative mx-auto flex min-h-[440px] w-[300px] max-w-full flex-col gap-2.5 rounded-[38px] border-[10px] border-ink bg-paper px-3.5 pt-[34px] pb-[22px] before:absolute before:top-2.5 before:left-1/2 before:h-1.5 before:w-20 before:-translate-x-1/2 before:rounded-[3px] before:bg-ink before:content-['']"
        >
          <div className="mb-1 text-center font-mono text-[11px] tracking-[0.06em] text-stone">
            {story.clock} · {moment.year}
          </div>
          {view.messages.map((msg, i) => (
            <div
              key={`${tabs.index}-${mode}-${i}`}
              className={`grid gap-[3px] rounded-[14px] border bg-white px-[13px] py-[11px] transition-[opacity,transform] duration-[480ms] ease-brand motion-reduce:transition-none ${msg.good ? "border-ink" : "border-rule"} ${i < visible ? "" : "translate-y-2 opacity-0"}`}
            >
              <span className="font-mono text-[10.5px] tracking-[0.08em] text-stone uppercase">{msg.app}</span>{" "}
              <span className="text-[14.5px] leading-[1.4]">{msg.text}</span>
              {msg.sub && (
                <>
                  {" "}
                  <span className="text-[12.5px] text-stone">{msg.sub}</span>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="grid min-w-0 gap-[18px]">
          <p className="m-0 font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] font-bold tracking-[-0.02em]">{moment.title}</p>
          <p className="m-0 max-w-[60ch] text-[16.5px]">
            <Psd3Text text={view.text} template={template} />
          </p>
          <div className="grid gap-1.5">
            <span className="font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase">{story.ruleLabel}</span>{" "}
            <p className="m-0 text-[15.5px]">{moment.rule}</p>
          </div>
          <div className="border-t border-rule bg-white p-4">
            <span className="mb-1.5 block font-mono text-[12.5px] font-medium tracking-[0.08em] uppercase">{story.buildLabel}</span>{" "}
            <p className="m-0">{moment.build}</p>
          </div>
        </div>
      </div>
    </>
  );
}
