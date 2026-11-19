"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { trackLead } from "@/lib/lead";
import type { LeadFormPlacement, Locale } from "@/types/content";

interface LeadStateValue {
  locale: Locale;
  /** Gönderen form; null ise henüz gönderim yok. */
  doneBy: LeadFormPlacement | null;
  markDone: (placement: LeadFormPlacement) => void;
  heroCard: HTMLElement | null;
  registerHeroCard: (el: HTMLElement | null) => void;
}

const LeadStateContext = createContext<LeadStateValue | null>(null);

export function useLeadState() {
  const ctx = useContext(LeadStateContext);
  if (!ctx) throw new Error("useLeadState must be used within LeadProvider");
  return ctx;
}

/**
 * Lead sayfasının ortak durumu: iki form aynı anda "rapor yolda" kutusuna
 * döner, sabit mobil düğme gönderimden sonra kaybolur ve hero kartını
 * izler. Sayfa görüntüleme olayı burada bir kez atılır.
 */
export default function LeadProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [doneBy, setDoneBy] = useState<LeadFormPlacement | null>(null);
  const [heroCard, setHeroCard] = useState<HTMLElement | null>(null);

  useEffect(() => {
    trackLead("lead_page_view", locale);
  }, [locale]);

  const markDone = useCallback((placement: LeadFormPlacement) => {
    setDoneBy((current) => current ?? placement);
  }, []);

  const value = useMemo<LeadStateValue>(
    () => ({ locale, doneBy, markDone, heroCard, registerHeroCard: setHeroCard }),
    [locale, doneBy, markDone, heroCard],
  );

  return <LeadStateContext.Provider value={value}>{children}</LeadStateContext.Provider>;
}

/** Hero form kartının kabı: sabit düğme bu elemanın görünürlüğüne bakar. */
export function LeadHeroCard({ id, className, children }: { id: string; className: string; children: ReactNode }) {
  const { registerHeroCard } = useLeadState();
  return (
    <div id={id} ref={registerHeroCard} className={className}>
      {children}
    </div>
  );
}
