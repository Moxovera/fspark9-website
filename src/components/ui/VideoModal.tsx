"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { useReportVideoOpen } from "@/components/ui/VideoOpenContext";
import type { VideoModalProps } from "@/types/content";

/**
 * YouTube filmi için pencere (ana sayfa tanıtım filmi; About ve Spark da
 * kullanabilir). Ink %94 zemin, üstte başlık ve Kapat, altında 16:9
 * oynatıcı; masaüstünde en fazla 960px, telefonda tam ekran.
 *
 * Oynatıcı youtube-nocookie.com'dan ve sadece pencere açıkken var: sayfa
 * açılırken YouTube'a hiçbir istek gitmez, kapanınca iframe DOM'dan
 * kalkar ve ses de durur. Ziyaretçi tıkladığı için ses açık başlar.
 * Odak tuzağı, Escape, kaydırma kilidi ve odak iadesi useDialogFocus'ta;
 * başlık satırı ve oynatıcı dışında her yere tıklama (telefonda tam ekran
 * pencerenin boş alanı dahil) kapatır. Pencere body'ye portal: dönüşümlü bir atanın
 * (Reveal) içinde açılsa da ekranı kaplar.
 *
 * `aspect` verilirse (ör. hizmetler videosu 4:5) oynatıcı o oranda:
 * masaüstünde yüksekliği min(78vh, 740px), genişliği bunun `aspect` katı;
 * telefonda başlık satırının altında ekrana sığan en büyük boy. `eyebrow`
 * başlığın üstünde küçük bir etiket satırı.
 */
export default function VideoModal({ youtubeId, title, eyebrow, aspect, closeLabel, open, onClose, returnFocusRef }: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useDialogFocus(open, dialogRef, returnFocusRef, onClose);
  useReportVideoOpen(open);

  if (!open || !mounted) return null;

  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return createPortal(
    <div
      className="booking-backdrop on-ink fixed inset-0 z-[130] flex items-center justify-center bg-[color-mix(in_srgb,var(--ink)_94%,transparent)] min-[900px]:p-8"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`booking-window flex h-full w-full flex-col justify-center min-[900px]:h-auto ${
          aspect ? "video-window-aspect" : "min-[900px]:max-w-[960px]"
        }`}
        style={aspect ? ({ "--video-aspect": aspect } as CSSProperties) : undefined}
      >
        <div
          className="flex items-center justify-between gap-4 px-5 py-3 min-[900px]:px-0 min-[900px]:pt-0 min-[900px]:pb-4"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex min-w-0 flex-col gap-1">
            {eyebrow && <p className="m-0 font-mono text-[11px] leading-[1.4] font-medium tracking-[0.08em] text-dust uppercase min-[900px]:text-[12px]">{eyebrow}</p>}
            <p className="m-0 font-display text-[18px] leading-[1.2] font-extrabold tracking-[-0.02em] text-paper min-[900px]:text-[22px]">{title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 flex-none cursor-pointer items-center gap-2 font-mono text-[12px] font-medium tracking-[0.08em] text-paper uppercase"
          >
            {closeLabel}
            <CloseIcon className="size-[18px]" strokeWidth="2.4" strokeLinecap="butt" />
          </button>
        </div>
        <div
          className={`relative bg-ink ${aspect ? "video-player-aspect" : "aspect-video w-full"}`}
          onClick={(event) => event.stopPropagation()}
        >
          <iframe
            src={src}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
