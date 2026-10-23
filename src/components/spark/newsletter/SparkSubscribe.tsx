import { useId } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { kitFormAction } from "@/lib/newsletter";
import type { SparkSubscribeProps } from "@/types/content";

/**
 * Spark bülteni formu: düz HTML form, Kit formunun adresine POST eder
 * (dile göre TR ya da EN formu). Kit betiği, API anahtarı, route handler
 * yok; Kit kayıttan sonra teşekkür sayfasına yönlendirir. Üç görünüm:
 * `card` (sarı kart), `inline-dark` (Spark girişi, sabit kutu, footer) ve
 * `quiet` (Son Gün sonu: kapalı tek satır, <details> ile açılır, betik yok).
 * Form adresi boşsa (ortam değişkeni girilmemiş) buton pasif.
 */
export default function SparkSubscribe({ variant, locale, content, className, size }: SparkSubscribeProps) {
  const inputId = useId();
  const action = kitFormAction(locale);
  const dark = variant === "inline-dark";

  if (variant === "quiet") {
    return (
      <details className={`group/quiet ${className ?? ""}`}>
        <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-2 text-[14px] leading-[1.45] text-stone marker:hidden [&::-webkit-details-marker]:hidden">
          {content.quietPrompt}
          <span className="font-sans text-[14px] leading-[1.4] font-bold text-ink underline underline-offset-4">{content.quietLink}</span>
        </summary>
        <form method="post" action={action} className="pt-2">
          <p className="m-0 mb-3 max-w-[56ch] text-[14px] leading-[1.5] text-stone">{content.quietText}</p>
          <div className="flex items-end gap-3">
            <label htmlFor={inputId} className="sr-only">
              {content.emailLabel}
            </label>
            <input
              id={inputId}
              type="email"
              name="email_address"
              required
              inputMode="email"
              autoComplete="email"
              placeholder={content.emailLabel}
              className="h-11 min-w-0 max-w-[340px] flex-1 rounded-none border-0 border-b-2 border-ink bg-transparent px-1 font-sans text-[16px] text-ink placeholder:text-stone"
            />
            <button
              type="submit"
              disabled={!action}
              className="h-11 flex-none cursor-pointer rounded-none border-[1.5px] border-ink bg-transparent px-4 font-sans text-[14px] font-bold text-ink disabled:cursor-default disabled:opacity-60"
            >
              {content.quietButton}
            </button>
          </div>
        </form>
      </details>
    );
  }

  const dims = size === "box" ? "h-11 min-[900px]:h-[46px]" : size === "footer" ? "h-12" : "h-[52px] min-[768px]:h-[54px]";
  const buttonTone = dark ? (size ? "bg-flare text-ink" : "bg-flare text-ink min-[768px]:bg-paper") : "bg-ink text-paper";

  // card ve inline-dark: alan ile buton bitişik, tek parça.
  return (
    <form method="post" action={action} className={className}>
      <div className="flex w-full items-stretch">
        <label htmlFor={inputId} className="sr-only">
          {content.emailLabel}
        </label>
        <input
          id={inputId}
          type="email"
          name="email_address"
          required
          inputMode="email"
          autoComplete="email"
          placeholder={content.emailLabel}
          className={`${dims} min-w-0 flex-1 rounded-none border-0 border-b-2 bg-paper px-[14px] font-sans text-[16px] text-ink placeholder:text-stone min-[768px]:px-4 ${
            dark ? "border-flare focus-visible:outline-flare" : "border-ink focus-visible:outline-ink"
          } focus-visible:-outline-offset-2`}
        />
        <button
          type="submit"
          disabled={!action}
          className={`${dims} inline-flex flex-none cursor-pointer items-center gap-[10px] border-0 py-0 pr-[34px] pl-5 font-sans text-[15px] leading-none font-bold whitespace-nowrap [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)] disabled:cursor-default disabled:opacity-60 ${buttonTone}`}
        >
          {content.submitLabel}
          <ArrowRightIcon className="-mx-[0.2em] size-[1em] flex-none" />
        </button>
      </div>
    </form>
  );
}
