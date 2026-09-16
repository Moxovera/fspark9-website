import { BrandSymbolIcon } from "@/components/locked/Wordmark";

// One note, one message — never merge two <Note>s (see the brief's
// component list). `label` is the translated "Not"/"Note" word.
export function Note({ html, label }: { html: string; label: string }) {
  return (
    <aside className="note" aria-label={label}>
      <div className="ico" aria-hidden="true">
        <BrandSymbolIcon height={19} />
      </div>
      <div>
        <div className="lab">{label}</div>
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </aside>
  );
}
