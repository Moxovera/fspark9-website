"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { kitFormAction } from "@/lib/newsletter";
import { submitToKit } from "@/lib/sparkReader";
import type { GateCardProps } from "@/types/content";

/**
 * Kilidin kartı: Ink zemin, sağ üst köşede Flare dilim (köşe 0). Aynı
 * kart "Zaten üyeyim" ile metin değiştirir, form yerinde kalır. Form
 * sayfada kalarak arka planda Kit'e gider; JS kapalıyken kart zaten
 * gizli (kilit `.js` sınıfına bağlı).
 */
export default function GateCard({ content, locale, onOpened }: GateCardProps) {
  const inputId = useId();
  const action = kitFormAction(locale);
  const [member, setMember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const email = (new FormData(event.currentTarget).get("email_address") as string | null)?.trim() ?? "";
    if (!email) return;
    setBusy(true);
    setError("");
    const result = await submitToKit(locale, email);
    if (result === "ok") {
      onOpened(email, member);
      return;
    }
    setBusy(false);
    setError(result === "invalid" ? content.gateErrorInvalid : content.gateErrorGeneric);
  }

  const switchTo = (next: boolean) => {
    setMember(next);
    setError("");
  };

  return (
    <div className="on-ink relative w-full max-w-[560px] bg-ink px-6 pt-9 pb-5 text-paper min-[768px]:px-9 min-[768px]:pt-11 min-[768px]:pb-6">
      <span aria-hidden="true" className="absolute top-0 right-0 size-12 bg-flare [clip-path:polygon(0_0,100%_0,100%_100%)] min-[768px]:size-14" />
      <h2 className="m-0 max-w-[20ch] pr-8 font-display text-[clamp(24px,3vw,32px)] leading-[1.1] font-extrabold tracking-[-0.025em] text-paper">
        {member ? content.gateMemberTitle : content.gateTitle}
      </h2>
      <p className="mt-3 mb-5 max-w-[46ch] text-[15.5px] leading-[1.5] text-paper">{member ? content.gateMemberText : content.gateText}</p>
      <form onSubmit={submit} aria-busy={busy}>
        <div className="flex w-full flex-col items-stretch min-[480px]:flex-row">
          <label htmlFor={inputId} className="sr-only">
            {content.gateEmailLabel}
          </label>
          <input
            id={inputId}
            type="email"
            name="email_address"
            required
            inputMode="email"
            autoComplete="email"
            placeholder={content.gateEmailLabel}
            className="h-[52px] min-w-0 rounded-none min-[480px]:flex-1 border-0 border-b-2 border-flare bg-paper px-4 font-sans text-[16px] text-ink placeholder:text-stone focus-visible:-outline-offset-2 focus-visible:outline-flare"
          />
          <button
            type="submit"
            disabled={busy || !action}
            className="inline-flex h-[52px] flex-none cursor-pointer items-center justify-center gap-[10px] border-0 bg-flare py-0 pr-5 pl-5 font-sans text-[15px] leading-none font-bold whitespace-nowrap text-ink disabled:cursor-default disabled:opacity-60 min-[480px]:pr-[34px] min-[480px]:[clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)]"
          >
            {busy ? content.gateSending : content.gateButton}
            {!busy && <ArrowRightIcon className="-mx-[0.2em] size-[1em] flex-none" />}
          </button>
        </div>
        <p role="alert" className={`m-0 text-[14px] text-paper ${error ? "mt-2" : ""}`}>
          {error}
        </p>
      </form>
      <p className="mt-3 mb-0 text-[13.5px] leading-[1.45] text-dust">{member ? content.gateMemberNote : content.gateNote}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-2 border-t border-inkrule pt-1 text-[14px] text-dust">
        {member ? content.gateBackPrompt : content.gateMemberPrompt}
        <button
          type="button"
          onClick={() => switchTo(!member)}
          className="min-h-11 cursor-pointer border-0 bg-transparent p-0 font-sans text-[14px] font-bold text-paper underline underline-offset-4"
        >
          {member ? content.gateBackButton : content.gateMemberButton}
        </button>
      </div>
    </div>
  );
}
