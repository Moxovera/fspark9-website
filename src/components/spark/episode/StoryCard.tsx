import type { StoryCardFace, StoryCardProps } from "@/types/content";

/**
 * Bó'nun dikey kartı, CSS ile çizili (prototip son-gun-01-bo-v3 `.card`,
 * oran 54:86): çip, büyük gün, mono durum satırı. Gerçek kart görseli ya
 * da logo yok. Hal `data-mode` ile globals.css'teki .story-card
 * kurallarından: draft, live, flipped (arka yüz), closed. Genişlik
 * kullanan yerden className ile. Dekoratif, okunan metin sayfada.
 */
export default function StoryCard({ mode, front, back, className }: StoryCardProps) {
  return (
    <div aria-hidden="true" data-mode={mode} className={`story-card ${className ?? ""}`}>
      <Face face={front} side="front" />
      {back && <Face face={back} side="back" />}
    </div>
  );
}

function Face({ face, side }: { face: StoryCardFace; side: "front" | "back" }) {
  return (
    <div className={`story-face story-face-${side}`}>
      <span className="story-chip" />
      <span className="flex flex-col">
        <span className="font-display text-[44px] leading-[0.9] font-extrabold tracking-[-0.04em]">{face.day}</span>
        <span className="font-mono text-[11px] leading-[1.6] font-medium tracking-[0.08em] uppercase">{face.state}</span>
      </span>
    </div>
  );
}
