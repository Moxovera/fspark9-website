"use client";

import { useEffect, useRef } from "react";
import type { MarqueeProps } from "@/types/content";

/**
 * Sonsuz döngülü kayan şerit. children iki kopya halinde (aynı liste iki
 * kez) verilmeli; track genişliğinin yarısı kadar kayınca başa sarar, bu
 * yüzden döngü görünmez. Üzerine gelince ya da içinde odak varken
 * yumuşakça durur. Reduced motion'da hiç kaymaz (statik satır). rAF ve
 * dinleyiciler cleanup'ta duruyor.
 */
export default function Marquee({ className, style, loopSeconds = 40, children }: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let off = 0;
    let factor = 0;
    let targetFactor = 1;
    let last = 0;
    let rafId: number;

    const pause = () => {
      targetFactor = 0;
    };
    const resume = () => {
      if (!wrap.contains(document.activeElement)) targetFactor = 1;
    };
    const onFocusOut = () => {
      requestAnimationFrame(resume);
    };
    wrap.addEventListener("mouseenter", pause, { passive: true });
    wrap.addEventListener("mouseleave", resume, { passive: true });
    wrap.addEventListener("focusin", pause);
    wrap.addEventListener("focusout", onFocusOut);

    const step = (ts: number) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      factor += (targetFactor - factor) * Math.min(dt * 6, 1);
      const half = track.scrollWidth / 2;
      if (half > 0) {
        off += (half / loopSeconds) * factor * dt;
        if (off >= half) off -= half;
      }
      track.style.transform = `translateX(${-off}px)`;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("mouseenter", pause);
      wrap.removeEventListener("mouseleave", resume);
      wrap.removeEventListener("focusin", pause);
      wrap.removeEventListener("focusout", onFocusOut);
    };
  }, [loopSeconds]);

  return (
    <div ref={wrapRef} className={className} style={style}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {children}
      </div>
    </div>
  );
}
