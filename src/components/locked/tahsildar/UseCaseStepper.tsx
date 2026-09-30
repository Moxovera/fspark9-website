"use client";

import { useEffect, useRef, useState } from "react";
import type { TsdUseCaseNode, TsdUseCaseStepperProps } from "@/types/content";

const AUTO_MS = 4200;

// Altı adım: Geri, İleri (son adımda "Başa dön"), otomatik oynatma (4,2 sn;
// son adımda ya da herhangi bir elle tıklamada durur), noktalar ve
// adıma göre yanan halkalar.
export function UseCaseStepper({ chain, partners, steps, labels }: TsdUseCaseStepperProps) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const iRef = useRef(0);
  const last = steps.length - 1;
  const step = steps[i];

  function go(n: number) {
    iRef.current = n;
    setI(n);
  }

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      const n = (iRef.current + 1) % steps.length;
      go(n);
      if (n === steps.length - 1) setPlaying(false);
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [playing, steps.length]);

  const node = (n: TsdUseCaseNode) => (
    <div key={n.id} className={step.nodes.includes(n.id) ? "uc-node on" : "uc-node"}>
      <span className="r">{n.role}</span>
      <b>{n.name}</b>
    </div>
  );

  return (
    <div className="uc">
      <div className="uc-chain">{chain.map(node)}</div>
      <div className="uc-part">{partners.map(node)}</div>
      <div className="uc-text" aria-live="polite">
        <div className="no">{i + 1}</div>
        <div>
          <h4>{step.title}</h4>
          <p>{step.text}</p>
        </div>
      </div>
      <div className="uc-nav">
        <button
          type="button"
          disabled={i === 0}
          onClick={() => {
            setPlaying(false);
            if (i > 0) go(i - 1);
          }}
        >
          {labels.prev}
        </button>
        <button
          type="button"
          className="pri"
          onClick={() => {
            setPlaying(false);
            go((i + 1) % steps.length);
          }}
        >
          {i === last ? labels.restart : labels.next}
        </button>
        <button type="button" onClick={() => setPlaying((p) => !p)}>
          {playing ? labels.stop : labels.play}
        </button>
        <div className="uc-dots" aria-hidden="true">
          {steps.map((s, k) => (
            <i key={s.title} className={k === i ? "on" : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}
