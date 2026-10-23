"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { ArrowUpIcon, CloseIcon } from "@/components/icons";
import SparkMark from "@/components/spark/newsletter/SparkMark";
import SparkSubscribe from "@/components/spark/newsletter/SparkSubscribe";
import { useBooking } from "@/hooks/useBooking";
import { useMobileMenu } from "@/components/chrome/MobileMenuContext";
import { useVideoOpen } from "@/components/ui/VideoOpenContext";
import { NEWSLETTER_ID } from "@/lib/newsletter";
import type { NewsletterBoxProps } from "@/types/content";

type Phase = "pending" | "open" | "min";

const STORAGE_KEY = "fspark9-newsletter-box";

/**
 * Spark sayfalarındaki (/spark ve altı) sabit bülten kutusu. Açık gelir,
 * kapatma düğmesi kutuyu küçültür: sağ altta sekme olarak kalır, sekmeye
 * basınca kutu geri açılır. Küçültme o oturumda (sessionStorage) hatırlanır;
 * başka süre mantığı yok. Footer'daki şerit ekrandayken, randevu penceresi,
 * mobil menü ya da video penceresi açıkken gizli. Telefonda
 * MobileBookingBar'ın hemen üstünde şerit (`--booking-bar-h`).
 */
export default function NewsletterBox({ content, locale }: NewsletterBoxProps) {
  const pathname = usePathname();
  const onSpark = pathname === "/spark" || pathname.startsWith("/spark/");
  const { isOpen: bookingOpen } = useBooking();
  const { isOpen: menuOpen } = useMobileMenu();
  const videoOpen = useVideoOpen();
  const [phase, setPhase] = useState<Phase>("pending");
  const [stripVisible, setStripVisible] = useState(false);

  useEffect(() => {
    let minimised = false;
    try {
      minimised = window.sessionStorage.getItem(STORAGE_KEY) === "min";
    } catch {
      // Depolama kapalı: kutu açık gelir.
    }
    setPhase(minimised ? "min" : "open");
  }, []);

  // Footer şeridi ekrana girince kutu gizlenir (aynı formu iki kere göstermeyelim).
  useEffect(() => {
    const strip = document.getElementById(NEWSLETTER_ID);
    if (!strip) return;
    const observer = new IntersectionObserver(([entry]) => setStripVisible(entry.isIntersecting));
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  const tabRef = useRef<HTMLButtonElement>(null);
  const minimiseRef = useRef<HTMLButtonElement>(null);
  const focusAfter = useRef<"tab" | "box" | null>(null);
  useEffect(() => {
    if (focusAfter.current === "tab") tabRef.current?.focus();
    if (focusAfter.current === "box") minimiseRef.current?.focus();
    focusAfter.current = null;
  }, [phase]);

  const remember = useCallback((value: "min" | "open") => {
    try {
      if (value === "min") window.sessionStorage.setItem(STORAGE_KEY, "min");
      else window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Depolama kapalıysa sayfa değişene kadar bu durumda kalır.
    }
  }, []);
  const minimise = useCallback(() => {
    focusAfter.current = "tab";
    remember("min");
    setPhase("min");
  }, [remember]);
  const expand = useCallback(() => {
    focusAfter.current = "box";
    remember("open");
    setPhase("open");
  }, [remember]);

  if (!onSpark || phase === "pending") return null;

  const hidden = stripVisible || bookingOpen || menuOpen || videoOpen;

  if (phase === "min") {
    return (
      <button
        ref={tabRef}
        type="button"
        onClick={expand}
        aria-label={content.tabAriaLabel}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
        className={`on-ink fixed right-4 bottom-[calc(var(--booking-bar-h)+12px)] z-[79] inline-flex h-11 cursor-pointer items-center gap-2 border-0 border-t-[3px] border-flare bg-ink px-3 font-sans text-[14px] leading-none font-bold whitespace-nowrap text-paper min-[900px]:right-8 min-[900px]:bottom-8 min-[900px]:h-12 min-[900px]:px-4 ${hidden ? "invisible" : ""}`}
      >
        <SparkMark />
        <span className="min-[900px]:hidden">{content.tabPhoneLabel}</span>
        <span className="hidden min-[900px]:inline">{content.tabLabel}</span>
        <ArrowUpIcon className="size-4 flex-none" />
      </button>
    );
  }

  return (
    <div
      role="region"
      aria-label={content.boxLabel}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      className={`newsletter-box-in on-ink fixed inset-x-0 bottom-[var(--booking-bar-h)] z-[79] border-t-[3px] border-flare bg-ink px-4 pt-[10px] pb-[14px] text-paper shadow-[0_-6px_24px_rgb(0_0_0/0.25)] min-[900px]:inset-x-auto min-[900px]:right-8 min-[900px]:bottom-8 min-[900px]:w-[360px] min-[900px]:border-t-4 min-[900px]:px-5 min-[900px]:pt-[18px] min-[900px]:pb-5 min-[900px]:shadow-[0_8px_32px_rgb(0_0_0/0.35)] ${hidden ? "invisible" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-[10px]">
          <SparkMark />
          <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-flare uppercase">
            <span className="min-[900px]:hidden">{content.boxPhoneLabel}</span>
            <span className="hidden min-[900px]:inline">{content.boxLabel}</span>
          </span>
        </div>
        <button
          ref={minimiseRef}
          type="button"
          onClick={minimise}
          aria-label={content.boxMinimiseLabel}
          className="-my-2 -mr-3 flex size-11 flex-none cursor-pointer items-center justify-center border-0 bg-transparent text-dust"
        >
          <CloseIcon className="size-[18px]" />
        </button>
      </div>
      <div className="hidden min-[900px]:mt-1 min-[900px]:block">
        <p className="m-0 font-display text-[20px] leading-[1.2] font-extrabold tracking-[-0.02em] text-paper">{content.boxHeading}</p>
        <p className="mt-2 mb-0 text-[14px] leading-[1.45] text-paper">{content.boxText}</p>
      </div>
      <SparkSubscribe variant="inline-dark" size="box" locale={locale} content={content} className="mt-[10px] min-[900px]:mt-4" />
    </div>
  );
}
