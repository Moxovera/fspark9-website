"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useReveal } from "@/hooks/useReveal";
import type { TsdRoadmapProps } from "@/types/content";

// Dört fazlı hat ve sekmeler. İlerleme çizgisi görünüme girince bir kez
// Flare dolar; sağ ve sol ok tuşları fazlar arasında gezer (uçlarda durur).
export function Roadmap({ phases, ariaLabel, exitLabel }: TsdRoadmapProps) {
  const ref = useReveal<HTMLDivElement>(0.3);
  const [sel, setSel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : -1;
    if (next < 0 || next >= phases.length) return;
    tabs.current[next]?.focus();
    setSel(next);
  }

  return (
    <div className="road" ref={ref}>
      <div className="road-track" role="tablist" aria-label={ariaLabel}>
        <div className="base-l" />
        <div className="prog" />
        {phases.map((p, i) => (
          <button
            key={p.num}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            className="ms"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-controls={`${uid}-panel-${i}`}
            aria-selected={i === sel}
            style={{ left: `${p.left}%` }}
            onClick={() => setSel(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="dot">{p.num}</span>
            <span className="when">{p.when}</span>
          </button>
        ))}
      </div>

      {phases.map((p, i) => (
        <div
          key={p.num}
          className={i === sel ? "phase on" : "phase"}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
        >
          <h3>{p.title}</h3>
          <p className="goal">{p.goal}</p>
          <div className="ph-grid">
            {p.columns.map((c) => (
              <div key={c.heading}>
                <h5>{c.heading}</h5>
                <ul className="clean">
                  {c.items.map((item) => (
                    <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="exit">
            <b>{exitLabel}</b>
            {p.exit}
          </div>
        </div>
      ))}
    </div>
  );
}
