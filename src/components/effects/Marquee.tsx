"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Sonsuz döngülü kayan şerit — dc.html: setupMarquee() (support.js /
 * DCLogic script). children iki kopya halinde (aynı liste iki kez)
 * verilmeli; track genişliğinin yarısı kadar kayınca başa sarar, bu
 * yüzden döngü görünmez.
 */
export default function Marquee({ className, style, children }: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let off = 0;
    let speed = 0;
    let target = 60;
    let last = 0;
    let rafId: number;

    const onEnter = () => {
      target = 14;
    };
    const onLeave = () => {
      target = 60;
    };
    wrap.addEventListener("mouseenter", onEnter, { passive: true });
    wrap.addEventListener("mouseleave", onLeave, { passive: true });

    const step = (ts: number) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      speed += (target - speed) * Math.min(dt * 4, 1);
      off += speed * dt;
      const half = track.scrollWidth / 2;
      if (half > 0 && off >= half) off -= half;
      track.style.transform = `translateX(${-off}px)`;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} style={style}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {children}
      </div>
    </div>
  );
}
