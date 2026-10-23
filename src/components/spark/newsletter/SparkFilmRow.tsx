"use client";

import { useCallback, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import VideoModal from "@/components/ui/VideoModal";
import type { SparkFilmRowProps } from "@/types/content";

/**
 * Spark filminin tıklanınca açılan satırı: ana sayfa Spark bölümünün alt
 * şeridinde (`strip`) ve Spark girişinin telefon sırasında (`compact`, küçük
 * daire). İkisi de bir <button>; sayfa açılırken iframe, klip ya da YouTube
 * betiği yok. Tıklayınca mevcut VideoModal (4:5, film dikey) sesli açılır,
 * YouTube sadece o zaman istenir. Kimlik boşsa sayfa bu bileşeni çizmez.
 */
export default function SparkFilmRow({ film, newsletter, variant, posterSrc }: SparkFilmRowProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const openVideo = useCallback(() => setOpen(true), []);
  const closeVideo = useCallback(() => setOpen(false), []);
  const duration = film.durationLabel;

  const modal = (
    <VideoModal
      youtubeId={film.youtubeId}
      title={film.modalTitle}
      eyebrow={`${newsletter.filmKicker} · ${newsletter.filmTitle} · ${duration}`}
      aspect={4 / 5}
      closeLabel={film.closeLabel}
      open={open}
      onClose={closeVideo}
      returnFocusRef={buttonRef}
    />
  );

  if (variant === "compact") {
    return (
      <>
        <button
          ref={buttonRef}
          type="button"
          onClick={openVideo}
          aria-label={film.ariaLabel}
          className="flex min-h-[72px] w-full cursor-pointer items-center gap-4 border-0 border-t border-inkrule bg-transparent px-0 py-4 text-left"
        >
          <span className="relative block size-14 flex-none overflow-hidden rounded-full border-2 border-flare bg-portrait">
            {posterSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={posterSrc} alt="" loading="lazy" decoding="async" width={56} height={56} className="absolute inset-0 size-full object-cover" />
            )}
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-display text-[18px] leading-[1.2] font-extrabold tracking-[-0.02em] text-paper">{newsletter.filmTitle}</span>
            <span className="inline-flex items-center gap-2 font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-flare uppercase">
              <PlayIcon className="size-[14px] flex-none" />
              {newsletter.watchLabel} · {duration}
            </span>
          </span>
        </button>
        {modal}
      </>
    );
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={openVideo}
        aria-label={film.ariaLabel}
        className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 border-0 border-t-2 border-flare bg-transparent px-0 pt-4 pb-4 text-left max-[767px]:border-b max-[767px]:border-inkrule"
      >
        <span className="flex min-w-0 flex-col gap-1">
          <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-flare uppercase">
            {newsletter.filmKicker} · {duration}
          </span>
          <span className="font-display text-[20px] leading-[1.2] font-extrabold tracking-[-0.02em] text-paper">{newsletter.filmTitle}</span>
        </span>
        <span className="flex size-10 flex-none items-center justify-center rounded-full bg-flare text-ink">
          <PlayIcon className="size-[16px] translate-x-[1px]" />
        </span>
      </button>
      {modal}
    </>
  );
}
