import { Fragment } from "react";
import { fill } from "@/lib/format";
import { monoText } from "@/components/spark/decisions/styles";
import type { ReportCard, ReportFigure, ReportHeadProps, ReportRefsProps } from "@/types/content";

export const wrap = "mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]";
export const bandPad = "py-[clamp(56px,8vw,112px)]";
const mono = monoText;

/**
 * Metindeki "[n]" ya da "[1,3]" işaretlerini kaynak listesine giden küçük
 * üst simge linklere çevirir (prototip `.src`). Işaretin önündeki boşluk
 * atılır; link adı "Source n" (etiketlerden).
 */
export function ReportRefs({ text, template }: ReportRefsProps) {
  const parts = text.split(/\s*\[(\d+(?:,\d+)*)\]/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Fragment key={i}>
            {part.split(",").map((n) => (
              <a
                key={n}
                href={`#source-${n}`}
                aria-label={fill(template, { n })}
                className="ml-[2px] align-super font-mono text-[11px] whitespace-nowrap text-stone no-underline hover:underline"
              >
                [{n}]
              </a>
            ))}
          </Fragment>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Bölüm başlığı (prototip `.sec-head`): Ink üst çizgi, mono numara ve etiket, başlık, giriş. */
export function SectionHead({ head, id }: ReportHeadProps) {
  return (
    <div className="mb-[clamp(28px,4vw,48px)] grid gap-3 border-t-2 border-ink pt-[18px]">
      <div className={`${mono} flex flex-wrap gap-3.5`}>
        {head.index && <span>{head.index}</span>}
        <span>{head.label}</span>
      </div>
      <h2
        id={id}
        className="m-0 max-w-[24ch] font-display text-[clamp(26px,3.4vw,40px)] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-ink"
      >
        {head.title}
      </h2>
      {head.lede && <p className="mt-1.5 mb-0 max-w-[62ch] text-stone">{head.lede}</p>}
    </div>
  );
}

/** Beyaz ya da Paper kart (prototip `.card`): Ink üst çizgi, mono etiket, Epilogue ilk cümle, metin. */
export function ReportCardBlock({ card, template, onWhite = false }: { card: ReportCard; template: string; onWhite?: boolean }) {
  return (
    <article className={`grid min-w-0 content-start gap-3 border-t-2 border-ink px-[22px] pt-[22px] pb-[26px] ${onWhite ? "bg-paper" : "bg-white"}`}>
      <span className={`${mono} text-stone`}>{card.tag}</span>
      <p className="m-0 font-display text-[21px] leading-[1.2] font-bold tracking-[-0.015em]">{card.first}</p>
      <p className="m-0 text-[15.5px]">
        <ReportRefs text={card.body} template={template} />
      </p>
    </article>
  );
}

/** Rakam ve etiket (prototip `.fig`). */
export function ReportFigureBlock({ figure, template, className = "" }: { figure: ReportFigure; template: string; className?: string }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="font-display text-[clamp(24px,2.6vw,38px)] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap tabular-nums max-[420px]:text-[22px]">
        {figure.value}
      </div>
      <div className="mt-2 text-[14px] leading-[1.45] text-stone">
        <ReportRefs text={figure.label} template={template} />
      </div>
    </div>
  );
}

/** Dört (ya da iki) rakamlık şerit (prototip `.figrow`). Dar ekranda iki sütun. */
export function FigureRow({ figures, template, two = false }: { figures: ReportFigure[]; template: string; two?: boolean }) {
  const last = figures.length - 1;
  return (
    <div className={`grid grid-cols-2 border-t-2 border-ink ${two ? "" : "min-[821px]:grid-cols-4"}`}>
      {figures.map((figure, i) => {
        const narrow = `${i % 2 === 0 ? "border-r pl-0" : "border-r-0 pl-5"} ${i >= 2 && !two ? "border-t" : ""}`;
        const wide = two
          ? ""
          : `min-[821px]:border-t-0 ${i === last ? "min-[821px]:border-r-0" : "min-[821px]:border-r"} ${i === 0 ? "min-[821px]:pl-0" : "min-[821px]:pl-5"}`;
        return (
          <ReportFigureBlock
            key={figure.value + figure.label}
            figure={figure}
            template={template}
            className={`border-rule pt-5 pr-5 pb-1.5 ${narrow} ${wide}`}
          />
        );
      })}
    </div>
  );
}

/** Mono etiket satırı. */
export function MonoLine({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`${mono} ${className}`}>{children}</span>;
}
