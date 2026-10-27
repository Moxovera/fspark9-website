/**
 * Sekme listelerinde ok tuşları (WAI-ARIA tabs): sol/sağ (ve yukarı/aşağı)
 * komşu sekme, Home/End ilk ve son sekme. Tuş sekme tuşu değilse null;
 * seçme ve odaklama bileşende (ref dizisi).
 */
export function nextTab(key: string, index: number, count: number): number | null {
  const keys: Record<string, number> = {
    ArrowRight: (index + 1) % count,
    ArrowDown: (index + 1) % count,
    ArrowLeft: (index - 1 + count) % count,
    ArrowUp: (index - 1 + count) % count,
    Home: 0,
    End: count - 1,
  };
  return key in keys ? keys[key] : null;
}

/** prefers-reduced-motion: reduce açık mı (tarayıcıda). */
export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
