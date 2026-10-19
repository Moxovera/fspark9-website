"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import VideoModal from "@/components/ui/VideoModal";
import { previewAllowed, READY_TIMEOUT_MS } from "@/lib/videoPreview";
import type { HeroVideoButtonProps } from "@/types/content";

/**
 * idle: portre fotoğrafı, halka izi boş. loading: klip iniyor (görünmez).
 * playing: klip fotoğrafın üstünde, halka klibin süresine bağlı doluyor.
 * ending: son kareden fotoğrafa çapraz geçiş. still: hareket bitti (ya da
 * hiç başlamadı), fotoğraf ve dolu halka.
 */
type Phase = "idle" | "loading" | "playing" | "ending" | "still";

/** Altyazı klipten 300 ms sonra gelir, bitmeden 400 ms önce kaybolur. */
const CAPTION_IN_S = 0.3;
const CAPTION_OUT_S = 0.4;
/** Çapraz geçiş süresi (globals.css .hero-clip.is-ending ile aynı). */
const CROSSFADE_MS = 600;

/**
 * Ana sayfa portresinin tanıtım filmi katmanı: portrenin alt kenarına oturan
 * "Beni 90 saniyede tanıyın" düğmesi, portreyi saran ilerleme halkası ve bir
 * kez oynayan 4 saniyelik sessiz önizleme. Düğme ya da portre filmi pencerede
 * (VideoModal) sesli açar.
 *
 * Önizleme sitenin kendi sunucusundan, sayfa yüklendikten sonra (load, sonra
 * requestIdleCallback ya da 600 ms) iner; <link rel="preload"> yok, LCP portre
 * fotoğrafı olarak kalır. Halka sabit bir CSS süresiyle değil, klibin gerçek
 * currentTime / duration değeriyle dolar: klip takılırsa halka da bekler.
 */
export default function HeroVideo({ video, preview, children }: HeroVideoButtonProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [caption, setCaption] = useState(false);
  const [open, setOpen] = useState(false);
  const clipRef = useRef<HTMLVideoElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const captionRef = useRef(false);

  // İlerleme halkasını doğrudan çizer (her karede React render'ı olmasın).
  const drawArc = useCallback((progress: number) => {
    const arc = arcRef.current;
    if (!arc) return;
    const length = 2 * Math.PI * arc.r.baseVal.value;
    const p = Math.min(1, Math.max(0, progress));
    arc.style.strokeDasharray = `${p * length} ${length}`;
    arc.style.opacity = p > 0 ? "1" : "0";
  }, []);

  // Sayfa yüklendikten sonra boşta (en geç 600 ms) klip inmeye başlar.
  useEffect(() => {
    if (!previewAllowed()) {
      setPhase("still");
      return;
    }
    let timer: number | undefined;
    let idle: number | undefined;
    const begin = () => {
      window.clearTimeout(timer);
      if (idle !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      setPhase((current) => (current === "idle" ? "loading" : current));
    };
    const schedule = () => {
      timer = window.setTimeout(begin, 600);
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(begin, { timeout: 600 });
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      window.clearTimeout(timer);
      if (idle !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
    };
  }, []);

  // İniş: 3 saniyede oynamaya hazır olmazsa vazgeçilir (klip DOM'dan kalkar, istek kesilir).
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

  // Oynatma: halka ve altyazı klibin zamanına bağlı, requestAnimationFrame ile.
  useEffect(() => {
    if (phase !== "playing") return;
    const clip = clipRef.current;
    if (!clip) return;
    let frame = 0;
    const tick = () => {
      const duration = clip.duration;
      if (duration > 0) {
        const t = clip.currentTime;
        drawArc(t / duration);
        const show = t >= CAPTION_IN_S && t < duration - CAPTION_OUT_S;
        if (show !== captionRef.current) {
          captionRef.current = show;
          setCaption(show);
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    const onEnded = () => {
      drawArc(1);
      captionRef.current = false;
      setCaption(false);
      setPhase("ending");
    };
    clip.addEventListener("ended", onEnded);
    frame = window.requestAnimationFrame(tick);
    clip.play().catch(() => setPhase("still"));
    return () => {
      window.cancelAnimationFrame(frame);
      clip.removeEventListener("ended", onEnded);
    };
  }, [phase, drawArc]);

  // Son kareden fotoğrafa çapraz geçiş bitince klip kalkar; sonra hiçbir şey hareket etmez.
  useEffect(() => {
    if (phase === "still") {
      drawArc(1);
      setCaption(false);
      return;
    }
    if (phase !== "ending") return;
    const timer = window.setTimeout(() => setPhase("still"), CROSSFADE_MS + 100);
    return () => window.clearTimeout(timer);
  }, [phase, drawArc]);

  const openFilm = useCallback(() => setOpen(true), []);
  const closeFilm = useCallback(() => setOpen(false), []);
  const clipMounted = phase === "loading" || phase === "playing" || phase === "ending";

  return (
    <div className="hero-video group/video absolute inset-0">
      {children}
      {clipMounted && (
        <video
          ref={clipRef}
          className={`hero-clip absolute inset-0 z-[2] size-full rounded-full object-cover ${phase === "playing" ? "is-playing" : ""} ${phase === "ending" ? "is-ending" : ""}`}
          poster={preview.poster}
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
        >
          {/* MP4 önce: bu kliplerde WebM'den küçük ve iOS'ta en güvenlisi. */}
          <source src={preview.mp4} type="video/mp4" />
          <source src={preview.webm} type="video/webm" />
        </video>
      )}
      <p
        aria-hidden="true"
        className={`hero-caption pointer-events-none absolute inset-x-0 bottom-[34px] z-[3] m-0 flex justify-center min-[900px]:bottom-[46px] ${caption ? "is-on" : ""}`}
      >
        <span className="bg-[color-mix(in_srgb,var(--ink)_72%,transparent)] px-2 py-[2px] font-sans text-[13px] leading-[1.4] font-medium text-paper min-[900px]:px-[10px] min-[900px]:py-[3px] min-[900px]:text-[16px]">
          {video.caption}
        </span>
      </p>
      {/* Portrenin tamamı tıklanabilir; klavye ve ekran okuyucu için asıl kontrol aşağıdaki düğme. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={openFilm}
        className="video-only absolute inset-0 z-[4] cursor-pointer rounded-full"
      />
      <svg className="hero-progress video-only pointer-events-none absolute inset-[-6.5px] z-[1] size-[calc(100%+13px)] rotate-90 overflow-visible" aria-hidden="true" focusable="false">
        <circle cx="50%" cy="50%" r="50%" fill="none" className="stroke-track" />
        <circle ref={arcRef} cx="50%" cy="50%" r="50%" fill="none" strokeLinecap="round" className="stroke-flare" style={{ opacity: 0 }} />
      </svg>
      <button
        ref={buttonRef}
        type="button"
        onClick={openFilm}
        aria-label={video.ariaLabel}
        className="hero-pill video-only absolute top-[calc(100%-25px)] left-1/2 z-[5] inline-flex h-[50px] -translate-x-1/2 cursor-pointer items-center gap-[10px] rounded-full border-4 border-ink bg-flare pr-4 pl-1 font-sans text-[14px] leading-none font-bold whitespace-nowrap text-ink min-[900px]:top-[calc(100%-31px)] min-[900px]:h-[62px] min-[900px]:gap-3 min-[900px]:border-[5px] min-[900px]:pr-[22px] min-[900px]:pl-[5px] min-[900px]:text-[16px]"
      >
        <span className="flex size-[34px] flex-none items-center justify-center rounded-full bg-ink text-flare min-[900px]:size-[42px]">
          <PlayIcon className="size-[18px] translate-x-[1px] min-[900px]:size-[22px]" />
        </span>
        <span>{video.buttonLabel}</span>
        <span className="font-mono text-[11px] font-medium min-[900px]:text-[12px]">{video.durationLabel}</span>
      </button>
      <VideoModal
        youtubeId={video.youtubeId}
        title={video.title}
        closeLabel={video.closeLabel}
        open={open}
        onClose={closeFilm}
        returnFocusRef={buttonRef}
      />
    </div>
  );
}
