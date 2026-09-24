"use client";

import { useBooking } from "@/hooks/useBooking";
import type { BookingCtaProps } from "@/types/content";

/**
 * dc.html'de bu CTA'lar hep <button onClick={openBooking}> — <a href>
 * değil, çünkü artık bir sayfaya gitmiyor, bir modal açıyor. Semantik
 * olarak da doğrusu bu. Server bileşenlere (Hero, ClosingCta, Header)
 * client-leaf olarak damlatılıyor — Reveal/MediaSlider'daki "sadece en
 * küçük parça client" deseniyle aynı.
 */
export default function BookingCta({ className, children }: BookingCtaProps) {
  const { open } = useBooking();

  return (
    <button type="button" onClick={open} className={`cursor-pointer ${className ?? ""}`}>
      {children}
    </button>
  );
}
