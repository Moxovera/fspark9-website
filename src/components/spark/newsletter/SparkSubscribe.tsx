"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import type { SparkSubscribeProps } from "@/types/content";

type Phase = "idle" | "sending" | "done";
type Problem = "invalid" | "unavailable" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Spark bülteni formu (Kit). Tek bileşen, üç görünüm: `card` (sarı kart),
 * `inline-dark` (Spark girişi, koyu zemin) ve `quiet` (Son Gün sonu: tek
 * satır, açılınca küçük form). Kayıt /api/subscribe'a gider; Kit anahtarı
 * istemciye hiç gelmez. `website` görünmez bal küpü alanı. Kayıt, ziyaretçi
 * gönderene kadar hiçbir istek yapmaz.
 */
export default function SparkSubscribe({ variant, source, locale, content, className, size, onDone }: SparkSubscribeProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const inputId = useId();
  const errorId = useId();
  const quiet = variant === "quiet";
  const dark = variant === "inline-dark";
  const dims = size === "box" ? "h-11 min-[900px]:h-[46px]" : size === "footer" ? "h-12" : "h-[52px] min-[768px]:h-[54px]";
  const buttonTone = dark ? (size ? "bg-flare text-ink" : "bg-flare text-ink min-[768px]:bg-paper") : "bg-ink text-paper";

  useEffect(() => {
    if (phase === "done") onDone?.();
  }, [phase, onDone]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "sending") return;
    if (!EMAIL.test(email.trim())) {
      setProblem("invalid");
      return;
    }
    setProblem(null);
    setPhase("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source, locale, website }),
      });
      if (response.ok) {
        setPhase("done");
        return;
      }
      setProblem(response.status === 400 ? "invalid" : response.status === 503 ? "unavailable" : "error");
    } catch {
      setProblem("error");
    }
    setPhase("idle");
  }

  const message =
    problem === "invalid" ? content.invalidMessage : problem === "unavailable" ? content.unavailableMessage : content.errorMessage;
  const successText = quiet ? content.quietSuccess : content.successMessage;

  if (phase === "done") {
    return (
      <p
        role="status"
        className={`m-0 text-[16px] leading-[1.5] font-bold ${dark ? "text-paper" : "text-ink"} ${className ?? ""}`}
      >
        {successText}
      </p>
    );
  }

  const honeypot = (
    <input
      type="text"
      name="website"
      value={website}
      onChange={(event) => setWebsite(event.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] size-px opacity-0"
    />
  );
  const errorLine = problem && (
    <p id={errorId} role="alert" className={`m-0 mt-2 text-[14px] leading-[1.4] font-medium ${dark ? "text-paper" : "text-ink"}`}>
      {message}
    </p>
  );

  if (quiet) {
    return (
      <div className={className}>
        {!open ? (
          <p className="m-0 flex flex-wrap items-center gap-x-2 text-[14px] leading-[1.45] text-stone">
            {content.quietPrompt}
            <button
              type="button"
              aria-expanded={false}
              onClick={() => setOpen(true)}
              className="min-h-11 cursor-pointer border-0 bg-transparent p-0 text-left font-sans text-[14px] leading-[1.4] font-bold text-ink underline underline-offset-4"
            >
              {content.quietLink}
            </button>
          </p>
        ) : (
          <form onSubmit={submit} noValidate className="relative">
            <p className="m-0 mb-3 max-w-[56ch] text-[14px] leading-[1.5] text-stone">{content.quietText}</p>
            <div className="flex items-end gap-3">
              <label htmlFor={inputId} className="sr-only">
                {content.emailLabel}
              </label>
              <input
                id={inputId}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={content.emailLabel}
                aria-invalid={problem === "invalid"}
                aria-describedby={problem ? errorId : undefined}
                className="h-11 min-w-0 max-w-[340px] flex-1 rounded-none border-0 border-b-2 border-ink bg-transparent px-1 font-sans text-[16px] text-ink placeholder:text-stone"
              />
              <button
                type="submit"
                disabled={phase === "sending"}
                className="h-11 flex-none cursor-pointer rounded-none border-[1.5px] border-ink bg-transparent px-4 font-sans text-[14px] font-bold text-ink disabled:cursor-default disabled:opacity-60"
              >
                {content.quietButton}
              </button>
            </div>
            {honeypot}
            {errorLine}
          </form>
        )}
      </div>
    );
  }

  // card ve inline-dark: alan ile buton bitişik, tek parça.
  return (
    <form onSubmit={submit} noValidate className={`relative ${className ?? ""}`}>
      <div className="flex w-full items-stretch">
        <label htmlFor={inputId} className="sr-only">
          {content.emailLabel}
        </label>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={content.emailLabel}
          aria-invalid={problem === "invalid"}
          aria-describedby={problem ? errorId : undefined}
          className={`${dims} min-w-0 flex-1 rounded-none border-0 border-b-2 bg-paper px-[14px] font-sans text-[16px] text-ink placeholder:text-stone min-[768px]:px-4 ${
            dark ? "border-flare focus-visible:outline-flare" : "border-ink focus-visible:outline-ink"
          } focus-visible:-outline-offset-2`}
        />
        <button
          type="submit"
          disabled={phase === "sending"}
          className={`${dims} inline-flex flex-none cursor-pointer items-center gap-[10px] border-0 py-0 pr-[34px] pl-5 font-sans text-[15px] leading-none font-bold whitespace-nowrap [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)] disabled:cursor-default disabled:opacity-60 ${buttonTone}`}
        >
          {content.submitLabel}
          <ArrowRightIcon className="-mx-[0.2em] size-[1em] flex-none" />
        </button>
      </div>
      {honeypot}
      {errorLine}
    </form>
  );
}
