"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import VideoModal from "@/components/ui/VideoModal";
import { previewAllowed, READY_TIMEOUT_MS } from "@/lib/videoPreview";
import type { ServicesRingStageProps } from "@/types/content";

/**
 * idle: poster, çizgi boş, düğme yok. loading: klip iniyor (görünmez).
 * playing: klip posterin üstünde, çizgi klibin süresine bağlı doluyor.
 * ending: son kareden postere çapraz geçiş, düğme beliriyor. still: hareket
 * bitti (ya da hiç başlamadı): poster, perde, dolu çizgi, düğme.
 */
type Phase = "idle" | "loading" | "playing" | "ending" | "still";

/** Çapraz geçiş süresi (globals.css .ring-clip.is-ending ile aynı). */
const CROSSFADE_MS = 600;
/** 600 birimlik halkada ilerleme çizgisinin yarıçapı: video (186) ile dilimlerin iç kenarı (198) arasının ortası. */
const LINE_R = 192;
const LINE_LENGTH = 2 * Math.PI * LINE_R;

/**
 * Four services halkasının ortasındaki hizmetler videosu (ana sayfa). Açılış
 * filmiyle (HeroVideo) aynı akış: halkanın yarısı görünür olunca 4 saniyelik
 * sessiz önizleme bir kez oynar, iç kenardaki Flare çizgi klibin gerçek
 * currentTime / duration değeriyle dolar, klip bitince postere geçilir ve
 * oynat düğmesi belirir. Daireye tıklamak videoyu pencerede (VideoModal,
 * 4:5) sesli açar. Sayfa açılırken klip inmez; bölümden çıkıp dönünce
 * yeniden oynamaz.
 *
 * Bu reveal değil, klibin durumunu izliyor: useReveal'dan ayrı.
 */
export default function ServicesRing({ ring, children }: ServicesRingStageProps) {
  const { video, preview, sectionLabel, closeLabel } = ring;
  const [phase, setPhase] = useState<Phase>("idle");
  const [open, setOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLVideoElement>(null);
  const lineRef = useRef<SVGCircleElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Çizgiyi doğrudan çizer (her karede React render'ı olmasın).
  const drawLine = useCallback((progress: number) => {
    const line = lineRef.current;
    if (!line) return;
    const p = Math.min(1, Math.max(0, progress));
    line.style.strokeDasharray = `${p * LINE_LENGTH} ${LINE_LENGTH}`;
    line.style.opacity = p > 0 ? "1" : "0";
  }, []);

  // Halkanın yarısı görünür olunca klip inmeye başlar; bir kez.
  useEffect(() => {
    if (!previewAllowed()) {
      setPhase("still");
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setPhase((current) => (current === "idle" ? "loading" : current));
      },
      { threshold: 0.5 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // İniş: 3 saniyede oynamaya hazır olmazsa vazgeçilir (klip DOM'dan kalkar).
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
      if (clip.duration > 0) drawLine(clip.currentTime / clip.duration);
      frame = window.requestAnimationFrame(tick);
    };
    const onEnded = () => {
      drawLine(1);
      setPhase("ending");
    };
    clip.addEventListener("ended", onEnded);
    frame = window.requestAnimationFrame(tick);
    clip.play().catch(() => setPhase("still"));
    return () => {
      window.cancelAnimationFrame(frame);
      clip.removeEventListener("ended", onEnded);
    };
  }, [phase, drawLine]);

  // Çapraz geçiş bitince klip kalkar; sonra hiçbir şey hareket etmez.
  useEffect(() => {
    if (phase === "still") {
      drawLine(1);
      return;
    }
    if (phase !== "ending") return;
    const timer = window.setTimeout(() => setPhase("still"), CROSSFADE_MS + 100);
    return () => window.clearTimeout(timer);
  }, [phase, drawLine]);

  // Önizleme sırasında tıklanırsa önizleme durur, pencere açılır.
  const openVideo = useCallback(() => {
    clipRef.current?.pause();
    setPhase((current) => (current === "ending" ? current : "still"));
    setOpen(true);
  }, []);
  const closeVideo = useCallback(() => setOpen(false), []);

  const clipMounted = phase === "loading" || phase === "playing" || phase === "ending";
  const settled = phase === "ending" || phase === "still";

  return (
    <div ref={stageRef} className="services-ring relative aspect-square">
      {children}
      <div className="absolute inset-[19%] overflow-hidden rounded-full bg-ink">
        <picture>
          {preview.posterAvif && <source srcSet={preview.posterAvif} type="image/avif" />}
          <img src={preview.poster} alt="" width={720} height={720} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        </picture>
        {clipMounted && (
          <video
            ref={clipRef}
            className={`ring-clip absolute inset-0 size-full object-cover ${phase === "playing" ? "is-playing" : ""} ${phase === "ending" ? "is-ending" : ""}`}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
          >
            {/* MP4 önce: iOS'ta en güvenlisi. */}
            <source src={preview.mp4} type="video/mp4" />
            <source src={preview.webm} type="video/webm" />
          </video>
        )}
        <div className={`ring-veil video-only absolute inset-0 bg-[color-mix(in_srgb,var(--ink)_38%,transparent)] ${settled ? "is-on" : ""}`} />
      </div>
      <svg viewBox="0 0 600 600" className="ring-progress video-only pointer-events-none absolute inset-0 size-full" aria-hidden="true" focusable="false">
        <circle cx="300" cy="300" r={LINE_R} fill="none" className="stroke-rule" />
        <circle
          ref={lineRef}
          cx="300"
          cy="300"
          r={LINE_R}
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 300 300)"
          className="stroke-flare"
          style={{ opacity: 0 }}
        />
      </svg>
      <button
        ref={buttonRef}
        type="button"
        onClick={openVideo}
        aria-label={video.ariaLabel}
        className="ring-button video-only group/ring absolute inset-[19%] flex cursor-pointer flex-col items-center justify-center gap-3 rounded-full min-[640px]:gap-[18px]"
      >
        <span className={`ring-play flex flex-col items-center gap-3 min-[640px]:gap-[18px] ${settled ? "is-on" : ""}`}>
          <span className="ring-disc flex size-[60px] items-center justify-center rounded-full bg-flare text-ink min-[640px]:size-[84px]">
            {/* İkonun üçgeni kutusunun 0.4'ü: üçgen telefonda 22, tablet ve masaüstünde 30 piksel. */}
            <PlayIcon className="size-[55px] min-[640px]:size-[75px]" />
          </span>
          <span className="flex items-baseline gap-2 bg-ink px-[10px] py-[5px] whitespace-nowrap min-[640px]:px-3 min-[640px]:py-[6px]">
            <span className="font-sans text-[13px] leading-none font-bold text-paper min-[640px]:text-[15px]">{video.buttonLabel}</span>
            <span className="font-mono text-[11px] leading-none font-medium text-dust min-[640px]:text-[12px]">{video.durationLabel}</span>
          </span>
        </span>
      </button>
      <VideoModal
        youtubeId={video.youtubeId}
        title={video.title}
        eyebrow={`${sectionLabel} · ${video.durationLabel}`}
        aspect={4 / 5}
        closeLabel={closeLabel}
        open={open}
        onClose={closeVideo}
        returnFocusRef={buttonRef}
      />
    </div>
  );
}
