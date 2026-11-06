"use client";

import { useEffect, useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { useInView } from "@/hooks/useReveal";
import { formatNumber } from "@/lib/poolMath";
import type { SmeTwinsProps } from "@/types/content";

const DURATION = 1100;

/**
 * Açılışın yan yana iki büyük sayısı. Ekrana girince 0'dan değerine bir
 * kez sayar (cubic-out), sonra durur. JS yokken ve reduced-motion'da son
 * değer. Ekran okuyucu hep son değeri okur.
 */
export default function SmeTwins({ twins, locale, template }: SmeTwinsProps) {
  const { ref, seen } = useInView<HTMLDivElement>(0.4);
  const [k, setK] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setK(0);
  }, []);

  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setK(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen]);

  return (
    <div ref={ref} className="grid grid-cols-2 border-t border-inkrule">
      {twins.map((f, i) => (
        <div key={f.label} className={`min-w-0 border-inkrule pt-6 pb-2 ${i === 0 ? "border-r pr-4 min-[641px]:pr-8" : "pl-4 min-[641px]:pl-8"}`}>
          <div className="font-display text-[clamp(38px,10.5vw,148px)] leading-[0.9] font-extrabold tracking-[-0.05em] tabular-nums">
            <span className="sr-only">{f.value}</span>
            <span aria-hidden="true">{k === 1 ? f.value : f.template.replace("{n}", formatNumber(locale, Math.round(f.to * k), f.decimals))}</span>
          </div>
          <p className="mt-3 mb-0 max-w-[34ch] text-[14px] min-[641px]:text-[15.5px] leading-[1.45] text-dust">
            <Psd3Text text={f.label} template={template} />
          </p>
        </div>
      ))}
    </div>
  );
}
