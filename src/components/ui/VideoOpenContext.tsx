"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface VideoOpenValue {
  /** Açık video penceresi var mı. */
  isOpen: boolean;
  setCount: (update: (count: number) => number) => void;
}

const VideoOpenContext = createContext<VideoOpenValue | null>(null);

/**
 * Video penceresinin (VideoModal) açık olup olmadığı: sabit bülten kutusu
 * pencere açıkken gizleniyor. Sağlayıcı yoksa (kilitli raporlar) sessizce
 * hiçbir şey yapmaz.
 */
export function VideoOpenProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const value = useMemo(() => ({ isOpen: count > 0, setCount }), [count]);
  return <VideoOpenContext.Provider value={value}>{children}</VideoOpenContext.Provider>;
}

export function useVideoOpen() {
  return useContext(VideoOpenContext)?.isOpen ?? false;
}

/** VideoModal açıkken sayacı bir artırır. */
export function useReportVideoOpen(open: boolean) {
  const setCount = useContext(VideoOpenContext)?.setCount;
  useEffect(() => {
    if (!open || !setCount) return;
    setCount((n) => n + 1);
    return () => setCount((n) => n - 1);
  }, [open, setCount]);
}
