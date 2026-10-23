"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { CloseIcon } from "@/components/icons";
import SparkMark from "@/components/spark/newsletter/SparkMark";
import SparkSubscribe from "@/components/spark/newsletter/SparkSubscribe";
import { useBooking } from "@/hooks/useBooking";
import { useMobileMenu } from "@/components/chrome/MobileMenuContext";
import { useVideoOpen } from "@/components/ui/VideoOpenContext";
import { NEWSLETTER_ID } from "@/lib/newsletter";
import type { NewsletterBoxProps } from "@/types/content";

type Phase = "pending" | "open" | "closed";

const STORAGE_KEY = "fspark9-newsletter-box";

/**
 * Spark sayfalarındaki (/spark ve altı) sabit bülten kutusu. Açık gelir,
 * kapatma düğmesi kutuyu o oturumda (sessionStorage) bir daha göstermez;
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
    let closed = false;
    try {
      closed = window.sessionStorage.getItem(STORAGE_KEY) === "closed";
    } catch {
      // Depolama kapalı: kutu açık gelir.
    }
    setPhase(closed ? "closed" : "open");
  }, []);

  // Footer şeridi ekrana girince kutu gizlenir (aynı formu iki kere göstermeyelim).
  useEffect(() => {
    const strip = document.getElementById(NEWSLETTER_ID);
    if (!strip) return;
    const observer = new IntersectionObserver(([entry]) => setStripVisible(entry.isIntersecting));
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "closed");
    } catch {
      // Depolama kapalıysa sayfa değişene kadar kapalı kalır.
    }
    setPhase("closed");
  }, []);

  if (!onSpark || phase !== "open") return null;

  const hidden = stripVisible || bookingOpen || menuOpen || videoOpen;

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
          type="button"
          onClick={close}
          aria-label={content.boxCloseLabel}
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
