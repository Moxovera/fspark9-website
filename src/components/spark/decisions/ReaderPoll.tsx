"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ChoiceOptions } from "@/components/spark/decisions/ChoiceDecision";
import { monoText } from "@/components/spark/decisions/styles";
import { fill } from "@/lib/format";
import { ANSWER_MAX_CHARS, ANSWER_MAX_WORDS, countWords } from "@/lib/sparkAnswer";
import type { ReaderPollProps } from "@/types/content";

type Phase = "idle" | "sending" | "done";

const field =
  "w-full rounded-none border-2 border-ink bg-white px-[14px] py-3 text-[17px] leading-[1.5] text-ink";

/**
 * Okur sorusu (prototip son-gun-02-nuri-v2 `.poll`): dört seçenek; A, B, C
 * e-posta alanını ve gönder düğmesini, D ayrıca serbest metni açar.
 * Gönderim /api/spark-answer'a gider, sonuç e-postayla gelir; tarayıcıda
 * hiçbir şey saklanmaz, okura sonuç gösterilmez. `company` bal küpü
 * alanı, `elapsedMs` sayfa açılalı geçen süre (sunucu 3 saniyeden hızlıyı
 * reddeder).
 */
export default function ReaderPoll({ poll, episode, lang, questionId }: ReaderPollProps) {
  const [choice, setChoice] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const free = choice === poll.freeKey;
  const words = countWords(text);
  const over = words > ANSWER_MAX_WORDS || text.length > ANSWER_MAX_CHARS;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!choice || phase === "sending") return;
    const answer = free ? text.trim() : "";
    if (free && countWords(answer) === 0) {
      setMessage(poll.emptyText);
      textRef.current?.focus();
      return;
    }
    if (free && over) {
      setMessage(poll.tooLong);
      textRef.current?.focus();
      return;
    }
    setPhase("sending");
    setMessage("");
    try {
      const response = await fetch("/api/spark-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episode,
          lang,
          choice,
          choiceLabel: poll.options.find((option) => option.key === choice)?.text ?? "",
          text: answer,
          email: emailRef.current?.value.trim() ?? "",
          company: companyRef.current?.value ?? "",
          elapsedMs: Math.round(performance.now()),
          page: window.location.href,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setPhase("done");
      setMessage(poll.thanks);
    } catch {
      setPhase("idle");
      setMessage(poll.error);
    }
  }

  return (
    <form onSubmit={submit} className="mt-2">
      {phase !== "done" && (
        <>
          <ChoiceOptions
            options={poll.options}
            chosen={choice}
            labelledBy={questionId}
            onChoose={(key) => {
              setChoice(key);
              setMessage("");
              if (key === poll.freeKey) requestAnimationFrame(() => textRef.current?.focus());
            }}
          />
          {free && (
            <div className="mt-[18px] flex flex-col gap-2">
              <label htmlFor={`${id}-text`} className="text-[15px] font-semibold">
                {poll.freeLabel}
              </label>
              <textarea
                ref={textRef}
                id={`${id}-text`}
                name="text"
                rows={6}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder={poll.freePlaceholder}
                aria-describedby={`${id}-count`}
                className={`${field} min-h-[140px] resize-y`}
              />
              <p id={`${id}-count`} className={`${monoText} m-0 text-right ${over ? "font-bold text-ink" : "text-stone"}`}>
                {fill(poll.counterTemplate, { n: String(words) })}
              </p>
            </div>
          )}
          {choice && (
            <div className="mt-[18px] flex flex-col gap-2">
              <label htmlFor={`${id}-email`} className="text-[15px] font-semibold">
                {poll.emailLabel}
              </label>
              <input ref={emailRef} id={`${id}-email`} type="email" name="email" autoComplete="email" className={field} />
              <input
                ref={companyRef}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] size-px opacity-0"
              />
              <button
                type="submit"
                disabled={phase === "sending"}
                className="mt-2 inline-flex min-h-12 cursor-pointer items-center self-start border-2 border-ink bg-ink px-[22px] text-[16px] leading-[normal] font-semibold text-paper disabled:cursor-default disabled:opacity-50"
              >
                {phase === "sending" ? poll.sendingLabel : poll.submitLabel}
              </button>
              <p className="m-0 text-[14px] text-stone">{poll.privacyLine}</p>
            </div>
          )}
        </>
      )}
      <p role="status" aria-live="polite" className="mt-[14px] mb-0 flex items-baseline gap-[10px] text-[16px] empty:hidden">
        {message && (
          <>
            <i aria-hidden="true" className="inline-block size-[10px] flex-none bg-ink" />
            <span>{message}</span>
          </>
        )}
      </p>
    </form>
  );
}
