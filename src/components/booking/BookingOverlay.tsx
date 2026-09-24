"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CalEmbed from "@/components/booking/CalEmbed";
import Dial from "@/components/brand/Dial";
import { CloseIcon } from "@/components/icons";
import { useBooking } from "@/hooks/useBooking";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { EIGHT_SLICES } from "@/lib/dial";
import type { SiteChrome } from "@/types/content";

interface BookingOverlayProps {
  calLink: string;
  labels: SiteChrome["booking"];
}

/**
 * Randevu penceresi (brief v4 §8.1, board Booking / BookingMobile).
 * Masaüstünde Ink %78 zemin üstünde 1000px White pencere, mobilde tam
 * ekran katman. Başlık satırı: küçük kadran, "Book a call", "Free · 30
 * minutes", SVG kapat; altında 2px Ink çizgi. Gövde Cal.com'un inline
 * embed'i, altta "Scheduling by cal.com" ve ziyaretçinin saat dilimi.
 *
 * role="dialog" + aria-modal, odak içeride kalır, Escape ve zemine
 * tıklama kapatır, sayfa kaymaz, kapanınca odak pencereyi açan butona
 * döner (useDialogFocus). Cal.com sadece pencere açılınca, yani
 * ziyaretçinin tıklamasından sonra yükleniyor (Privacy metni bunu
 * vaat ediyor).
 */
export default function BookingOverlay({ calLink, labels }: BookingOverlayProps) {
  const { isOpen, close } = useBooking();
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [timeZone, setTimeZone] = useState("");
  const onClose = useCallback(() => close(), [close]);

  // Açıldığı anda odaktaki eleman açan butondur; kapanınca oraya dönülür.
  if (isOpen && openerRef.current === null && typeof document !== "undefined") {
    openerRef.current = document.activeElement as HTMLElement | null;
  }
  useEffect(() => {
    if (!isOpen) openerRef.current = null;
    else setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, [isOpen]);

  useDialogFocus(isOpen, dialogRef, openerRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="booking-backdrop fixed inset-0 z-[120] flex items-center justify-center bg-[color-mix(in_srgb,var(--ink)_78%,transparent)] min-[900px]:p-5" onClick={close}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={labels.title}
        onClick={(event) => event.stopPropagation()}
        className="booking-window flex h-full w-full flex-col overflow-hidden bg-white min-[900px]:h-auto min-[900px]:max-h-[92svh] min-[900px]:w-[1000px] min-[900px]:max-w-full"
      >
        <div className="flex flex-none items-center justify-between border-b-2 border-ink px-5 py-3 min-[900px]:px-7 min-[900px]:py-5">
          <div className="flex items-center gap-3 min-[900px]:gap-[14px]">
            <Dial lit={EIGHT_SLICES} size={24} className="min-[900px]:size-7" />
            <span className="font-display text-[20px] leading-[normal] font-extrabold tracking-[-0.02em] text-ink min-[900px]:text-[22px]">
              {labels.title}
            </span>
            <span className="hidden font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase min-[900px]:inline">
              {labels.meta}
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={labels.closeLabel}
            className="flex size-11 cursor-pointer items-center justify-end text-ink min-[900px]:justify-center"
          >
            <CloseIcon className="size-[18px]" strokeWidth="2.4" strokeLinecap="butt" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 pt-4 pb-4 min-[900px]:h-[600px] min-[900px]:flex-none min-[900px]:px-7 min-[900px]:pt-8 min-[900px]:pb-9">
          <CalEmbed calLink={calLink} redirectTo="/thank-you" onBookingSuccessful={close} />
        </div>
        <div className="flex flex-none justify-between gap-3 border-t border-rule px-5 py-[14px] min-[900px]:px-7">
          <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">{labels.poweredBy}</span>
          <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">{timeZone}</span>
        </div>
      </div>
    </div>
  );
}
