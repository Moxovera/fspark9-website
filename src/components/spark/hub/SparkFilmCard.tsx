"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import VideoModal from "@/components/ui/VideoModal";
import { useClipPreview } from "@/hooks/useClipPreview";
import { SLOWER_CONNECTIONS } from "@/lib/videoPreview";
import type { SparkFilmCardProps } from "@/types/content";

/**
 * Spark sayfasının siyah açılışındaki yuvarlak film kartı (kare alanda daire, masaüstünde 400x400; sitedeki halkalarla aynı dil, film 4:5 pencerede açılır).
 * Sayfa açılırken sadece küçük poster iner (canvas'a çizilir: LCP "Spark"
 * yazısı kalsın); sayfa `load` olayını verip tarayıcı boşa çıkınca 4 saniyelik
 * sessiz önizleme bir kez oynar, çevresindeki çizgi klibin gerçek
 * currentTime / duration değeriyle dolar, klip bitince 600 ms'de postere
 * geçilir. Oynat hapı (sitedeki Flare hap) baştan sabit durur. Tıklayınca film pencerede
 * (VideoModal, 4:5) sesli açılır; YouTube sadece o zaman istenir. Akış
 * Four services halkasıyla ortak: hooks/useClipPreview.ts. Kimlik boşsa
 * sayfa bu bileşeni hiç çizmez.
 *
 * Çizgi ve hap Flare (sitedeki halka videolarıyla aynı dil).
 */
export default function SparkFilmCard({ film, preview, sparkLabel }: SparkFilmCardProps) {
  const [open, setOpen] = useState(false);
  const [posterShown, setPosterShown] = useState(false);
  const posterRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<SVGCircleElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Çizgiyi doğrudan çizer (her karede React render'ı olmasın).
  const drawLine = useCallback((progress: number) => {
    const line = lineRef.current;
    if (!line) return;
    const p = Math.min(1, Math.max(0, progress));
    line.style.strokeDasharray = `${p} 1`;
    line.style.opacity = p > 0 ? "1" : "0";
  }, []);

  const { phase, stageRef, clipRef, halt, clipMounted } = useClipPreview<HTMLButtonElement>({
    start: "afterLoad",
    threshold: 0.25,
    blockedConnections: SLOWER_CONNECTIONS,
    onProgress: drawLine,
  });

  // Poster canvas'a çizilir: <img> olsaydı 400x500'lük poster LCP adayı olur ve
  // LCP "Spark" yazısından posterin yüklenmesine kayardı (canvas aday değil).
  // Hidrasyondan sonra, düşük öncelikle iner; AVIF desteklenmezse WebP.
  useEffect(() => {
    const canvas = posterRef.current;
    const context = canvas?.getContext("2d");
    // Telefonda kart gizli (küçük film satırı var): poster hiç inmesin.
    if (!canvas || !context || canvas.offsetParent === null) return;
    let cancelled = false;
    const load = (src: string, fallback?: string) => {
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = "low";
      image.onload = () => {
        if (cancelled) return;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        setPosterShown(true);
      };
      if (fallback) image.onerror = () => load(fallback);
      image.src = src;
    };
    load(preview.posterAvif ?? preview.poster, preview.posterAvif ? preview.poster : undefined);
    return () => {
      cancelled = true;
    };
  }, [preview.poster, preview.posterAvif]);

  // Klip oynarken de tıklanabilir: önizleme durur, pencere açılır.
  const openVideo = useCallback(() => {
    halt();
    setOpen(true);
  }, [halt]);
  const closeVideo = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        ref={(node) => {
          stageRef.current = node;
          buttonRef.current = node;
        }}
        type="button"
        onClick={openVideo}
        aria-label={film.ariaLabel}
        className="film-card relative block aspect-square w-full max-w-[400px] cursor-pointer rounded-full border-0 bg-transparent p-0 text-left"
      >
        {/* Çizgi dairenin çevresinde: zemin Stone, dolan kısım Paper (üstten saat yönünde). */}
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true" focusable="false">
          <circle cx="50" cy="50" r="49" fill="none" strokeWidth="0.9" className="stroke-stone" />
          <circle
            ref={lineRef}
            cx="50"
            cy="50"
            r="49"
            fill="none"
            strokeWidth="0.9"
            pathLength={1}
            strokeLinecap="butt"
            transform="rotate(-90 50 50)"
            className="stroke-flare"
            style={{ strokeDasharray: "0 1", opacity: 0 }}
          />
        </svg>
        <span className="absolute inset-[3.5%] block overflow-hidden rounded-full bg-ink">
          <canvas
            ref={posterRef}
            width={544}
            height={544}
            aria-hidden="true"
            className={`film-poster absolute inset-0 size-full ${posterShown ? "is-shown" : ""}`}
          />
          {clipMounted && (
            <video
              ref={clipRef}
              className={`film-clip absolute inset-0 size-full object-cover ${phase === "playing" ? "is-playing" : ""} ${phase === "ending" ? "is-ending" : ""}`}
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
        </span>
        {/* Sitedeki oynat hapıyla aynı (açılış filmi, Four services): Flare, Ink kenar; sabit, baştan görünür. Dairenin alt kenarına oturur. */}
        <span className="film-pill video-only absolute top-[calc(96.5%-25px)] left-1/2 z-[1] inline-flex h-[50px] -translate-x-1/2 items-center gap-[10px] rounded-full border-4 border-ink bg-flare pr-4 pl-1 font-sans text-[14px] leading-none font-bold whitespace-nowrap text-ink min-[640px]:top-[calc(96.5%-31px)] min-[640px]:h-[62px] min-[640px]:gap-3 min-[640px]:border-[5px] min-[640px]:pr-[22px] min-[640px]:pl-[5px] min-[640px]:text-[16px]" aria-hidden="true">
          <span className="flex size-[34px] flex-none items-center justify-center rounded-full bg-ink text-flare min-[640px]:size-[42px]">
            <PlayIcon className="size-[18px] translate-x-[1px] min-[640px]:size-[22px]" />
          </span>
          <span>{film.buttonLabel}</span>
          <span className="font-mono text-[11px] font-medium min-[640px]:text-[12px]">{film.durationLabel}</span>
        </span>
      </button>
      <VideoModal
        youtubeId={film.youtubeId}
        title={film.modalTitle}
        eyebrow={`${sparkLabel} · ${film.durationLabel}`}
        aspect={4 / 5}
        closeLabel={film.closeLabel}
        open={open}
        onClose={closeVideo}
        returnFocusRef={buttonRef}
      />
    </>
  );
}
