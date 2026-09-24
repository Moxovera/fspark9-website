"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface BookingContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const BookingContext = createContext<BookingContextValue | null>(null);

interface BookingProviderProps {
  children: ReactNode;
}

/**
 * Randevu penceresinin açık/kapalı durumu. Server children'ı (Header,
 * sayfa, Footer) sarmalıyor, onları client'a çevirmiyor.
 *
 * `?book=1` (brief v4 §3): /book artık yok; eski e-posta ve LinkedIn
 * linkleri /?book=1'e yönleniyor ve pencere açılıyor, parametre adres
 * çubuğundan history.replaceState ile temizleniyor (sayfa değişmiyor). Bu, ziyaretçinin kendi tıkladığı bir
 * link, bu yüzden "Cal.com tıklamadan yüklenmez" vaadi korunuyor.
 */
export default function BookingProvider({ children }: BookingProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("book") !== "1") return;
    setIsOpen(true);
    url.searchParams.delete("book");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
