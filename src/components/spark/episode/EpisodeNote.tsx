"use client";

import { useLastDayCalls } from "@/hooks/useLastDayCalls";

interface EpisodeNoteProps {
  body: string;
  label: string; // "fspark9 · Note" / "fspark9 · Not"
}

/**
 * Dördüncü bir şey — record/reading/gap'ten biri DEĞİL. Sol çizgi yok,
 * mono state etiketi yok, kaynak çipi yok. Ledger modunda tamamen
 * kaybolur. Ana site'ın locked-report.css'indeki Note bileşeninin
 * TASARIM FİKRİ yeniden kullanıldı (rozet + etiket + gövde), ama bu
 * sayfa Tailwind + main site token'larıyla (locked-report'un ayrı CSS
 * sistemi değil) sıfırdan kuruldu — bkz. Layer 1 handback notu.
 */
export default function EpisodeNote({ body, label }: EpisodeNoteProps) {
  const { ledger } = useLastDayCalls();
  if (ledger) return null;

  return (
    <aside className="flex flex-col items-start gap-4 rounded-md border border-bronze/35 bg-bronze/[0.08] p-6 shadow-[0_8px_24px_-8px_rgba(166,124,61,0.35)] min-[620px]:flex-row min-[620px]:items-start">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base text-ivory"
      >
        9
      </span>
      <div>
        <p className="mb-1.5 font-mono text-[11px] tracking-[0.08em] text-bronze normal-case">
          {label}
        </p>
        <p className="font-display text-[1.05rem] leading-[1.55] text-charcoal">{body}</p>
      </div>
    </aside>
  );
}
