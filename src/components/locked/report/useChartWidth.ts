"use client";

import { useEffect, useRef, useState } from "react";
import { MIN_CHART_WIDTH } from "./chart-helpers";

// Ported from the reference's W(el) = Math.max(280, el.clientWidth):
// each chart reads its own container width to decide layout (label count,
// font size, tick density — a container-query need plain CSS scaling can't
// give us), so it must re-measure on resize, not just once on mount.
export function useChartWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setWidth(Math.max(MIN_CHART_WIDTH, Math.floor(entry.contentRect.width)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
