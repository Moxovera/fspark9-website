"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowDownIcon, CheckIcon } from "@/components/icons";
import { useLeadState } from "@/components/lead/LeadProvider";
import { LEAD_SOURCE, isValidEmail, readUtm, submitLead, trackLead } from "@/lib/lead";
import { markPending } from "@/lib/sparkReader";
import type { LeadFormProps } from "@/types/content";

const CUT = "[clip-path:polygon(0_0,100%_0,calc(100%-18px)_100%,0_100%)]";

/**
 * Lead formu (hero kartı ve kapanış bloğu, davranış aynı). Adres tarayıcıda
 * doğrulanır; geçerliyse kutu hemen "rapor yolda"ya döner ve PDF iner,
 * kayıt arka planda gider (lib/lead.ts). Gizli `company` alanı bal tuzağı:
 * doluysa hiçbir şey gönderilmez.
 */
export default function LeadForm({ copy, placement, locale, pdf, ground }: LeadFormProps) {
  const inputId = useId();
  const consentId = useId();
  const { doneBy, markDone } = useLeadState();
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(true);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const href = `/reports/${pdf}`;
  const ink = ground === "ink";

  // Gönderen formun kutusu açılınca indirme kendiliğinden başlar.
  useEffect(() => {
    if (doneBy !== placement) return;
    downloadRef.current?.click();
    downloadRef.current?.focus({ preventScroll: true });
  }, [doneBy, placement]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("company") ?? "")) return;
    const email = String(data.get("email") ?? "").trim();
    if (!isValidEmail(email)) {
      setError(copy.error);
      return;
    }
    setError("");
    trackLead("lead_submit", locale, { form: placement });
    submitLead({ email, lang: locale, consent, source: LEAD_SOURCE, form: placement, ...readUtm() });
    markPending(email);
    markDone(placement);
  }

  if (doneBy) {
    return (
      <div role="status" className={ink ? "text-left" : "text-center"}>
        {!ink && (
          <span className="mx-auto mb-3 flex size-[54px] items-center justify-center bg-flare text-ink">
            <CheckIcon className="size-7" />
          </span>
        )}
        <h3 className={`m-0 font-display text-[24px] leading-[1.1] font-extrabold tracking-[-0.025em] ${ink ? "text-paper" : "text-ink"}`}>
          {copy.doneTitle}
        </h3>
        <p className={`mt-2 mb-4 text-[15.5px] leading-[1.5] ${ink ? "text-dust" : "text-stone"}`}>{copy.doneText}</p>
        <a
          ref={downloadRef}
          href={href}
          download
          onClick={() => trackLead("lead_pdf_download", locale, { form: placement })}
          className={`inline-flex min-h-[52px] items-center justify-center gap-[10px] pr-[38px] pl-[22px] font-sans text-[16px] leading-none font-bold no-underline ${CUT} ${ink ? "bg-flare text-ink" : "w-full bg-ink text-paper"}`}
        >
          {copy.download}
          <ArrowDownIcon className="size-[1em] flex-none" />
        </a>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={submit} noValidate className={ink ? "grid gap-[10px] min-[600px]:grid-cols-[minmax(0,1fr)_auto]" : "grid gap-[10px]"}>
        <label htmlFor={inputId} className="sr-only">
          {copy.placeholder}
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder={copy.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`h-[56px] w-full min-w-0 rounded-none border-0 border-b-2 px-4 font-sans text-[16px] text-ink placeholder:text-stone ${
            ink ? "border-flare bg-paper focus-visible:-outline-offset-2 focus-visible:outline-flare" : "border-ink bg-white"
          }`}
        />
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />
        <button
          type="submit"
          className={`inline-flex h-[56px] cursor-pointer items-center justify-center gap-[10px] border-0 pr-[38px] pl-[22px] font-sans text-[16px] leading-none font-bold whitespace-nowrap ${CUT} ${
            ink ? "bg-flare text-ink" : "w-full bg-ink text-paper"
          }`}
        >
          {copy.button}
          <ArrowDownIcon className="size-[1em] flex-none" />
        </button>
      </form>
      <p id={`${inputId}-error`} role="alert" className={`m-0 text-[14px] ${ink ? "text-paper" : "text-ink"} ${error ? "mt-2" : ""}`}>
        {error}
      </p>
      <div className={`mt-3 flex items-start gap-[10px] text-[13px] leading-[1.45] ${ink ? "text-dust" : "text-stone"}`}>
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className={`mt-[2px] size-[18px] flex-none cursor-pointer ${ink ? "accent-flare" : "accent-ink"}`}
        />
        <label htmlFor={consentId} className="cursor-pointer">
          {copy.consent}
        </label>
      </div>
    </div>
  );
}
