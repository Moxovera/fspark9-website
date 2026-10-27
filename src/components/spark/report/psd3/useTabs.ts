import { useRef, useState, type KeyboardEvent } from "react";
import { nextTab } from "@/components/spark/report/psd3/tabKeys";

/**
 * Seçili sekme, buton ref'leri ve ok tuşu dinleyicisi. `onSelect` seçim
 * değişince çağrılır (telefon mesajlarını baştan getirmek gibi).
 */
export function useTabs(count: number, initial = 0, onSelect?: (index: number) => void) {
  const [index, setIndex] = useState(initial);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (next: number) => {
    setIndex(next);
    onSelect?.(next);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = nextTab(event.key, i, count);
    if (next === null) return;
    event.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };
  const setRef = (i: number) => (el: HTMLButtonElement | null) => {
    refs.current[i] = el;
  };
  return { index, select, onKeyDown, setRef };
}
