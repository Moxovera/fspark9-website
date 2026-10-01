import { Fragment } from "react";
import { fill } from "@/lib/format";
import type { FootnoteTextProps } from "@/types/content";

/**
 * Metindeki "[n]" işaretlerini kaynak listesine giden küçük üst simge
 * linklere çevirir (prototip `.fn`). Link #source-n'e gider; adı
 * "Source n" (etiketlerden). Birden fazla kaynak "[1,3]": aynı üst
 * simgede virgülle ayrılmış linkler (prototip son-gun-fidor `.fns`).
 */
export default function FootnoteText({ text, template }: FootnoteTextProps) {
  const parts = text.split(/\[(\d+(?:,\d+)*)\]/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <sup key={i} className="top-0 ml-[2px] align-super font-mono text-[11px] leading-none text-stone">
            {part.split(",").map((n, j) => (
              <Fragment key={n}>
                {j > 0 && ","}
                <a
                  href={`#source-${n}`}
                  aria-label={fill(template, { n })}
                  className="text-stone no-underline hover:text-ink"
                >
                  {n}
                </a>
              </Fragment>
            ))}
          </sup>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
