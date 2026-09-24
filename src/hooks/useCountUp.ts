"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Brief v4 §10'daki ikinci küçük hook: bir değer görünür olunca 0'dan
 * hedefe sayar. Görünürlük tek IntersectionObserver ile, sayım rAF ile;
 * ikisi de cleanup'ta duruyor. Reduced motion'da hemen son değer.
 */
export function useCountUp<T extends HTMLElement>(target: number, duration = 900, delay = 0) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number | null = null;
    let timer: number | null = null;
    setValue(0);

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        timer = window.setTimeout(run, delay);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [target, duration, delay]);

  return { ref, value };
}
