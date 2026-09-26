import { Fragment } from "react";
import { fill } from "@/lib/format";
import type { FootnoteTextProps } from "@/types/content";

/**
 * Metindeki "[n]" işaretlerini kaynak listesine giden küçük üst simge
 * linklere çevirir (prototip `.fn`). Link #source-n'e gider; adı
 * "Source n" (etiketlerden).
 */
export default function FootnoteText({ text, template }: FootnoteTextProps) {
  const parts = text.split(/\[(\d+)\]/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <sup key={i} className="top-0 align-super text-[11px] leading-none">
            <a
              href={`#source-${part}`}
              aria-label={fill(template, { n: part })}
              className="ml-[2px] font-mono text-stone no-underline hover:text-ink"
            >
              {part}
            </a>
          </sup>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
