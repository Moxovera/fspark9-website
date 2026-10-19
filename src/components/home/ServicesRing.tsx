"use client";

import { useCallback, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import VideoModal from "@/components/ui/VideoModal";
import { useClipPreview } from "@/hooks/useClipPreview";
import type { ServicesRingStageProps } from "@/types/content";

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
 * yeniden oynamaz. Önizleme videonun açılışı (başlık), açılış filmindeki
 * portre gibi; oynat düğmesi de oradaki gibi dairenin alt kenarına oturan
 * hap. YouTube kimliği boşsa önizleme, poster ve çizgi yine var; hap ve
 * pencere yok. Önizlemenin akışı (faz makinesi, inme kuralları) Spark film
 * kartıyla ortak: hooks/useClipPreview.ts.
 */
export default function ServicesRing({ ring, children }: ServicesRingStageProps) {
  const { video, preview, sectionLabel, closeLabel } = ring;
  const [open, setOpen] = useState(false);
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

  const { phase, stageRef, clipRef, halt, clipMounted } = useClipPreview<HTMLDivElement>({
    start: "visible",
    threshold: 0.5,
    onProgress: drawLine,
  });

  // Önizleme sırasında tıklanırsa önizleme durur, pencere açılır.
  const openVideo = useCallback(() => {
    halt();
    setOpen(true);
  }, [halt]);
  const closeVideo = useCallback(() => setOpen(false), []);

  const hasVideo = Boolean(video.youtubeId);

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
      {hasVideo && (
        <>
        {/* Dairenin tamamı tıklanabilir; klavye ve ekran okuyucu için asıl kontrol aşağıdaki hap. */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={openVideo}
          className="video-only absolute inset-[19%] cursor-pointer rounded-full"
        />
        {/* Açılış filmindeki gibi dairenin alt kenarına oturan hap; baştan sabit durur (Spark film kartındaki hapla aynı). */}
        <button
          ref={buttonRef}
          type="button"
          onClick={openVideo}
          aria-label={video.ariaLabel}
          className={`ring-pill is-on video-only absolute top-[calc(81%-25px)] left-1/2 z-[1] inline-flex h-[50px] -translate-x-1/2 cursor-pointer items-center gap-[10px] rounded-full border-4 border-ink bg-flare pr-4 pl-1 font-sans text-[14px] leading-none font-bold whitespace-nowrap text-ink min-[640px]:top-[calc(81%-31px)] min-[640px]:h-[62px] min-[640px]:gap-3 min-[640px]:border-[5px] min-[640px]:pr-[22px] min-[640px]:pl-[5px] min-[640px]:text-[16px]`}
        >
          <span className="flex size-[34px] flex-none items-center justify-center rounded-full bg-ink text-flare min-[640px]:size-[42px]">
            <PlayIcon className="size-[18px] translate-x-[1px] min-[640px]:size-[22px]" />
          </span>
          <span>{video.buttonLabel}</span>
          <span className="font-mono text-[11px] font-medium min-[640px]:text-[12px]">{video.durationLabel}</span>
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
        </>
      )}
    </div>
  );
}
