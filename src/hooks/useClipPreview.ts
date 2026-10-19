"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { previewAllowed, READY_TIMEOUT_MS, SLOW_CONNECTIONS } from "@/lib/videoPreview";

/**
 * idle: poster, çizgi boş, düğme yok. loading: klip iniyor (görünmez).
 * playing: klip posterin üstünde, çizgi klibin süresine bağlı doluyor.
 * ending: son kareden postere çapraz geçiş, düğme beliriyor. still: hareket
 * bitti (ya da hiç başlamadı): poster, dolu çizgi, düğme.
 */
export type ClipPhase = "idle" | "loading" | "playing" | "ending" | "still";

/** Çapraz geçiş süresi (globals.css .ring-clip.is-ending ve .film-clip.is-ending ile aynı). */
export const CROSSFADE_MS = 600;

interface ClipPreviewOptions {
  /**
   * visible: alan görünür olunca iner (Four services halkası).
   * afterLoad: sayfa `load` olayını verdikten sonra, tarayıcı boştayken ve alan
   * görünürken iner (Spark açılışı: kart sayfanın en üstünde, açılışa yük bindirmesin).
   */
  start: "visible" | "afterLoad";
  /** Alanın ne kadarı görünürken başlanır (0 ile 1). */
  threshold: number;
  /** Bu bağlantı türlerinde (navigator.connection.effectiveType) klip hiç inmez. Varsayılan: 2g ve slow-2g. */
  blockedConnections?: string[];
  /** Çizgiyi çizer: 0 ile 1. Klibin gerçek currentTime / duration değeri; her karede çağrılır. */
  onProgress: (progress: number) => void;
}

/**
 * Sessiz önizleme klibinin ortak akışı (Four services halkası ve Spark film
 * kartı): klip bir kez oynar, çizgi klibin zamanına bağlı dolar, sonra poster
 * ve düğme; döngü yok, tekrar yok. Klip hiç inmez: hareket azaltma, veri
 * tasarrufu, yavaş bağlantı (previewAllowed) ya da indirme başladıktan sonra
 * READY_TIMEOUT_MS içinde oynamaya hazır olmaması durumunda. Bu reveal değil,
 * klibin durumunu izliyor: useReveal'dan ayrı.
 */
export function useClipPreview<Stage extends HTMLElement>({ start, threshold, blockedConnections = SLOW_CONNECTIONS, onProgress }: ClipPreviewOptions) {
  const [phase, setPhase] = useState<ClipPhase>("idle");
  const stageRef = useRef<Stage>(null);
  const clipRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(onProgress);
  useEffect(() => {
    progressRef.current = onProgress;
  }, [onProgress]);

  // Başlangıç: izin varsa (ve gerekiyorsa sayfa yüklendikten sonra) alan görünür olunca klip inmeye başlar; bir kez.
  useEffect(() => {
    if (!previewAllowed(blockedConnections)) {
      setPhase("still");
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;
    let ready = start === "visible";
    let visible = false;
    let done = false;
    const cleanups: Array<() => void> = [];
    const go = () => {
      if (done || !ready || !visible) return;
      done = true;
      observer.disconnect();
      // Bağlantı kalitesi sayfa açılırken henüz bilinmeyebilir: indirmeden hemen önce yeniden bakılır.
      setPhase((current) => (current !== "idle" ? current : previewAllowed(blockedConnections) ? "loading" : "still"));
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        go();
      },
      { threshold },
    );
    observer.observe(stage);
    if (start === "afterLoad") {
      const armed = () => {
        ready = true;
        go();
      };
      const arm = () => {
        if (typeof window.requestIdleCallback === "function") {
          const id = window.requestIdleCallback(armed, { timeout: 2000 });
          cleanups.push(() => window.cancelIdleCallback(id));
        } else {
          const id = window.setTimeout(armed, 1500);
          cleanups.push(() => window.clearTimeout(id));
        }
      };
      if (document.readyState === "complete") {
        arm();
      } else {
        window.addEventListener("load", arm, { once: true });
        cleanups.push(() => window.removeEventListener("load", arm));
      }
    }
    return () => {
      done = true;
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [start, threshold, blockedConnections]);

  // İniş: READY_TIMEOUT_MS içinde oynamaya hazır olmazsa vazgeçilir (klip DOM'dan kalkar).
  useEffect(() => {
    if (phase !== "loading") return;
    const clip = clipRef.current;
    if (!clip) return;
    const timeout = window.setTimeout(() => setPhase("still"), READY_TIMEOUT_MS);
    const onReady = () => {
      window.clearTimeout(timeout);
      setPhase("playing");
    };
    clip.addEventListener("canplaythrough", onReady);
    clip.muted = true;
    clip.preload = "auto";
    clip.load();
    return () => {
      window.clearTimeout(timeout);
      clip.removeEventListener("canplaythrough", onReady);
    };
  }, [phase]);

  // Oynatma: çizgi klibin zamanına bağlı, requestAnimationFrame ile.
  useEffect(() => {
    if (phase !== "playing") return;
    const clip = clipRef.current;
    if (!clip) return;
    let frame = 0;
    const tick = () => {
      if (clip.duration > 0) progressRef.current(clip.currentTime / clip.duration);
      frame = window.requestAnimationFrame(tick);
    };
    const onEnded = () => {
      progressRef.current(1);
      setPhase("ending");
    };
    clip.addEventListener("ended", onEnded);
    frame = window.requestAnimationFrame(tick);
    clip.play().catch(() => setPhase("still"));
    return () => {
      window.cancelAnimationFrame(frame);
      clip.removeEventListener("ended", onEnded);
    };
  }, [phase]);

  // Çapraz geçiş bitince klip kalkar; sonra hiçbir şey hareket etmez.
  useEffect(() => {
    if (phase === "still") {
      progressRef.current(1);
      return;
    }
    if (phase !== "ending") return;
    const timer = window.setTimeout(() => setPhase("still"), CROSSFADE_MS + 100);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Önizleme sırasında tıklanırsa önizleme durur (çapraz geçiş başladıysa bitirilir).
  const halt = useCallback(() => {
    clipRef.current?.pause();
    setPhase((current) => (current === "ending" ? current : "still"));
  }, []);

  return {
    phase,
    stageRef,
    clipRef,
    halt,
    clipMounted: phase === "loading" || phase === "playing" || phase === "ending",
    /** Önizleme bitti ya da hiç başlamadı: düğme görünür. */
    settled: phase === "ending" || phase === "still",
  };
}
