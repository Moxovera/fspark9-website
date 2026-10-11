"use client";

import { useState } from "react";
import RadarRich from "@/components/spark/radar/RadarRich";
import { group, h2, option, options, sectionLabel } from "@/components/spark/radar/styles";
import type { RadarWeakProps } from "@/types/content";

/**
 * Zayıf halka: üç kırılgan nokta, tek seçim. Seçince üç soru da açılır,
 * seçilen ilk sırada ve 2px Ink çizgiyle; ardından takip cümlesi.
 */
export default function RadarWeak({ text, labels, template }: RadarWeakProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const order = picked === null ? [] : [picked, ...text.items.map((_, i) => i).filter((i) => i !== picked)];

  return (
    <section id="weak" className={group}>
      <span className={sectionLabel}>{labels.weak}</span>
      <h2 className={h2}>{labels.weakTitle}</h2>
      <div role="group" className={options}>
        {text.items.map((item, i) => {
          const isPicked = picked === i;
          return (
            <button
              key={item.t}
              type="button"
              aria-pressed={isPicked}
              disabled={picked !== null && !isPicked}
              onClick={() => picked === null && setPicked(i)}
              className={option(isPicked, picked !== null)}
            >
              <span className="flex-none pt-[2px] font-mono text-[12px] text-stone">{i + 1}</span>{" "}
              <span>
                <RadarRich text={item.t} template={template} />
              </span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="flex flex-col">
          {order.map((index, rank) => {
            const item = text.items[index];
            return (
              <div
                key={item.t}
                className={`rd-rise flex flex-col gap-[6px] py-4 ${rank === 0 ? "border-t-2 border-ink" : "border-t border-rule"}`}
                style={{ animationDelay: `${rank * 160}ms` }}
              >
                <span className={sectionLabel}>
                  {rank === 0 ? labels.picked : ""}
                  {item.t}
                </span>{" "}
                <p className={`m-0 font-display text-[19px] leading-[1.3] font-bold tracking-[-0.015em] ${rank === 0 ? "" : "text-stone"}`}>
                  <RadarRich text={item.q} template={template} />
                </p>{" "}
                <span className="text-[14.5px] text-stone">
                  <RadarRich text={item.ctx} template={template} />
                </span>
              </div>
            );
          })}
          {text.follow && (
            <p className="m-0 max-w-[62ch] border-t border-rule pt-[14px] text-[15px] text-stone">
              <RadarRich text={text.follow} template={template} />
            </p>
          )}
        </div>
      )}
    </section>
  );
}
