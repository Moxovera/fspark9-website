"use client";

import { useState } from "react";
import RadarRich, { RadarParas } from "@/components/spark/radar/RadarRich";
import { group, h2, option, options, reveal, sectionLabel, verdict } from "@/components/spark/radar/styles";
import type { RadarGuessProps, RadarOptionKey } from "@/types/content";

const KEYS: RadarOptionKey[] = ["a", "b", "c", "d"];

/**
 * Tahmin: dört seçenek, tek seçim. Seçince hüküm ("Bildin." / "Tam olarak
 * bu değil."), o seçeneğin geri bildirimi ve cevap açılır; gelir kutusu
 * panoda dolar. Seçim sadece bu sayfa ömründe durur, hiçbir yere saklanmaz
 * ya da gönderilmez.
 */
export default function RadarGuess({ text, guess, labels, template, onAnswer }: RadarGuessProps) {
  const [picked, setPicked] = useState<RadarOptionKey | null>(null);

  function pick(key: RadarOptionKey) {
    if (picked) return;
    setPicked(key);
    onAnswer(guess.fills);
  }

  return (
    <section id="guess" className={group}>
      <span className={sectionLabel}>{labels.guess}</span>
      <h2 className={h2}>
        <RadarRich text={text.title} template={template} />
      </h2>
      <div role="group" className={options}>
        {KEYS.map((key) => {
          const isPicked = picked === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isPicked}
              disabled={picked !== null && !isPicked}
              onClick={() => pick(key)}
              className={option(isPicked, picked !== null)}
            >
              <span className="flex-none pt-[2px] font-mono text-[12px] text-stone">{key.toUpperCase()}</span>{" "}
              <span>
                <RadarRich text={text.options[key]} template={template} />
              </span>
            </button>
          );
        })}
      </div>
      {picked && (
        <div className={reveal}>
          <span className={verdict}>{picked === guess.correct ? labels.right : labels.wrong}</span>{" "}
          <p className="m-0">
            <RadarRich text={text.feedback[picked]} template={template} />
          </p>
          <RadarParas items={text.answer} template={template} />
        </div>
      )}
    </section>
  );
}
