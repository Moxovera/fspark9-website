import { Fragment } from "react";
import { fill } from "@/lib/format";
import { tokenizeRich } from "@/lib/radar";
import type { RadarParasProps, RadarRichProps } from "@/types/content";

/**
 * Bölüm metninin satır içi biçimi: `**x**` kalın, `[3]` ve `[3,5]` sayfanın
 * altındaki kaynak listesine giden link. Kaynak işareti olduğu gibi
 * yazılır (köşeli parantezli, mono), silinmez.
 */
export default function RadarRich({ text, template }: RadarRichProps) {
  return (
    <>
      {tokenizeRich(text).map((token, i) => {
        if (token.type === "bold") return <strong key={i}>{token.text}</strong>;
        if (token.type === "text") return <Fragment key={i}>{token.text}</Fragment>;
        return (
          <a
            key={i}
            href={`#source-${token.n}`}
            aria-label={fill(template, { n: token.n })}
            className="align-[2px] font-mono text-[11px] text-stone no-underline hover:underline"
          >
            {`[${token.n}]`}
          </a>
        );
      })}
    </>
  );
}

/** Paragraf listesi; her paragraf `RadarRich`. */
export function RadarParas({ items, template, className }: RadarParasProps) {
  return (
    <>
      {items.map((item, i) => (
        <p key={i} className={`m-0 ${className ?? ""}`}>
          <RadarRich text={item} template={template} />
        </p>
      ))}
    </>
  );
}
