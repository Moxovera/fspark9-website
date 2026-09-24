import { BrandSymbolIcon } from "@/components/locked/Wordmark";

// One note, one message — never merge two <Note>s (see the brief's
// component list). `label` is the translated "Not"/"Note" word; the
// "fspark9 · " prefix is chrome, not content, so it's hardcoded here
// rather than duplicated into every content file. `ariaLabel` is the
// fuller "fspark9 notu"/"fspark9 note" form for assistive tech.
export function Note({ html, label, ariaLabel }: { html: string; label: string; ariaLabel: string }) {
  return (
    <aside className="note" aria-label={ariaLabel}>
      <div className="ico" aria-hidden="true">
        <BrandSymbolIcon height={24} />
      </div>
      <div>
        <div className="lab">
          <span className="nt">fspark9</span> <i>· {label}</i>
        </div>
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </aside>
  );
}
