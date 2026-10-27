import { Fragment } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { fill } from "@/lib/format";
import type { Psd3RefsProps, Psd3TextProps } from "@/types/content";

const TOKEN = /(\*\*[^*]+\*\*|\[\d+\]|→)/;

/** Kaynak linki (prototip `.src`): mono üst simge, kaynak listesindeki `source-n` satırına gider. */
function Ref({ n, template }: { n: string; template: string }) {
  return (
    <a
      href={`#source-${n}`}
      aria-label={fill(template, { n })}
      className="ml-[2px] align-super font-mono text-[11px] whitespace-nowrap text-stone no-underline hover:underline in-[.on-ink]:text-dust"
    >
      [{n}]
    </a>
  );
}

/**
 * PSD3 raporunun satır içi metni: "**kalın**", "[n]" kaynak linki ve
 * "→" (inline SVG ok; Unicode ok metinde kalır, ekranda ikon olur).
 * Boşluklar referanstaki gibi korunur.
 */
export default function Psd3Text({ text, template }: Psd3TextProps) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        if (part === "→")
          return (
            <Fragment key={i}>
              <ArrowRightIcon className="inline-block size-[0.8em] align-[-0.05em]" />
              <span className="sr-only">→</span>
            </Fragment>
          );
        if (part.startsWith("**")) return <b key={i} className="font-display font-bold">{part.slice(2, -2)}</b>;
        return <Ref key={i} n={part.slice(1, -1)} template={template} />;
      })}
    </>
  );
}

/** Numara dizisinden yan yana kaynak linkleri (prototip `c.s.map(S).join('')`). */
export function Psd3Refs({ sources, template }: Psd3RefsProps) {
  return (
    <>
      {sources.map((n) => (
        <Ref key={n} n={String(n)} template={template} />
      ))}
    </>
  );
}
