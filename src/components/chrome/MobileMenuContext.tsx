"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface MobileMenuContextValue {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

/**
 * Mobil menünün açık/kapalı durumu. MobileNav (header'da) ve
 * MobileBookingBar (sayfanın altında) kardeş bileşenler: menü açıkken
 * çubuk gizleniyor (brief v4 §5), ikisi bu durumu buradan okuyor.
 */
export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const value = useMemo(() => ({ isOpen, setOpen }), [isOpen]);
  return <MobileMenuContext.Provider value={value}>{children}</MobileMenuContext.Provider>;
}

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  return ctx;
}
