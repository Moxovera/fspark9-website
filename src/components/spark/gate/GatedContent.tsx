"use client";

import { useEffect, useRef, useState } from "react";
import GateCard from "@/components/spark/gate/GateCard";
import { GateFreshStrip, GateReminderStrip } from "@/components/spark/gate/GateStrips";
import { useSparkReader } from "@/hooks/useSparkReader";
import { countReminderVisit, markConfirmed, markPending, registerLockedGate, reminderDue, snoozeReminder } from "@/lib/sparkReader";
import type { GatedContentProps } from "@/types/content";

/**
 * Sektör raporunun özetten sonrası. Metin HTML'de durur; kilit sadece
 * görsel (`.js [data-gate="locked"]`, globals.css): bulanık, kırpılmış,
 * seçilemez, klavyeyle girilemez (inert). Okurun durumu yoksa kart çıkar;
 * kayıt sayfayı yenilemeden açar. Onay bekleyen okura rapor açık gelir,
 * üstte hatırlatma çıkar. Depolama çalışmıyorsa kilit hiç gösterilmez.
 */
export default function GatedContent({ newsletter, locale, children }: GatedContentProps) {
  const { ready, available, reader } = useSparkReader();
  const [freshEmail, setFreshEmail] = useState<string | null>(null);
  const [freshOpen, setFreshOpen] = useState(true);
  const [animate, setAnimate] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Hidrasyon bitene kadar kilitli say (SSR de böyle); depolama okununca karar verilir.
  const locked = !ready || (available && !reader);
  const remind = ready && !locked && freshEmail === null && reminderDue(reader);

  useEffect(() => {
    if (!ready || !locked) return;
    return registerLockedGate();
  }, [ready, locked]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.inert = locked;
  }, [locked]);

  // Kilitliyken bölüm menüsü (ve adresteki #bölüm) kırpık alana atlamasın: kartı gösterir.
  useEffect(() => {
    if (!ready || !locked) return;
    const showCard = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      cardRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id || !bodyRef.current?.querySelector(`[id="${CSS.escape(id)}"]`)) return;
      event.preventDefault();
      showCard();
    };
    document.addEventListener("click", onClick);
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash && bodyRef.current?.querySelector(`[id="${CSS.escape(hash)}"]`)) showCard();
    return () => document.removeEventListener("click", onClick);
  }, [ready, locked]);

  useEffect(() => {
    if (remind) countReminderVisit();
  }, [remind]);

  const opened = (email: string, member: boolean) => {
    setAnimate(true);
    if (member) {
      markConfirmed(email);
    } else {
      setFreshEmail(email);
      markPending(email);
    }
  };

  return (
    <div data-gate={locked ? "locked" : "open"} data-gate-animate={animate ? "" : undefined}>
      {freshEmail !== null && freshOpen && <GateFreshStrip content={newsletter} email={freshEmail} onClose={() => setFreshOpen(false)} />}
      {remind && reader && (
        <GateReminderStrip content={newsletter} email={reader.email} locale={locale} onClose={snoozeReminder} />
      )}
      <div className="gate-stage relative">
        <div ref={bodyRef} className="gate-body">
          {children}
        </div>
        <div aria-hidden="true" className="gate-veil" />
        {locked && (
          <div ref={cardRef} className="gate-card-wrap">
            <GateCard content={newsletter} locale={locale} onOpened={opened} />
          </div>
        )}
      </div>
    </div>
  );
}
