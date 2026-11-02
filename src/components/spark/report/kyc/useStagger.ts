import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/spark/report/psd3/tabKeys";

const FIRST_MS = 140;
const STEP_MS = 220;

/**
 * Telefon mesajlarının tek tek gelişi (referans `reveal`): `play(n)` ile
 * görünen sayı 0'dan başlar, 140ms + 220ms arayla artar. İlk açılışta,
 * JS yokken ve reduced-motion'da hepsi hemen görünür.
 */
export function useStagger() {
  const [visible, setVisible] = useState(Infinity);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const play = (count: number) => {
    clear();
    if (reducedMotion()) {
      setVisible(Infinity);
      return;
    }
    setVisible(0);
    for (let i = 0; i < count; i++) {
      timers.current.push(window.setTimeout(() => setVisible(i + 1), FIRST_MS + i * STEP_MS));
    }
  };

  return { visible, play };
}
