"use client";

import { useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import SmeReading from "@/components/spark/report/sme/SmeReading";
import { formatNumber } from "@/lib/poolMath";
import type { SmeMirrorProps, SmePath } from "@/types/content";

const mono = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";
const SIDES: SmePath[] = ["digital", "sparkasse"];

/**
 * 05 Ayna: yolculuk aşamaları, üstte Dijital ve Geleneksel anahtarı.
 * Anahtar değişince şikayet sütunu değişir, "müşterinin asıl istediği"
 * sütunu sabit kalır. Geniş ekranda tablo gibi üç sütun, dar ekranda kart.
 * Altında Trustpilot puan farkı ve yorumu.
 */
export default function SmeMirror({ mirror, readingLabel, template, locale }: SmeMirrorProps) {
  const [side, setSide] = useState<SmePath>("digital");
  const text = (s: string) => <Psd3Text text={s} template={template} />;

  return (
    <div className="grid gap-[clamp(28px,4vw,48px)]">
      <div role="radiogroup" aria-label={mirror.toggleLabel} className="flex w-full max-w-[420px] border-2 border-ink">
        {SIDES.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={side === s}
            onClick={() => setSide(s)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next = side === "digital" ? "sparkasse" : "digital";
                setSide(next);
                (e.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[data-side="${next}"]`))?.focus();
              }
            }}
            tabIndex={side === s ? 0 : -1}
            data-side={s}
            className={`min-h-11 flex-1 px-4 py-2 text-[15px] font-bold ${side === s ? "bg-ink text-paper" : "bg-white"}`}
          >
            {mirror.sides[s]}
          </button>
        ))}
      </div>

      <div>
        <div className="hidden grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_minmax(0,1fr)] gap-5 border-b-[1.5px] border-ink pb-3 min-[821px]:grid">
          <span className={mono}>{mirror.columns.stage}</span>
          <span className={mono}>
            {mirror.columns.complaint} · {mirror.sides[side]}
          </span>
          <span className={`${mono} flex items-center gap-2`}>
            <span aria-hidden="true" className="size-2 rounded-full bg-flare" />
            {mirror.columns.want}
          </span>
        </div>
        <ul aria-live="polite" className="m-0 grid list-none p-0">
          {mirror.rows.map((r) => (
            <li key={r.stage} className="grid grid-cols-1 gap-x-5 gap-y-2 border-b border-rule py-4 min-[821px]:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_minmax(0,1fr)]">
              <h3 className="m-0 font-display text-[18px] leading-[1.2] font-extrabold tracking-[-0.015em]">{r.stage}</h3>
              <p className="m-0 text-[15.5px]">
                <span className={`${mono} mb-1 block text-stone min-[821px]:hidden`}>
                  {mirror.columns.complaint} · {mirror.sides[side]}
                </span>
                {side === "digital" ? r.digital : r.traditional}
              </p>
              <p className="m-0 bg-paper px-3 py-2 text-[15.5px] font-bold">
                <span className={`${mono} mb-1 flex items-center gap-2 font-medium text-stone min-[821px]:hidden`}>
                  <span aria-hidden="true" className="size-2 rounded-full bg-flare" />
                  {mirror.columns.want}
                </span>
                {r.want}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3 mb-0 flex flex-wrap items-center gap-x-2 text-[13px] text-stone">
          <span aria-hidden="true" className="size-2 rounded-full bg-flare" />
          <span>
            {readingLabel}: {mirror.columns.want}.
          </span>
          <span>{text(mirror.refs)}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-[clamp(20px,4vw,48px)] min-[861px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid gap-4 border-t-2 border-ink pt-4">
          <span className={mono}>
            {mirror.scoresLabel} {text(mirror.scoreRefs)}
          </span>
          {mirror.scores.map((s) => (
            <div key={s.name} className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
              <span className="grid">
                <b className="font-display text-[17px] font-bold">{s.name}</b>
                <small className="font-mono text-[10.5px] text-stone">{s.count}</small>
              </span>
              <span className="flex items-center gap-3">
                <span className="relative h-5 flex-1 bg-white">
                  <span className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${(s.score / 5) * 100}%` }} />
                </span>
                <span className="font-display text-[28px] leading-none font-extrabold tabular-nums">{formatNumber(locale, s.score, 1)}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          <SmeReading label={readingLabel} text={mirror.scoreReading} template={template} />
          <p className="m-0 text-[14px] text-stone">{mirror.caveat}</p>
        </div>
      </div>
    </div>
  );
}
