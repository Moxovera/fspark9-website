"use client";

import { useBooking } from "@/hooks/useBooking";

interface MobileBookingBarProps {
  ctaLabel: string;
}

/**
 * dc.html: narrow = st.w < 900, sc-if ile tam mount/unmount — JS resize
 * dinleyicisiyle hesaplanıyor. Header'ın 1180px kırılımında olduğu gibi
 * burada da JS/state gerekmiyor, saf CSS breakpoint'i (`max-[899px]:`)
 * aynı görünürlük davranışını veriyor. Tek client sebebi useBooking()
 * hook'u — buton dışında hiçbir state/efekt yok.
 *
 * z-index 80 — header'ın (95) ve booking overlay'in (100) altında,
 * dc.html'deki sıralamayla aynı.
 */
export default function MobileBookingBar({ ctaLabel }: MobileBookingBarProps) {
  const { open } = useBooking();

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] hidden border-t border-bronze/35 bg-[color-mix(in_srgb,color-mix(in_srgb,var(--navy)_75%,black_25%)_92%,transparent)] p-3 backdrop-blur-[10px] max-[900px]:block">
      <button
        type="button"
        onClick={open}
        className="w-full cursor-pointer bg-bronze p-[15px] text-[15px] font-medium text-ivory transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--bronze)_88%,white)]"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
