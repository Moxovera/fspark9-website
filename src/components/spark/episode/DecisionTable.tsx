"use client";

import { useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import FootnoteText from "@/components/spark/episode/FootnoteText";
import { fill } from "@/lib/format";
import type { DecisionTableProps } from "@/types/content";

const mono = "font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] uppercase";

/** Mono büyük harfte "fspark9" küçük kalır. */
function brandCase(text: string) {
  return text.split(/(fspark9)/).map((part, i) =>
    part === "fspark9" ? (
      <span key={i} className="normal-case">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * Karar anı (prototip son-gun-01-bo-v3 `.table`): Beyaz kart, 4px Ink üst
 * çizgi, soru ve üç yol. Seçilen yol Ink dolar, diğer ikisi yarıya iner;
 * altında sadece seçilen yolun cevabı açılır ("Your pick · B"). "Show the
 * other roads" diğer ikisini onun altında gösterir, okurun cevabı hep ilk
 * sırada. Sonra "What Bó did" ve Ink zeminde fspark9 notu. Seçim
 * değiştirilebilir; hiçbir şey saklanmaz, puanlanmaz, gönderilmez.
 */
export default function DecisionTable({ decision, labels }: DecisionTableProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const [showOthers, setShowOthers] = useState(false);
  const questionId = useId();
  const chosen = decision.options.find((option) => option.key === picked);
  const others = decision.options.filter((option) => option.key !== picked);
  const pickTag = chosen ? fill(labels.yourPickTemplate, { key: chosen.key }) : "";

  return (
    <div className="mt-11 border-t-4 border-ink bg-white px-5 pt-7 pb-[30px] min-[761px]:px-7">
      <p className={`m-0 flex items-center gap-[10px] text-ink ${mono}`}>
        <span aria-hidden="true" className="size-[10px] flex-none bg-ink" />
        {decision.label}
      </p>
      <p
        id={questionId}
        className="mt-3 mb-[22px] max-w-[26ch] font-display text-[clamp(24px,2.8vw,33px)] leading-[1.12] font-extrabold tracking-[-0.025em] text-ink"
      >
        {decision.question}
      </p>
      <div role="group" aria-labelledby={questionId} className="grid gap-[10px]">
        {decision.options.map((option) => {
          const pressed = option.key === picked;
          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={pressed}
              onClick={() => {
                setPicked(option.key);
                setShowOthers(false);
              }}
              className={`decision-option grid cursor-pointer grid-cols-[32px_1fr] items-start gap-3 border-2 px-[18px] py-4 text-left text-[17px] leading-[1.45] ${
                pressed
                  ? "border-ink bg-ink text-paper"
                  : `border-transparent bg-paper text-ink hover:border-ink ${picked ? "opacity-50" : ""}`
              }`}
            >
              <span className="font-display text-[18px] font-extrabold">{option.key}</span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {chosen ? `${pickTag}. ${chosen.answer}` : ""}
      </p>

      <div className={`decision-answer ${chosen ? "is-open" : ""}`} inert={!chosen}>
        <div>
          <div className="mt-[22px] border-t border-rule pt-[18px]">
            {chosen && (
              <p className="mt-[14px] mb-0 max-w-[58ch] border-l-[3px] border-ink py-[2px] pl-4 text-[18px] leading-[1.6] text-ink">
                <span className={`mb-1 block text-[11.5px] text-ink ${mono}`}>{pickTag}</span>
                {chosen.answer}
              </p>
            )}
            {chosen &&
              showOthers &&
              others.map((option) => (
                <p
                  key={option.key}
                  className="mt-[14px] mb-0 max-w-[58ch] border-l-[3px] border-rule py-[2px] pl-4 text-[16px] leading-[1.6] text-stone"
                >
                  <span className={`mb-1 block text-[11.5px] text-stone ${mono}`}>
                    {fill(labels.roadTemplate, { key: option.key })}
                  </span>
                  {option.answer}
                </p>
              ))}
          </div>
          {!showOthers && (
            <button
              type="button"
              onClick={() => setShowOthers(true)}
              className="mt-1 inline-flex min-h-11 cursor-pointer items-end text-[15px] text-stone underline underline-offset-4 hover:text-ink"
            >
              {labels.otherRoadsLabel}
            </button>
          )}

          <div className="mt-[34px] border-t-2 border-ink pt-[26px]">
            <p className={`m-0 text-ink ${mono}`}>{decision.didLabel}</p>
            <h3 className="mt-2 mb-3 font-display text-[26px] leading-[1.15] font-bold tracking-[-0.02em] text-ink">
              {decision.didTitle}
            </h3>
            {decision.didBody.map((paragraph) => (
              <p key={paragraph} className="mt-0 mb-[14px] max-w-[60ch] text-[18px] leading-[1.6] text-ink">
                <FootnoteText text={paragraph} template={labels.footnoteTemplate} />
              </p>
            ))}
          </div>

          <div className="on-ink mt-[34px] bg-ink px-[26px] py-[22px] text-paper">
            <p className={`m-0 text-dust ${mono}`}>{brandCase(labels.noteLabel)}</p>
            <p className="mt-2 mb-[14px] max-w-[40ch] font-display text-[21px] leading-[1.35] font-bold tracking-[-0.012em]">
              {decision.note}
            </p>
            <p className={`m-0 flex flex-wrap gap-x-2 text-dust ${mono}`}>
              {decision.services.map((tag, i) => (
                <span key={tag.name} className="inline-flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <Link
                    href={{ pathname: "/services/[slug]", params: { slug: tag.service } }}
                    className="inline-flex min-h-11 items-center text-dust underline-offset-4 hover:text-paper hover:underline"
                  >
                    {tag.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
