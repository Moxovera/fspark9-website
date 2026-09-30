import { BrandSymbolIcon } from "@/components/locked/Wordmark";
import type { TsdNoteProps } from "@/types/content";

// "Görüşümüz" notu: White, 2 px Ink üst çizgi, Ink kare rozette 9 sembolü
// (Paper gövde, Flare dilim), mono büyük harf etiket, Hanken metin.
export function Note({ html, label }: TsdNoteProps) {
  return (
    <aside className="note" aria-label={label}>
      <div className="ico">
        <BrandSymbolIcon height={25} />
      </div>
      <div>
        <div className="lab">{label}</div>
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </aside>
  );
}
