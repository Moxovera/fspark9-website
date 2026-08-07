"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/hooks/useBooking";

interface BookingCtaProps {
  className?: string;
  children: ReactNode;
}

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
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
