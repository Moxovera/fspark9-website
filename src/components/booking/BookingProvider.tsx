"use client";

import { createContext, useMemo, useState } from "react";
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
 * dc.html: state.booking (tek boolean), openBooking/closeBooking. Aynı
 * NextIntlClientProvider deseni — client provider, server children'ı
 * (Header/page/Footer) sarmalıyor, onları client'a çevirmiyor.
 */
export default function BookingProvider({ children }: BookingProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
