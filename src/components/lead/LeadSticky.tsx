"use client";

import { useEffect, useState } from "react";
import { ArrowDownIcon } from "@/components/icons";
import { useLeadState } from "@/components/lead/LeadProvider";
import { LEAD_FORM_ID, trackLead } from "@/lib/lead";
import type { LeadStickyProps } from "@/types/content";

/**
 * Sadece 900px altı: hero form kartı ekrandan çıkınca alttan gelen sabit
 * Flare düğme, gönderimden sonra yok. Görünürlük IntersectionObserver ile,
 * kaydırma dinleyicisi yok. Hareket `lead-sticky` (reduced-motion'da yok).
 */
export default function LeadSticky({ label }: LeadStickyProps) {
  const { heroCard, doneBy, locale } = useLeadState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!heroCard) return;
    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { threshold: 0 });
    observer.observe(heroCard);
    return () => observer.disconnect();
  }, [heroCard]);

  if (doneBy) return null;

  return (
    <div
      aria-hidden={show ? undefined : true}
      className={`lead-sticky fixed inset-x-3 bottom-3 z-[80] hidden max-[900px]:block ${show ? "is-on" : "invisible"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a
        href={`#${LEAD_FORM_ID}`}
        tabIndex={show ? undefined : -1}
        onClick={() => trackLead("lead_sticky_click", locale)}
        className="flex min-h-[54px] w-full items-center justify-center gap-[10px] bg-flare font-sans text-[16px] leading-none font-bold text-ink no-underline shadow-xl"
      >
        {label}
        <ArrowDownIcon className="size-[1em] flex-none" />
      </a>
    </div>
  );
}
