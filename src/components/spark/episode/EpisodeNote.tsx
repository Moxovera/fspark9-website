import Image from "next/image";

interface EpisodeNoteProps {
  body: string;
  label: string; // "fspark9 · Note" / "fspark9 · Not"
}

/**
 * fspark9'un kendi sesi — kullanıcı isteğiyle (18 Eylül 2026) yeniden
 * gövde içine, ilgili bloğun hemen ardına yerleştiriliyor (bkz.
 * EpisodeBlocks.tsx'teki "sparkNote" case'i) — son bölümdeki
 * konsolide "Expert Notes" tasarımı terk edildi. Rozetteki "9" düz
 * metin DEĞİL, markanın kendi SVG sembolü (aynı Hero.tsx'te kullanılan
 * /assets/symbol-reversed.svg) — düz metin "9" yuvarlak rozette
 * kötü durduğu için.
 */
export default function EpisodeNote({ body, label }: EpisodeNoteProps) {
  return (
    <aside className="flex flex-col items-start gap-4 rounded-md border border-bronze/35 bg-bronze/[0.08] p-6 shadow-[0_8px_24px_-8px_rgba(166,124,61,0.35)] min-[620px]:flex-row min-[620px]:items-start">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy"
      >
        <Image src="/assets/symbol-reversed.svg" alt="" width={64} height={100} className="h-5 w-auto" />
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
