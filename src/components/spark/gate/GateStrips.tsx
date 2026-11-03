"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { CloseIcon } from "@/components/icons";
import { replaceEmail, submitToKit } from "@/lib/sparkReader";
import type { GateStripProps, GateReminderProps } from "@/types/content";

const strip = "flex items-start gap-3 px-[clamp(20px,5vw,64px)] py-3.5 text-[15px] leading-[1.5] text-ink";
const closeButton =
  "-my-2 -mr-3 flex size-11 flex-none cursor-pointer items-center justify-center border-0 bg-transparent text-ink";

function fill(template: string, email: string) {
  return template.replace("{email}", email);
}

/** Yeni kayıt şeridi: Flare zemin, dolu küçük daire, sağda kapatma. */
export function GateFreshStrip({ content, email, onClose }: GateStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div ref={ref} role="status" tabIndex={-1} className={`${strip} bg-flare outline-offset-[-3px]`}>
      <span aria-hidden="true" className="mt-[7px] block size-[14px] flex-none rounded-full bg-ink" />
      <p className="m-0 min-w-0 flex-1">
        <b className="font-bold">{content.gateFreshStrong}</b> {fill(content.gateFreshRest, email)}
      </p>
      <button type="button" onClick={onClose} aria-label={content.gateClose} className={closeButton}>
        <CloseIcon className="size-[18px]" />
      </button>
    </div>
  );
}

/** Onay dönüşü şeridi (Spark sayfasının en üstü, bir kez). */
export function GateConfirmedStrip({ content, onClose }: Omit<GateStripProps, "email">) {
  return (
    <div role="status" className={`${strip} bg-flare`}>
      <span aria-hidden="true" className="mt-[7px] block size-[14px] flex-none rounded-full bg-ink" />
      <p className="m-0 min-w-0 flex-1">{content.gateConfirmed}</p>
      <button type="button" onClick={onClose} aria-label={content.gateClose} className={closeButton}>
        <CloseIcon className="size-[18px]" />
      </button>
    </div>
  );
}

/**
 * Hatırlatma şeridi: açık Flare zemin, Flare çerçeve, içi boş küçük daire.
 * "Maili tekrar gönder" aynı adresi aynı Kit formuna yollar; "Adresi
 * değiştir" şeridin içinde küçük bir alan açar.
 */
export function GateReminderStrip({ content, email, locale, onClose }: GateReminderProps) {
  const inputId = useId();
  const [changing, setChanging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [shownEmail, setShownEmail] = useState(email);
  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (changing) fieldRef.current?.focus();
  }, [changing]);

  async function resend() {
    if (busy) return;
    setBusy(true);
    setMessage("");
    const result = await submitToKit(locale, shownEmail);
    setBusy(false);
    setMessage(result === "ok" ? content.gateResent : result === "invalid" ? content.gateErrorInvalid : content.gateErrorGeneric);
  }

  async function change(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const next = (new FormData(event.currentTarget).get("email_address") as string | null)?.trim() ?? "";
    if (!next) return;
    setBusy(true);
    setMessage("");
    const result = await submitToKit(locale, next);
    setBusy(false);
    if (result !== "ok") {
      setMessage(result === "invalid" ? content.gateErrorInvalid : content.gateErrorGeneric);
      return;
    }
    replaceEmail(next);
    setShownEmail(next);
    setChanging(false);
    setMessage(fill(content.gateChanged, next));
  }

  const small =
    "inline-flex min-h-11 cursor-pointer items-center border-[1.5px] border-ink px-3.5 font-sans text-[14px] leading-none font-bold disabled:cursor-default disabled:opacity-60";

  return (
    <div role="region" aria-label={content.gateReminderStrong} className={`${strip} border-y border-flare bg-flare/20`}>
      <span aria-hidden="true" className="mt-[7px] block size-[14px] flex-none rounded-full border-2 border-ink" />
      <div className="min-w-0 flex-1">
        <p className="m-0">
          <b className="font-bold">{content.gateReminderStrong}</b> {fill(content.gateReminderRest, shownEmail)}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button type="button" onClick={resend} disabled={busy} className={`${small} bg-ink text-paper`}>
            {content.gateResend}
          </button>
          <button type="button" onClick={() => setChanging((open) => !open)} aria-expanded={changing} className={`${small} bg-transparent text-ink`}>
            {content.gateChange}
          </button>
        </div>
        {changing && (
          <form onSubmit={change} className="mt-3 flex max-w-[460px] items-stretch">
            <label htmlFor={inputId} className="sr-only">
              {content.gateNewEmailLabel}
            </label>
            <input
              ref={fieldRef}
              id={inputId}
              type="email"
              name="email_address"
              required
              inputMode="email"
              autoComplete="email"
              placeholder={content.gateNewEmailLabel}
              className="h-11 min-w-0 flex-1 rounded-none border-0 border-b-2 border-ink bg-paper px-3 font-sans text-[16px] text-ink placeholder:text-stone"
            />
            <button type="submit" disabled={busy} className="h-11 flex-none cursor-pointer border-0 bg-ink px-4 font-sans text-[14px] font-bold text-paper disabled:cursor-default disabled:opacity-60">
              {busy ? content.gateSending : content.gateUpdate}
            </button>
          </form>
        )}
        <p role="status" className={`m-0 text-[14px] ${message ? "mt-2" : ""}`}>
          {message}
        </p>
      </div>
      <button type="button" onClick={onClose} aria-label={content.gateClose} className={closeButton}>
        <CloseIcon className="size-[18px]" />
      </button>
    </div>
  );
}
