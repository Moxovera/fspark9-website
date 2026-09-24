"use client";

import CutButton from "@/components/brand/CutButton";
import { useBooking } from "@/hooks/useBooking";
import { useMobileMenu } from "@/components/chrome/MobileMenuContext";
import type { MobileBookingBarProps } from "@/types/content";

/**
 * Mobilde tek randevu girişi (brief v4 §5): mobil header'da buton yok.
 * 900px altında görünen Paper çubuk, üstte Rule çizgi, tam genişlik Flare
 * cut buton. Randevu penceresi ya da mobil menü açıkken gizli. Tailwind'in
 * `max-[900px]:` varyantı "900'ün altı" demek (bkz. CLAUDE.md).
 *
 * z-index 80: header (95), mobil menü (110) ve randevu penceresinin altında.
 */
export default function MobileBookingBar({ label }: MobileBookingBarProps) {
  const { isOpen: bookingOpen } = useBooking();
  const { isOpen: menuOpen } = useMobileMenu();
  // Gizlenirken DOM'dan çıkmıyor: randevu penceresi kapanınca odak bu
  // butona geri dönebilsin (kaldırılsaydı odak sayfada kayboluyordu).
  const hidden = bookingOpen || menuOpen;

  return (
    <div
      aria-hidden={hidden || undefined}
      className={`fixed inset-x-0 bottom-0 z-[80] hidden border-t border-rule bg-paper px-5 py-3 max-[900px]:block ${hidden ? "invisible" : ""}`}
    >
      <CutButton label={label} className="w-full justify-center" />
    </div>
  );
}
