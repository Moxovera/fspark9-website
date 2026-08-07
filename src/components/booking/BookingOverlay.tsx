"use client";

import Cal from "@calcom/embed-react";
import { useBooking } from "@/hooks/useBooking";
import type { BookingSection } from "@/types/content";

interface BookingOverlayProps {
  content: BookingSection;
}

/**
 * dc.html: backdrop (onClick=closeBooking) + panel (onClick=stop, yani
 * stopPropagation — panel içi tıklama backdrop'a sızıp kapatmasın diye).
 * Sağ kolondaki sahte gün/saat ızgarası dc.html'in kendi mockup'ıydı,
 * gerçek üretimde buraya Cal.com'un inline embed'i (@calcom/embed-react)
 * konuyor — Cal'in kendi "modal" embed tipini KULLANMIYORUZ, çünkü onun
 * kapanma event'i güvenilir değil (araştırıldı, kendi state'imizle
 * senkronize etmek kırılgan olurdu). Chrome (backdrop/panel/header/×)
 * tamamen bizim, sadece takvim widget'ının kendisi Cal'den geliyor.
 */
export default function BookingOverlay({ content }: BookingOverlayProps) {
  const { isOpen, close } = useBooking();
  const { calLink, title, body, meta1, meta2 } = content;

  if (!isOpen) return null;

  return (
    <div
      className="fs-fade fixed inset-0 z-[100] flex items-center justify-center bg-navy/72 p-5 backdrop-blur-[6px]"
      style={{ animationDuration: "0.25s" }}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88svh] w-full max-w-[860px] overflow-auto border border-bronze/40 bg-ivory"
      >
        <div className="flex items-center justify-between gap-4 border-b border-navy/12 px-[26px] py-5">
          <div>
            <p className="mb-1.5 font-mono text-[11.5px] tracking-[0.12em] text-bronze uppercase">
              cal.com
            </p>
            <p className="font-display text-[1.3rem] text-navy">{title}</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="focus-visible:outline-bronze px-2.5 py-1.5 font-mono text-xl text-muted focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-7 p-[26px]">
          <div>
            <p className="mb-5 text-[15px] leading-[1.65] text-charcoal">{body}</p>
            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-[12.5px] text-muted">{meta1}</p>
              <p className="font-mono text-[12.5px] text-muted">{meta2}</p>
            </div>
          </div>
          <div className="h-[480px]">
            <Cal
              calLink={calLink}
              style={{ width: "100%", height: "100%" }}
              config={{ theme: "light" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
