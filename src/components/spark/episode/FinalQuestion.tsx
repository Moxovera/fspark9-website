"use client";

import { useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import CutButton from "@/components/brand/CutButton";
import { ArrowRightIcon } from "@/components/icons";
import type { FinalQuestionProps } from "@/types/content";

/**
 * Son soru (prototip son-gun-01-bo-v3 `.yourtable`): dört durum, her biri
 * bir hizmete denk. Seçince altında uyan hizmet açılır: mono ad (hizmet
 * sayfasına link), kısa başlık, tek satır ve randevu penceresini açan
 * Flare kesik buton. Seçim saklanmaz, gönderilmez.
 */
export default function FinalQuestion({ content }: FinalQuestionProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const titleId = useId();
  const fit = picked === null ? undefined : content.options[picked];

  return (
    <div className="mt-[90px] border-t-4 border-ink bg-white px-5 py-7 min-[761px]:px-7">
      <p className="m-0 font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase">
        {content.label}
      </p>
      <h3
        id={titleId}
        className="mt-[10px] mb-5 max-w-[22ch] font-display text-[clamp(26px,3vw,36px)] leading-[1.08] font-extrabold tracking-[-0.025em] text-ink"
      >
        {content.title}
      </h3>
      {content.lead && <p className="mt-0 mb-5 max-w-[56ch] text-[18px] leading-[1.6] text-stone">{content.lead}</p>}
      <div role="group" aria-labelledby={titleId} className="grid gap-[10px]">
        {content.options.map((option, i) => {
          const pressed = i === picked;
          return (
            <button
              key={option.text}
              type="button"
              aria-pressed={pressed}
              onClick={() => setPicked(i)}
              className={`decision-option grid cursor-pointer grid-cols-[32px_1fr] items-start gap-3 border-2 px-[18px] py-4 text-left text-[17px] leading-[1.45] ${
                pressed ? "border-ink bg-ink text-paper" : "border-transparent bg-paper text-ink hover:border-ink"
              }`}
            >
              <ArrowRightIcon className="mt-[3px] size-[18px]" />
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {fit && (
          <div className="mt-[22px] border-t border-rule pt-5">
            <Link
              href={{ pathname: "/services/[slug]", params: { slug: fit.service } }}
              className="inline-flex min-h-11 items-center font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase underline underline-offset-4"
            >
              {fit.serviceName}
            </Link>
            <b className="mt-[2px] mb-2 block font-display text-[24px] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
              {fit.heading}
            </b>
            <p className="mt-0 mb-5 max-w-[56ch] text-[18px] leading-[1.6] text-ink">{fit.body}</p>
            <CutButton label={content.ctaLabel} />
          </div>
        )}
      </div>
    </div>
  );
}
